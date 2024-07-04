import { get, writable, type Writable } from 'svelte/store';
import type {
	CubicBezierPoints,
	EasingFunction,
	TransitionOptions,
	CreateTransitionOptions
} from './types.js';
import { promiseTimeout, tryOnDestroy } from '$lib/index.js';

const linear = <T>(v: T) => v;

const _TransitionPresets = {
	easeInSine: [0.12, 0, 0.39, 0],
	easeOutSine: [0.61, 1, 0.88, 1],
	easeInOutSine: [0.37, 0, 0.63, 1],
	easeInQuad: [0.11, 0, 0.5, 0],
	easeOutQuad: [0.5, 1, 0.89, 1],
	easeInOutQuad: [0.45, 0, 0.55, 1],
	easeInCubic: [0.32, 0, 0.67, 0],
	easeOutCubic: [0.33, 1, 0.68, 1],
	easeInOutCubic: [0.65, 0, 0.35, 1],
	easeInQuart: [0.5, 0, 0.75, 0],
	easeOutQuart: [0.25, 1, 0.5, 1],
	easeInOutQuart: [0.76, 0, 0.24, 1],
	easeInQuint: [0.64, 0, 0.78, 0],
	easeOutQuint: [0.22, 1, 0.36, 1],
	easeInOutQuint: [0.83, 0, 0.17, 1],
	easeInExpo: [0.7, 0, 0.84, 0],
	easeOutExpo: [0.16, 1, 0.3, 1],
	easeInOutExpo: [0.87, 0, 0.13, 1],
	easeInCirc: [0.55, 0, 1, 0.45],
	easeOutCirc: [0, 0.55, 0.45, 1],
	easeInOutCirc: [0.85, 0, 0.15, 1],
	easeInBack: [0.36, 0, 0.66, -0.56],
	easeOutBack: [0.34, 1.56, 0.64, 1],
	easeInOutBack: [0.68, -0.6, 0.32, 1.6]
} as const;

/**
 * Common transitions
 *
 * @see https://easings.net
 */
export const TransitionPresets = /* #__PURE__ */ Object.assign(
	{},
	{ linear },
	_TransitionPresets
) as Record<keyof typeof _TransitionPresets, CubicBezierPoints> & { linear: EasingFunction };

/**
 * Create an easing function from cubic bezier points.
 */
function createEasingFunction([p0, p1, p2, p3]: CubicBezierPoints): EasingFunction {
	const a = (a1: number, a2: number) => 1 - 3 * a2 + 3 * a1;
	const b = (a1: number, a2: number) => 3 * a2 - 6 * a1;
	const c = (a1: number) => 3 * a1;

	const calcBezier = (t: number, a1: number, a2: number) =>
		((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;

	const getSlope = (t: number, a1: number, a2: number) =>
		3 * a(a1, a2) * t * t + 2 * b(a1, a2) * t + c(a1);

	const getTforX = (x: number) => {
		let aGuessT = x;

		for (let i = 0; i < 4; ++i) {
			const currentSlope = getSlope(aGuessT, p0, p2);
			if (currentSlope === 0) return aGuessT;
			const currentX = calcBezier(aGuessT, p0, p2) - x;
			aGuessT -= currentX / currentSlope;
		}

		return aGuessT;
	};

	return (x: number) => (p0 === p1 && p2 === p3 ? x : calcBezier(getTforX(x), p1, p3));
}

function lerp(a: number, b: number, alpha: number) {
	return a + alpha * (b - a);
}

/**
 * Transition from one value to another.
 *
 * @param source
 * @param from
 * @param to
 * @param options
 */
export function executeTransition(
	source: Writable<number>,
	from: number,
	to: number,
	options: TransitionOptions = {}
): PromiseLike<void> {
	const duration = options.duration ?? 1000;
	const startedAt = Date.now();
	const endAt = Date.now() + duration;
	const trans =
		typeof options.transition === 'function' ? options.transition : options.transition ?? linear;

	const ease = typeof trans === 'function' ? trans : createEasingFunction(trans);

	return new Promise<void>((resolve) => {
		if (typeof window === 'undefined' || !('requestAnimationFrame' in window)) return resolve();

		source.set(from);

		const interval = setInterval(() => {
			if (options.abort?.()) {
				clearInterval(interval);
				return resolve();
			}

			const now = Date.now();
			const alpha = ease((now - startedAt) / duration);
			const toVal = lerp(from, to, alpha);

			if (now < endAt) return source.set(toVal);

			source.set(to);

			resolve();
		}, 10);
	});
}

export function createTransition(options: CreateTransitionOptions = {}) {
	const output = writable(options.initial || 0);
	const transition = writable(options.initial || 0);
	const disabled = writable(false);
	let currentId = 0;

	transition.subscribe(async (v) => {
		const id = ++currentId;

		if (options.delay) await promiseTimeout(options.delay);
		if (id !== currentId) return;

		options.onStarted?.();

		await executeTransition(output, get(output), v, {
			...options,
			abort: () => id !== currentId || options.abort?.()
		});

		options.onFinished?.();
	});

	tryOnDestroy(() => currentId++);

	return {
		value: output,
		disable: (bool: boolean) => disabled.set(bool),
		useTransition: (value: number) => transition.set(value)
	};
}

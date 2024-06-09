import {
	type MaybeWriteableOrReadable,
	increaseWithUnit,
	defaultWindow,
	unwrap
} from '$lib/shared/index.js';
import { useMediaQuery } from '$lib/index.js';
import { derived, type Writable } from 'svelte/store';

export * from './breakpoints.js';

export type Breakpoints<K extends string = string> = Record<
	K,
	MaybeWriteableOrReadable<number | string>
>;

type BreakpointsOptions = {
	window?: Window;
	strategy?: 'min-width' | 'max-width';
};

export function useBreakpoints<K extends string>(
	breakpoints: Breakpoints<K>,
	options?: BreakpointsOptions
) {
	function getValue(k: MaybeWriteableOrReadable<K>, delta?: number) {
		let v = unwrap(breakpoints[unwrap(k)]);

		if (delta != null) v = increaseWithUnit(v, delta);

		if (typeof v === 'number') v = `${v}px`;

		return v;
	}

	const { window = defaultWindow, strategy = 'min-width' } = options || {};

	function match(query: string): boolean {
		if (!window) return false;
		return window.matchMedia(query).matches;
	}

	const greaterOrEqual = (k: MaybeWriteableOrReadable<K>) => {
		return useMediaQuery(`(min-width: ${getValue(k)})`, options);
	};

	const smallerOrEqual = (k: MaybeWriteableOrReadable<K>) => {
		return useMediaQuery(`(max-width: ${getValue(k)})`, options);
	};

	const shortcutMethods = Object.keys(breakpoints).reduce(
		(shortcuts, k) => {
			Object.defineProperty(shortcuts, k, {
				get: () => (strategy === 'min-width' ? greaterOrEqual(k as K) : smallerOrEqual(k as K)),
				enumerable: true,
				configurable: true
			});
			return shortcuts;
		},
		{} as Record<K, Writable<boolean>>
	);

	function current() {
		const points = Object.keys(breakpoints).map((i) => greaterOrEqual(i as K));

		return derived(points, (val) => val.filter((v) => !!v).map((k) => k));
	}

	return Object.assign(shortcutMethods, {
		greaterOrEqual,
		smallerOrEqual,
		greater(k: MaybeWriteableOrReadable<K>) {
			return useMediaQuery(`(min-width: ${getValue(k, 0.1)})`, options);
		},
		smaller(k: MaybeWriteableOrReadable<K>) {
			return useMediaQuery(`(max-width: ${getValue(k, -0.1)})`, options);
		},
		between(a: MaybeWriteableOrReadable<K>, b: MaybeWriteableOrReadable<K>) {
			return useMediaQuery(
				`(min-width: ${getValue(a)}) and (max-width: ${getValue(b, -0.1)})`,
				options
			);
		},
		isGreater(k: MaybeWriteableOrReadable<K>) {
			return match(`(min-width: ${getValue(k, 0.1)})`);
		},
		isGreaterOrEqual(k: MaybeWriteableOrReadable<K>) {
			return match(`(min-width: ${getValue(k)})`);
		},
		isSmaller(k: MaybeWriteableOrReadable<K>) {
			return match(`(max-width: ${getValue(k, -0.1)})`);
		},
		isSmallerOrEqual(k: MaybeWriteableOrReadable<K>) {
			return match(`(max-width: ${getValue(k)})`);
		},
		isInBetween(a: MaybeWriteableOrReadable<K>, b: MaybeWriteableOrReadable<K>) {
			return match(`(min-width: ${getValue(a)}) and (max-width: ${getValue(b, -0.1)})`);
		},
		current,
		active() {
			const bps = current();
			return derived(bps, (vals) => (vals.length === 0 ? '' : vals.at(-1)));
		}
	});
}

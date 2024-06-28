import { get, writable } from 'svelte/store';
import type { Action } from 'svelte/action';

export type MultiClickOption = {
	callback: (e: MouseEvent) => void;
	ms?: number;
	clicks: number;
};

/**
 *
 * @param HTMLElement The HTML node to listen for clicks
 * @param MultiClickOption Options for the Svelte Action
 * @returns
 */
export const onMultiClick: Action<HTMLElement, MultiClickOption> = (
	node,
	{ callback, ms = 200, clicks }
) => {
	const counter = writable(0);
	const last = writable(0);
	const reset = () => {
		counter.set(0);
		last.set(0);
	};
	const handler = (event: MouseEvent) => {
		if (get(counter) + 1 === clicks) {
			callback(event);

			return reset();
		}

		const stamp = Date.now();
		last.set(stamp);
		counter.update((v) => v + 1);

		setTimeout(() => {
			if (get(last) !== stamp) return;
			if (get(counter) !== clicks) return reset();

			callback(event);

			reset();
		}, ms);
	};

	node.addEventListener('click', handler);

	return {
		destroy() {
			node.removeEventListener('click', handler);
		}
	};
};

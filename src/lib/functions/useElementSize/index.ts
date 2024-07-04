import { writable } from 'svelte/store';
import { useResizeObserver, type Size } from '$lib/index.js';

/**
 * Reactive size of an HTML element.
 *
 * @param target
 * @param callback
 * @param options
 */
export function createElementSize() {
	const value = writable<Size>({ width: 0, height: 0 });

	return {
		value,
		useElementSize<T extends HTMLElement | null | undefined>(target: T) {
			if (!target) return;

			useResizeObserver(target).subscribe(([entry]) => {
				if (!entry) return;

				value.set({
					width: entry.contentRect.width,
					height: entry.contentRect.height
				});
			});
		}
	};
}

import { readonly, writable } from 'svelte/store';
import { useResizeObserver, type Size } from '$lib/index.js';

/**
 * Reactive size of an HTML element.
 *
 * @param target
 * @param callback
 * @param options
 */
export function useElementSize<T extends Element | null>(target: T) {
	const size = writable<Size>({ width: 0, height: 0 });

	if (target !== null) {
		useResizeObserver(target).subscribe(([entry]) => {
			size.set({
				width: entry.contentRect.width,
				height: entry.contentRect.height
			});
		});
	}

	return readonly(size);
}

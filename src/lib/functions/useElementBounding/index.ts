import { readonly, writable } from 'svelte/store';
import { useResizeObserver } from '../useResizeObserver/index.js';

export function useElementBounding<T extends Element>(target: T) {
	const store = writable<DOMRect>(target.getBoundingClientRect());

	useResizeObserver(target).subscribe(() => store.set(target.getBoundingClientRect()));

	return readonly(store);
}

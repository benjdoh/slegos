import {} from '$lib/shared/index.js';
import { readonly, writable } from 'svelte/store';

export function useResizeObserver<T extends Element>(target: T) {
	const store = writable<ResizeObserverEntry[]>([]);

	const observer = new ResizeObserver((entries) => {
		store.set(entries);
	});

	observer.observe(target);

	return readonly(store);
}

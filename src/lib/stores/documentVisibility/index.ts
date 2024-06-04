import { readonly, writable } from 'svelte/store';

export function useDocumentVisibility() {
	const store = writable(document.visibilityState);

	document.addEventListener('visibilitychange', () => store.set(document.visibilityState));

	return readonly(store);
}

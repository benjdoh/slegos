import {} from '$lib/shared/index.js';
import { readonly, writable } from 'svelte/store';

export function useActiveElement() {
	const store = writable<HTMLElement | null>(null);

	if (typeof document !== 'undefined') {
		document.addEventListener('focus', (event) => store.set(event.target as HTMLElement), true);
		document.addEventListener('blur', () => store.set(null), true);
	}

	return readonly(store);
}

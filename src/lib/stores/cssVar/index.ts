import { defaultDocument } from '$lib/shared/index.js';
import { writable } from 'svelte/store';

interface CSSVarStoreOptions<T> {
	el?: T;
	initialValue?: string;
}

export function useCSSVar<T extends HTMLElement>(
	name: string,
	{ el, initialValue }: CSSVarStoreOptions<T> = {}
) {
	const target = el || defaultDocument?.documentElement;
	const store = writable(initialValue);

	function updateCSSVar(value: string) {
		target?.style.setProperty(name, value);
	}

	if (initialValue) {
		updateCSSVar(initialValue);
	}

	return {
		subscribe: store.subscribe,
		set(value: string) {
			updateCSSVar(value);
			store.set(value);
		}
	};
}

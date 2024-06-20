import { readonly, writable, type Readable } from 'svelte/store';

export function useRound(ref: Readable<number>) {
	const value = writable<number>();

	ref.subscribe((v) => {
		value.set(Math.round(v));
	});

	return readonly(value);
}

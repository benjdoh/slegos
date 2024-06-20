import { get, readonly, writable, type Readable } from 'svelte/store';

export function useCeil(ref: Readable<number>) {
	const value = writable<number>(get(ref));

	ref.subscribe((v) => {
		value.set(Math.ceil(v));
	});

	return readonly(value);
}

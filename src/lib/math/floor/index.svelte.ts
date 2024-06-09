import { get, readonly, writable, type Readable } from 'svelte/store';

export function useFloor(ref: Readable<number>) {

	const value = writable<number>(get(ref));

	ref.subscribe((v) => {
		value.set(Math.floor(v));
	});

	return readonly(value);
}

// export function useFloor(ref: Readable<number>) {
// 	const value = writable<number>(get(ref));

// 	ref.subscribe((v) => {
// 		value.set(Math.floor(v));
// 	});

// 	return readonly(value);
// }

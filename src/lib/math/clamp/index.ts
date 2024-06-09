import { get, readonly, writable, type Readable } from 'svelte/store';

export function useClamp(ref: Readable<number>, opts?: { min?: number; max?: number }) {
	const value = writable<number>(get(ref));

	ref.subscribe((v) => {
		const min = opts?.min ?? Number.MIN_SAFE_INTEGER;
		const max = opts?.max ?? Number.MAX_SAFE_INTEGER;

		value.set(Math.min(Math.max(v, min), max));
	});

	return readonly(value);
}

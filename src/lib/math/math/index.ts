import { get, readonly, writable, type Readable } from 'svelte/store';

export type UseMathKeys = keyof {
	[K in keyof Math as Math[K] extends (...args: any) => any ? K : never]: unknown;
};

export function useMath<K extends keyof Math>(func: K, ...args: Parameters<Math[K]>) {
	const value = writable<number>(fn(get(ref)));

	ref.subscribe((v) => {
		value.set(fn(v));
	});

	return readonly(value);
}

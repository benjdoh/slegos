/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MaybeWriteableOrReadable } from '$lib/shared/types.js';
import { get, readonly, writable, type Readable } from 'svelte/store';

export type UseMathKeys = keyof {
	[K in keyof Math as Math[K] extends (...args: any) => any ? K : never]: unknown;
};

export function useMath<K extends keyof Math>(func: K, ...args: Parameters<Math[K]>) {
	const fn = Math[func] as (...args: any) => number;
	const value = writable<number>(fn(...args)); 

	for (const arg of args) {
		if (typeof arg !== 'number') {
			arg.subscribe(() => {});
		}
	}

	return readonly(value);
}

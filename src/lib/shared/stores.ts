import type { Readable, Writable } from 'svelte/store';
import { get, readonly } from 'svelte/store';

export function isReadable<T>(ref: T | Readable<T>): boolean {
	if (ref === null) return false;

	if (typeof ref === 'object') {
		return 'subscribe' in ref;
	}

	return false;
}
export function unwrap<T>(ref: T | Readable<T> | Writable<T>) {
	if (isReadable(ref)) return get(readonly(ref as Readable<T>));

	return ref as T;
}

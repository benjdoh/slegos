import { onDestroy } from 'svelte';
import { browser } from '$app/environment';

export function tryOnDestroy(fn: () => void) {
	try {
		onDestroy(fn);
	} catch {
		// fail silently
	}
}

export function isSafeIntegerThrowable(int: unknown) {
	if (!Number.isSafeInteger(int)) {
		throw new Error('Interval is not a safe integer');
	}
}

export const isClient = browser;
export const defaultWindow = browser ? window : undefined;
export const defaultDocument = browser ? window.document : undefined;

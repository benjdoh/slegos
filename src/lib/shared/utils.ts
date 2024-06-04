import { is_client, get_current_component, onDestroy } from 'svelte/internal';

export function tryOnDestroy(fn: () => void) {
	try {
		get_current_component();
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

export const isClient = is_client;
export const defaultWindow = is_client ? window : undefined;
export const defaultDocument = is_client ? window.document : undefined;

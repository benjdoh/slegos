/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */

import { unwrap, useSupported } from '$lib/index.js';
import type { MaybeWriteableOrReadable } from '$lib/shared/types.js';
import { defaultWindow } from '$lib/shared/utils.js';
import { onDestroy } from 'svelte';
import { readonly, writable } from 'svelte/store';

type ConfigurableWindow = {
	window?: Window;
};

export function useMediaQuery(
	query: MaybeWriteableOrReadable<string>,
	options: ConfigurableWindow = {}
) {
	const { window = defaultWindow } = options;
	const isSupported = useSupported(() => {
		if (!window) return false;
		if (!('matchMedia' in window)) return false;
		return typeof window.matchMedia === 'function';
	});

	let mediaQuery: MediaQueryList | undefined;
	const matches = writable(false);

	const handler = (event: MediaQueryListEvent) => matches.set(event.matches);
	const cleanup = () => {
		if (!mediaQuery) return;
		if ('removeEventListener' in mediaQuery) mediaQuery.removeEventListener('change', handler);
		// @ts-expect-error deprecated API
		else mediaQuery.removeListener(handler);
	};

	$effect(() => {
		if (!isSupported) return;

		cleanup();

		mediaQuery = window!.matchMedia(unwrap(query));

		if (!mediaQuery) return;
		if ('addEventListener' in mediaQuery) mediaQuery.addEventListener('change', handler);
		// @ts-expect-error deprecated API
		else mediaQuery.addListener(handler);

		matches.set(mediaQuery.matches);
	});

	onDestroy(() => {
		cleanup();
		mediaQuery = undefined;
	});

	return readonly(matches);
}

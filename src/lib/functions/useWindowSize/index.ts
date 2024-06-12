import { browser } from '$app/environment';
import { onDestroy } from 'svelte';
import { readonly, writable } from 'svelte/store';

export type WindowSizeOption = {
	initialWidth?: number;
	initialHeight?: number;
};

export function useWindowSize(opts?: WindowSizeOption) {
	opts = opts || {};

	const size = writable({ width: opts.initialWidth || 0, height: opts.initialHeight || 0 });

	const handler = () => {
		size.set({
			width: window.innerWidth,
			height: window.innerHeight
		});
	};

	onDestroy(() => browser && window.removeEventListener('resize', handler));
	if (browser) {
		window.addEventListener('resize', handler);

		handler();
	}

	return readonly(size);
}

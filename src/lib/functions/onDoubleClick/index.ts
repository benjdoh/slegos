import type { Action, ActionReturn } from 'svelte/action';
import { onMultiClick } from '$lib/index.js';

export type DoubleClickOption =
	| ((e: MouseEvent) => void)
	| {
			callback: (e: MouseEvent) => void;
			ms?: number | undefined;
	  };

export const onDoubleClick: Action<HTMLElement, DoubleClickOption, Record<never, never>> = (
	node,
	opts
) => {
	return onMultiClick(node, {
		callback: 'callback' in opts ? opts.callback : opts,
		clicks: 2
	}) as ActionReturn<DoubleClickOption, Record<never, never>>;
};

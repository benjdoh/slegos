import type { ActionReturn } from 'svelte/action';

export function clickOutside(node: HTMLElement, func: (e: MouseEvent) => void): ActionReturn {
	function handler(event: MouseEvent) {
		if (event.target !== null && !node.contains(event.target as Node)) {
			func(event);
		}
	}

	document.addEventListener('click', handler);

	return {
		destroy() {
			document.removeEventListener('click', handler);
		}
	};
}

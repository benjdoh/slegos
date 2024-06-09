import { type ClassValue, clsx } from 'clsx';
import type { SvelteComponent } from 'svelte';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export function getContents() {
	return Object.entries(
		import.meta.glob<{
			default: SvelteComponent;
			metadata: Record<string, string>;
		}>('/src/lib/**/demo.md')
	);
}

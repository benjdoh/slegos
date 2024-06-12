import { derived } from 'svelte/store';
import { useMounted } from '../mounted/index.js';

export const useSupported = (callback: () => boolean) => {
	const mounted = useMounted();

	return derived(mounted, () => {
		return Boolean(callback());
	});
};

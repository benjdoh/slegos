import { useMounted } from '../mounted/index.js';

export const useSupported = (callback: () => boolean) => {
	const mounted = useMounted();

	return $derived.by(() => {
		// to trigger the ref
		// eslint-disable-next-line no-unused-expressions
		mounted;
		return Boolean(callback());
	});
};

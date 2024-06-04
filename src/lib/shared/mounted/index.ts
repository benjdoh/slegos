import { onMount } from 'svelte';
import { readonly, writable } from 'svelte/store';

export const useMounted = () => {
	const isMounted = writable(false);

	onMount(() => isMounted.set(true));

	return readonly(isMounted);
};

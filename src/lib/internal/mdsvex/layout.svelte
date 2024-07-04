<script context="module">
	// export { default as h2 } from './h2.svelte';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	const { children, ...etc }: Props = $props();
</script>

{@render children()}

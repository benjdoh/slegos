<script lang="ts">
	import { onMount } from 'svelte';

	// @ts-ignore
	import { createAverage } from './index.svelte.js';

	let num = $state(3.14);
	const { value: average, useAverage } = createAverage();

	$effect(() => useAverage(num));

	onMount(() => {
		setInterval(() => (num = num + 0.1), 1000);
	});
</script>

{num}
{average}

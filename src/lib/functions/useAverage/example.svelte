<script lang="ts">
	import { onMount } from 'svelte';

	// @ts-ignore
	import { useAverage } from './index.js';

	let num = $state(3.14);
	const result = $derived(useAverage(num));

	console.log(num);
	onMount(() => {
		setInterval(() => (num = num + 0.1), 1000);
		console.log(result);
	});

	$effect(() => {
		console.log(result);
	});
</script>

{result}

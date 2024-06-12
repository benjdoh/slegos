<script lang="ts">
	import { useAverage } from '$lib/index.js';
	import { onDestroy, onMount } from 'svelte';

	let num = $state(3.14);
	let result = $derived(useAverage(num));

	setInterval(() => (num = num + 0.1), 1000);
</script>

{result}

{num}

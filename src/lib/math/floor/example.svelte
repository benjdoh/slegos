<script>
	import { useFloor } from '$lib/index.js';
	import { onMount } from 'svelte';

	let num = $state(3.14123123);
	let result = $derived(Math.floor(num));
</script>

{result}

{num}

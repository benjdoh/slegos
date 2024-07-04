<script lang="ts">
	import { createTransition } from '$lib/index.js';

	let source = $state(0);
	const { value, useTransition } = createTransition();

	$effect(() => useTransition(source));
</script>

<div>
	<p>{$value}</p>

	<button onclick={() => (source = source - 100)}>-</button>
	<button onclick={() => (source = source + 100)}>+</button>
</div>

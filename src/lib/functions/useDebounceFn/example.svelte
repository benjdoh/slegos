<script lang="ts">
	import { onMount } from 'svelte';
	import { useDebounceFn } from './indext.js';

	let clicked = $state(0);
	let handlerCalled = $state(0);

	const debounceFn = useDebounceFn(() => handlerCalled++);

	function onClick() {
		debounceFn();

		clicked++;
	}
</script>

{clicked}
{handlerCalled}

<button onclick={onClick}>Click me</button>

---
section: Utilities
---

Listen for mutliple clicks on HTML Element

<script>
	import Example from './example.svelte';

</script>

<Example />

Usage

```svelte
<script>
	import { onMultiClick } from 'svegos';

	let counter = $state(0);
</script>

<button use:onMultiClick={{ callback: () => counter++, maxClicks: 3 }}>
	Triple Click Me: {counter}
</button>

```
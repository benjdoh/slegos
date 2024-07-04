---
section: Utilities
---

Listen for double clicks on HTML Element

## Demo

<script>
	import Example from './example.svelte';

</script>

<Example />

## Usage

```svelte
<script>
	import { onDoubleClick } from 'svegos';

	let counter = $state(0);
</script>

<button use:onDoubleClick={() => counter++}>
	Double Click Me: {counter}
</button>
```
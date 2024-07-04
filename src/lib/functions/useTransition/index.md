---
section: Animation
---

<script>
  import Example from './example.svelte'
</script>

## Demo:

<Example />

## Usage:

```svelte
<script>
	import { createTransition } from 'svegos';

	let source = $state(0);
	const { value, useTransition } = createTransition();

	$effect(() => useTransition(source));
</script>

<div>
	<p>{$value}</p>

	<button onclick={() => (source = source - 100)}>-</button>
	<button onclick={() => (source = source + 100)}>+</button>
</div>
```
<script lang="ts">
	// @ts-ignore
	import { onMultiClick } from './index.js';

	let counter = $state(0);
</script>

<button use:onMultiClick={{ callback: () => counter++, clicks: 3 }}>
	Triple Click Me: {counter}
</button>

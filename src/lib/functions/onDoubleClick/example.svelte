<script lang="ts">
	// @ts-ignore
	import { onDoubleClick } from './index.js';

	let counter = $state(0);
</script>

<button use:onDoubleClick={() => counter++}>
	Double Click Me: {counter}
</button>

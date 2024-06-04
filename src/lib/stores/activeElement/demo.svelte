<script lang="ts">
	import { activeElementStore } from '$lib/index.js';

	const active = activeElementStore();
</script>

<input type="text" />
<input type="text" />
<input type="text" />
<input type="text" />

{$active}

<script lang="ts">
	import { useActiveElement } from './index.js';

	const active = useActiveElement();
</script>

<input type="text" id="first" />
<input type="text" id="second" />
<input type="text" id="third" />
<input type="text" id="fourth" />

{#if active}
	{$active?.id}
{/if}

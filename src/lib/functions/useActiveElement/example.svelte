<script lang="ts">
	// @ts-ignore
	import { useActiveElement } from './';

	const active = useActiveElement();
</script>

<Demo>
	<input type="text" id="first" />
	<input type="text" id="second" />
	<input type="text" id="third" />
	<input type="text" id="fourth" />
</Demo>

{#if active}
	{$active?.id}
{/if}

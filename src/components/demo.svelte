<script lang="ts">
	const { children } = $props();
</script>

<div class="p-4 bg-light-500">
	{@render children()}
</div>

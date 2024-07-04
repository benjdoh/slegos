<script lang="ts">
	import type { Snippet } from 'svelte';
	import { scale } from 'svelte/transition';
	import { Link } from 'lucide-svelte';

	type Props = {
		children: Snippet;
		id: string;
	};

	const { children, ...etc }: Props = $props();
</script>

<h2 class="relative">
	<button
		title="Copy link"
		class="absolute -left-5 w-4 h-4 top-1/2 transform -translate-y-1/2"
		onclick={() => new Clipboard().writeText('https://svegos.org/')}
	>
		<Link size={16} />
	</button>

	{@render children()}
</h2>

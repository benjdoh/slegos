<script lang="ts">
	import Logo from '$lib/internal/components/logo.svelte';
	import { cn } from '$lib/internal/utils.js';
	import { Search } from 'lucide-svelte';
	import { useBreakpoints, breakpointsTailwind } from '$lib/index.js';
	import { type GetContentsItem } from '$lib/internal/index.js';
	import { page } from '$app/stores';

	type Props = {
		pages: GetContentsItem[];
	};

	let isMenuOpen = $state(false);
	const breakpoints = useBreakpoints(breakpointsTailwind);
	const isLarge = breakpoints.greater('md');
	const { pages }: Props = $props();

	const sections = $derived.by(() => {
		const result: Record<string, GetContentsItem[]> = {};

		for (const p of pages) {
			if (!result[p.section]) result[p.section] = [];

			result[p.section].push(p);
		}

		return result;
	});

	$effect(() => {
		document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';

		if ($isLarge) isMenuOpen = false;
	});
</script>

<div
	class={cn('sticky top-0 w-screen bg-white h-16 border-b shadow-sm shadow-black/10 py-4 px-10')}
>
	<div class="flex h-full items-center gap-8">
		<a
			href="/"
			class="flex gap-2 max-h-full h-full tracking-wide kerning-2 h-full items-end font-light text-lg"
		>
			<Logo class="h-full" />

			<span class="">SLEGOS</span>
		</a>

		<span class="flex-grow flex justify-end">
			<button
				class={cn(
					'border px-2 h-8 bg-light-600 border-light-900 rounded-full flex items-center gap-2'
				)}
			>
				<Search class="text-black/40 w-3" />

				<span class="text-black/40 text-xs">SEARCH</span>

				<span class="text-xs text-black/50">
					<kbd class="bg-white border p-0.5 rounded-sm">CTRL</kbd>
					<kbd class="bg-white border p-0.5 rounded-sm">K</kbd>
				</span>
			</button>
		</span>

		<div class="flex gap-4">
			{#each Object.keys(sections) as section}
				<a
					href={`/${section.toLowerCase()}`}
					class={cn(
						'hover:underline underline-offset-4 transition duration-200',
						$page.url.pathname.startsWith(`/${section.toLowerCase()}`)
							? 'text-orange underline'
							: ''
					)}
				>
					{section}
				</a>
			{/each}

			•

			<a href="https//github.com/justboereh/slegos"> GH </a>
		</div>
	</div>
</div>

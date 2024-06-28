<script lang="ts">
	import Logo from '$lib/internal/components/logo.svelte';
	import { cn } from '$lib/internal/utils.js';
	import { Search, Menu, ChevronRight } from 'lucide-svelte';
	import { useBreakpoints, breakpointsTailwind } from '$lib/index.js';
	import { type GetContentsItem } from '$lib/internal/index.js';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	type Props = {
		pages: GetContentsItem[];
	};

	let isMenuOpen = $state(false);
	let sectionOpened = $state('');
	let innerSectionElem: HTMLDivElement;
	const breakpoints = useBreakpoints(breakpointsTailwind);
	const isLarge = breakpoints.greater('md');
	const { pages }: Props = $props();
	const sections = $derived.by(() => {
		const result: Record<string, GetContentsItem[]> = {};

		for (const page of pages) {
			if (!result[page.section.toLowerCase()]) result[page.section.toLowerCase()] = [];

			result[page.section.toLowerCase()].push(page);
		}

		return result;
	});

	$effect(() => {
		if ($page.url.pathname === '/') {
			sectionOpened = '';
			return;
		}
		if (/\/[\w]+/.test($page.url.pathname)) {
			sectionOpened = $page.url.pathname.slice(1);
			return;
		}

		sectionOpened = $page.url.pathname.split('/')[1];
	});

	$effect(() => {
		document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';

		if ($isLarge) isMenuOpen = false;
	});
</script>

<div
	class={cn(
		'fixed top-0 w-screen transition duration-300 z-10',
		isMenuOpen ? 'bg-white/70 dark:bg-black/70' : 'pointer-events-none'
	)}
	style="height: calc(100dvh - 4rem)"
>
	<button class="h-full w-full" onclick={() => (isMenuOpen = false)}> </button>
</div>

<div
	class={cn('fixed top-0 w-screen z-15 pointer-events-none flex flex-col justify-end md:hidden')}
	style="height: calc(100dvh - 4rem)"
>
	<div
		class={cn(
			'max-h-lg min-h-fit p-4 pointer-events-auto bg-white absolute w-full transform transition duration-300 ease-in-out border border-b-0 rounded-t-2xl flex flex-col gap-2 overflow-hidden',
			isMenuOpen ? '' : 'translate-y-full'
		)}
		style:box-shadow={`0 0 ${isMenuOpen ? '10px' : '0px'} rgba(0, 0, 0, 0.1)`}
		style:height={sectionOpened ? `${innerSectionElem.clientHeight}px` : ''}
	>
		{#each Object.keys(sections) as section}
			<div class={cn('flex w-full')}>
				<a href={`/${section.toLowerCase()}`} class={cn('flex-grow capitalize')}>
					{section}
				</a>

				<button onclick={() => (sectionOpened = section.toLowerCase())}>
					<ChevronRight size={16} />
				</button>
			</div>
		{/each}

		<div
			bind:this={innerSectionElem}
			class={cn(
				'fixed w-full h-full bg-white left-0 top-0 rounded-t-2xl transform transition flex flex-col gap-2 p-4 overflow-hidden overflow-y-auto',
				!sectionOpened ? 'translate-x-full' : ''
			)}
		>
			<button class="text-left" onclick={() => (sectionOpened = '')}> Back </button>

			{#each sections[sectionOpened] || [] as page}
				<a
					href={`/${sectionOpened.toLowerCase()}/${page.name}`}
					class={cn('')}
					onclick={() => (isMenuOpen = false)}
				>
					{page.name}
				</a>
			{/each}
		</div>
	</div>
</div>

<div
	class={cn(
		'fixed bottom-0 h-16 p-4 bg-white border-t-2 w-screen mt-16 md:hidden z-20',
		isMenuOpen ? 'border-white' : 'border-light-900'
	)}
>
	<div class="flex h-full items-center gap-8">
		<a
			href="/"
			class="flex gap-2 max-h-full h-full tracking-wide kerning-2 h-full items-end font-light text-lg"
		>
			<Logo class="h-full" />

			<span class="">SLEGOS</span>
		</a>

		<span class="flex-grow"> </span>

		<button>
			<Search />
		</button>

		<button onclick={() => (isMenuOpen = !isMenuOpen)}>
			<Menu />
		</button>
	</div>
</div>

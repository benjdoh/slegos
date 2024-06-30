<script lang="ts">
	import Logo from '$lib/internal/components/logo.svelte';
	import { cn } from '$lib/internal/utils.js';
	import { Search, Menu, ChevronRight, ChevronLeft } from 'lucide-svelte';
	import { useBreakpoints, breakpointsTailwind } from '$lib/index.js';
	import { type GetContentsItem } from '$lib/internal/index.js';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	type Props = {
		pages: GetContentsItem[];
	};

	let isMenuOpen = $state(false);
	let sectionName = $state('');
	let menuBGTranslateY = $state('0px');
	let mainMenuElem = $state<HTMLDivElement>();
	let sectionMenuElem = $state<HTMLDivElement>();
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
			sectionName = '';
			return;
		}

		sectionName = $page.url.pathname.split('/')[1];
	});

	$effect(() => {
		document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';

		if ($isLarge) isMenuOpen = false;
	});

	$effect(() => {
		if (!isMenuOpen) {
			menuBGTranslateY = '0%';
		} else if (sectionName !== '') {
			menuBGTranslateY = sectionMenuElem?.clientHeight + 'px - 1.5rem';
		} else {
			menuBGTranslateY = mainMenuElem?.clientHeight + 'px - 1.5rem';
		}
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
			'w-full bg-white transform transition-all ease-in-out border border-b-0 border-light-900 h-full absolute block rounded-t-xl'
		)}
		style:--un-translate-y={`calc(100% - ${menuBGTranslateY})`}
	></div>

	<div
		class={cn(
			'transform transition pointer-events-auto flex w-200% items-end max-h-3/4',
			sectionName !== '' ? '-translate-x-1/2' : '',
			isMenuOpen ? '' : 'translate-y-full'
		)}
	>
		<div bind:this={mainMenuElem} class={cn('w-full max-h-full h-fit rounded-t-2xl space-y-4')}>
			{#each Object.keys(sections) as section}
				<div class="flex items-center px-4">
					<a href={`/${section}`} class="capitalize flex-grow">
						{section}
					</a>

					<button class="w-8 flex justify-center" onclick={() => (sectionName = section)}>
						<ChevronRight size={16} />
					</button>
				</div>
			{/each}
		</div>

		<div bind:this={sectionMenuElem} class={cn('w-full max-h-full flex flex-col')}>
			<div class="sticky px-4 uppercase font-medium tracking-wide">
				{sectionName}
			</div>

			<div class="overflow-auto flex-grow p-4 pr-0 flex flex-col gap-4 pl-6">
				{#each sections[sectionName] || [] as page}
					<a href={`/${sectionName}/${page.name}`}>
						{page.name}
					</a>
				{/each}
			</div>

			<button
				class="flex gap-2 items-center px-4 border-t border-light-900 min-h-12"
				onclick={() => (sectionName = '')}
			>
				<ChevronLeft size={16} />

				Back
			</button>
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

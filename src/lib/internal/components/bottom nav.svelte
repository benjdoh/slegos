<script lang="ts">
	import Logo from '$lib/internal/components/logo.svelte';
	import { cn } from '$lib/internal/utils.js';
	import { Search, Menu, ChevronRight, ChevronLeft } from 'lucide-svelte';
	import { useBreakpoints, breakpointsTailwind, type Size, createTransition } from '$lib/index.js';
	import { type GetContentsItem } from '$lib/internal/index.js';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import { createElementSize } from '$lib/functions/useElementSize/index.js';
	import { quintInOut } from 'svelte/easing';

	type Props = {
		pages: GetContentsItem[];
	};

	const { pages }: Props = $props();
	const breakpoints = useBreakpoints(breakpointsTailwind);
	const isLarge = breakpoints.greater('md');

	let isMenuOpen = $state(false);
	let sectionName = $state('');
	let mainMenuElem = $state<HTMLDivElement>();
	let sectionMenuElem = $state<HTMLDivElement>();
	let contentElem = $state<HTMLDivElement>();
	let menuBGTranslateY = $state('0%');
	const { value: contentSize, useElementSize } = createElementSize();
	const { value: transitionedContentSize, useTransition } = createTransition({ duration: 200 });

	$effect(() => useElementSize(contentElem));
	$effect(() => useTransition($contentSize.height));
	const sections = $derived.by(() => {
		const result: Record<string, GetContentsItem[]> = {};

		for (const page of pages) {
			if (!result[page.section.toLowerCase()]) result[page.section.toLowerCase()] = [];

			result[page.section.toLowerCase()].push(page);
		}

		return result;
	});

	$effect(() => {
		sectionName = $page.url.pathname === '/' ? '' : $page.url.pathname.split('/')[1];
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
	class={cn(
		'fixed top-0 w-screen z-15 pointer-events-none flex flex-col justify-end md:hidden overflow-hidden'
	)}
	style="height: calc(100dvh - 4rem)"
>
	<!-- <div
		class={cn(
			'w-full bg-red transform transition-all ease-in-out bottom-0 left-0 border border-b-0 border-light-900 h-full absolute block rounded-t-xl'
		)}
		style:--un-translate-y={`calc(100% - ${!isMenuOpen ? '0%' : (sectionName !== '' ? sectionMenuElem?.clientHeight : mainMenuElem?.clientHeight) + 'px'})`}
	></div> -->

	<div
		class={cn(
			'w-full bg-red transform transition-all ease-in-out bottom-0 left-0 border border-b-0 border-light-900 h-full absolute block rounded-t-xl'
		)}
		style:height={`calc(${$contentSize.height}px + 1.5rem)`}
	></div>

	<div
		bind:this={contentElem}
		class={cn(
			'transform transition pointer-events-auto flex w-full items-end max-h-3/4 pt-4',
			isMenuOpen ? '' : 'translate-y-full'
		)}
	>
		{#if !sectionName}
			<div
				bind:this={mainMenuElem}
				class={cn('w-full max-h-full h-fit space-y-4')}
				transition:slide={{ duration: 2000, easing: quintInOut, axis: 'x' }}
			>
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
		{:else}
			<div
				bind:this={sectionMenuElem}
				class={cn('w-full max-h-full flex flex-col')}
				transition:slide={{ duration: 2000, easing: quintInOut, axis: 'x' }}
			>
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
			</div>{/if}
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

			<span class="">SVEGOS</span>
		</a>

		<span class="flex-grow"> </span>

		<button>
			<Search size={16} />
		</button>

		<button onclick={() => (isMenuOpen = !isMenuOpen)}>
			<Menu size={16} />
		</button>
	</div>
</div>

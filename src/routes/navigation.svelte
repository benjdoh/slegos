<script lang="ts">
	import Logo from '$lib/internal/components/logo.svelte';
	import { cn } from '$lib/internal/utils.js';
	import { Search, Menu } from 'lucide-svelte';
	import { useBreakpoints, breakpointsTailwind } from '$lib/index.js';
	import {  type GetContentSectionedReturn } from '$lib/internal/index.js';

	type Props = {
		sections: GetContentSectionedReturn;
	};

	const links = [
		{ name: 'Actions', href: '/actions' },
		{ name: 'Math', href: '/math' },
		{ name: 'Shared', href: '/shared' },
		{ name: 'Stores', href: '/stores' }
	];

	let isMenuOpen = $state(false);
	const breakpoints = useBreakpoints(breakpointsTailwind);
	const isLarge = breakpoints.greater('md');
	const { sections }: Props = $props();

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
			'max-h-lg p-4 pointer-events-auto bg-white absolute w-full transform transition duration-300 ease-in-out border border-b-0 rounded-t-2xl',
			isMenuOpen ? '' : 'translate-y-full'
		)}
		style:box-shadow={`0 0 ${isMenuOpen ? '10px' : '0px'} rgba(0, 0, 0, 0.1)`}
	>
		hello
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

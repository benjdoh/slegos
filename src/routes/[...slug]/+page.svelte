<script lang="ts">
	import { cn } from '$lib/internal/utils.js';
	import { type SvelteComponent, onMount } from 'svelte';
	import { page } from '$app/stores';

	const config = {
		name: 'Slegos',
		description: 'Collection of essential Svelte Composition Utilities',
		url: 'https://slegos.dev',
		author: 'justboereh',
		keywords: `Svelte,Svelte 5,SvelteKit,Svelte Runes,Svelte Utils,Slegos,Svelte Legos,`
	};

	const title = $derived(
		$page.data?.meta?.title ? `${$page.data.meta.title} - ${config.name}` : config.name
	);

	let { data } = $props();

	type Component = $$Generic<typeof SvelteComponent<any, any, any>>;
	const component = $derived(data.component) as unknown as Component;

	onMount(() => {
		for (const element of document.querySelectorAll('.shiki-wrapper')) {
			console.log(element);
		}
	});
</script>

<header class="mb-12">
	<p class="mb uppercase tracking-widest text-black/50 font-semibold">
		{data.section}
	</p>
	<h1 class="text-5xl font-light <md:text-3xl">{data.meta.title}</h1>
	<p class="mt-4 text-sm font-light text-neutral-400 dark:text-neutral-500 md:text-lg">
		{data.meta.description}
	</p>
</header>

<section
	class={cn(
		'prose max-w-full dark:prose-invert',
		'prose-blockquote:text-neutral-500 dark:prose-blockquote:border-neutral-600 dark:prose-blockquote:text-neutral-500',
		'prose-headings:tracking-wide prose-h3:text-lg',
		'prose-tr:grid prose-tr:grid-cols-[.4fr,.6fr,1fr] prose-tr:py-3',
		'dark:prose-thead:border-white/15 dark:prose-tr:border-white/10',
		'prose-teal',
		'flex flex-col gap-4'
	)}
>
	<svelte:component this={component} />
</section>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={config.description} />
	<meta name="keywords" content={config.keywords} />
	<meta name="author" content={config.author} />
	<meta name="twitter:site" content={config.url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={config.description} />
	<meta name="twitter:creator" content={config.author} />
	<meta property="og:title" content={title} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={config.url + $page.url.pathname} />
	<meta property="og:description" content={config.description} />
	<meta property="og:site_name" content={config.name} />
</svelte:head>

<style>
	:global(.shiki-wrapper) {
		@apply: bg-[#eff1f5] p-4 rounded text-sm <md:text-sm <sm:(text-xs) overflow-y-hidden overflow-x-auto relative;
	}

	:global(.shiki-wrapper[copy-code]::after) {
		@apply: absolute top-4 right-4 cursor-pointer select-none i-lucide:copy;
	}
</style>

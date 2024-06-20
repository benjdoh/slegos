<script lang="ts">
	import { cn, type GetContentsItem } from '$lib/internal/index.js';
	import type { SvelteComponent } from 'svelte';
	import { page } from '$app/stores';

	type Props = {
		slug: string;
		pages: GetContentsItem[];
		description: string;
		section: string;
		path: string;
		name: string;
		component: SvelteComponent<Record<string, any>, any, any>;
		config: Record<string, string>;
	};

	type Component = $$Generic<typeof SvelteComponent<any, any, any>>;

	const { component, section, name, config }: Props = $props();
	const c = $derived(component) as unknown as Component;
	const title = $derived(name ? `${name} - ${config.name}` : config.name);
</script>

<header class="<md:mb-12">
	<p class="mb-4 uppercase tracking-widest text-black/50 font-semibold">
		{section}
	</p>
	<h1 class="text-6xl font-light <md:text-4xl">{name}</h1>
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
	<svelte:component this={c} />
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

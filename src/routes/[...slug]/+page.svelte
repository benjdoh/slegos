<script lang="ts">
	import { cn } from '$lib/internal/utils.js';
	import { type SvelteComponent, onMount } from 'svelte';
	import { page } from '$app/stores';
	import Content from './content.svelte';
	import List from './list.svelte';

	const config = {
		name: 'Slegos',
		description: 'Collection of essential Svelte Composition Utilities',
		url: 'https://slegos.dev',
		author: 'justboereh',
		keywords: `Svelte,Svelte 5,SvelteKit,Svelte Runes,Svelte Utils,Slegos,Svelte Legos,`
	};

	let { data } = $props();
</script>

{#if 'sections' in data}
	<List sections={data.sections || []} />
{:else}
	<Content {...data} {config} />
{/if}

<style>
	:global(.shiki-wrapper) {
		@apply: bg-[#eff1f5] p-4 rounded text-sm <md:text-sm <sm:(text-xs) overflow-y-hidden overflow-x-auto relative;
	}

	:global(.shiki-wrapper[copy-code]::after) {
		@apply: absolute top-4 right-4 cursor-pointer select-none i-lucide:copy;
	}
</style>

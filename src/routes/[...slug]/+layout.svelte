<script lang="ts">
	import { cn, kebabCase } from '$lib/internal/utils.js';
	let { data, children } = $props();

	const sections: Record<string, Array<(typeof data.pages)[0]>> = {};

	for (const page of data.pages) {
		if (!sections[page.section]) sections[page.section] = [];

		sections[page.section].push(page);
	}
</script>

<div
	class={cn(
		'fixed left-0 top-16 flex flex-col gap-8 border-r bg-light-300 border-light-900 pr-0',
		'p-10 pt-16 <md:hidden',
		'lg:(pl-29 w-90)'
	)}
	style="height: calc(100vh - 4rem); overflow-y-auto; overflow-x-hidden;"
>
	{#each Object.keys(sections) as section}
		<div class="text-black/60 whitespace-nowrap w-58">
			<h2 class="uppercase font-bold tracking-widest text-md mb-0.5">{section}</h2>

			<ul class="flex flex-col gap-0.5 font-light">
				{#each sections[section] as item}
					{@const href = `${section.toLowerCase()}/${item.name}`}

					<li class="relative">
						<a
							href={`/${href}`}
							class={cn(
								'hover:underline w-full block',
								href === data.slug ? 'text-black font-medium' : ''
							)}
						>
							{item.name}
						</a>

						{#if href === data.slug}
							<span
								class="absolute -right-1.5 top-1/2 transform -translate-y-1/2 rotate-45 pointer-events-none w-3 h-3 bg-white border-l border-light-900 border-b"
							></span>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>

<article
	class="flex-grow p-8 pt-16 md:(p-10) md:(pl-104) overflow-y-auto overflow-x-hidden space-y-4"
>
	{@render children()}
</article>

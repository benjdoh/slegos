<script lang="ts">
	import '@unocss/reset/tailwind.css';
	import 'virtual:uno.css';
	import Topnav from '$lib/internal/components/top nav.svelte';
	import Bottomnav from '../lib/internal/components/bottom nav.svelte';
	const { children, data } = $props();
</script>

<Topnav pages={data.pages} />

{@render children()}

<Bottomnav pages={data.pages} />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,100..900;1,100..900&display=swap');

	:global(body) {
		font-family:
			'Overpass',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Fira Sans',
			'Droid Sans',
			'Helvetica Neue',
			sans-serif;
		font-optical-sizing: auto;
		font-weight: 400;
		font-style: normal;
		@apply <md:mb-16 text-dark-50;
	}
</style>

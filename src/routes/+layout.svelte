<script lang="ts">
	import '@unocss/reset/tailwind.css';
	import 'virtual:uno.css';
	import Navigation from './navigation.svelte';
	const { children, data } = $props();
</script>

{@render children()}

<Navigation sections={data.sections} />

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
		font-weight: 500;
		font-style: normal;
		@apply <md:mb-16;
	}
</style>

<script lang="ts">
	import '@unocss/reset/tailwind.css';
	import 'virtual:uno.css';
	import Navigation from './navigation.svelte';

	const { children } = $props();
</script>

{@render children()}

<Navigation />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,100..900;1,100..900&display=swap');

	:global(body) {
		font-family: 'Overpass', sans-serif;
		font-optical-sizing: auto;
		font-weight: 500;
		font-style: normal;
		@apply <md:mb-16;
	}
</style>

<script lang="ts">
	import { page } from '$app/stores';

	type Props = {
		sections: string[];
	};

	const { sections }: Props = $props();
	const name = $derived($page.url.pathname.slice(1));
</script>

{JSON.stringify(sections, null, 2)}

{name}

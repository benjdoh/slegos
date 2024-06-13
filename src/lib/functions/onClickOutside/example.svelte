<script lang="ts">
	// @ts-ignore
	import { onClickOutside } from './';

	function clickedOutside() {
		console.log('clicked');
	}
</script>

<div use:onClickOutside={clickedOutside}>
	what

	<button>what</button>
</div>

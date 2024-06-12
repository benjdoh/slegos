<script lang="ts">
	import { onClickOutside } from './index.js';

	function clickedOutside() {
		console.log('clicked');
	}
</script>

<div use:onClickOutside={clickedOutside}>
	what

	<button>what</button>
</div>

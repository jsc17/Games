<script lang="ts">
	let { children } = $props();
</script>

{@render children()}

<style>
	:global(body) {
		background-color: darkslategray;
		margin: 0px;
		padding: 0px;
		height: 100dvh;
		width: 100%;
	}
	:global(button) {
		width: max-content;
		align-self: center;
	}
</style>

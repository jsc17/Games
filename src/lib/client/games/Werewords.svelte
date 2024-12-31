<script lang="ts">
	import { socket } from '$lib/client/socket';

	let gameStatus = $state('waiting');
	let gameRole = $state('');
	let teamMates: string[] = $state([]);
	let roleCounts = $state({ villagers: 0, werewolves: 0, seer: true, apprentice: true });
</script>

<div class="game">
	{#if gameStatus == 'waiting'}
		<h1 style="grid-column:1 / 3">Select the roles you wish to use, then press start when everyone is ready</h1>
		<label for="villager-count">Villagers:</label><input id="villager-count" type="number" bind:value={roleCounts.villagers} />
		<label for="werewolf-count">Werewolves: </label><input id="werewolf-count" type="number" bind:value={roleCounts.werewolves} />
		<label for="seer-included">Seer: </label><input id="seer-included" type="checkbox" bind:checked={roleCounts.seer} />
		<label for="apprentice-included">Apprentice Seer: </label><input id="apprentice-included" type="checkbox" bind:checked={roleCounts.apprentice} />
		<button
			onclick={() => {
				socket.emit('startGame', roleCounts);
			}}>Start</button>
	{/if}
</div>

<style>
	.game {
		display: grid;
		grid-template-columns: 2fr 1fr;
		row-gap: 4px;
	}
	label {
		font-weight: bold;
		font-size: 1.5rem;
	}
</style>

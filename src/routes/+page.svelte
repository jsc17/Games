<script lang="ts">
	import { gameList } from '$lib/client/games/gameList';
	import { socket } from '$lib/client/socket';

	let playerList = $state([]);
	let playerName = $state('');
	let nameEntered = $state(false);
	let gameValue = $state('');
	let selectedGame = $state('');
	let GameComponent = $state();

	socket.on('currentState', (data) => {
		console.log(data);
		playerList = data.playerList;
		selectedGame = data.selectedGame;
	});
	socket.on('updatePlayers', (data) => {
		playerList = data.playerList;
	});
	socket.on('gameSelected', (data) => {
		console.log(data);
		selectedGame = data;
	});
	socket.on('test', (data) => {
		console.log(data);
	});

	$effect(() => {
		if (selectedGame) {
			import(`$lib/client/games/${selectedGame}.svelte`).then((res) => (GameComponent = res.default));
		}
	});
</script>

<div class="game-body">
	<main>
		{#if !nameEntered}
			<label class="login-label" for="username">Please enter your name: </label>
			<input id="username" bind:value={playerName} type="text" required />
			<button
				onclick={() => {
					socket.emit('playerAdded', playerName);
					nameEntered = true;
				}}>Login</button>
		{:else if !selectedGame}
			<label>
				Select the game you wish to play: <select name="game" bind:value={gameValue}>
					{#each gameList as game}
						<option id={game.id}>{game.name}</option>
					{/each}
				</select>
			</label>
			<button
				onclick={() => {
					socket.emit('gameSelected', gameValue);
				}}>
				Select Game
			</button>
		{:else if GameComponent}
			<GameComponent></GameComponent>
		{/if}
	</main>
	<aside>
		<div>
			<h1>Players:</h1>
			<ul>
				{#each playerList as player}
					<li>{player}</li>
				{/each}
			</ul>
		</div>
		<button>Reset Players</button>
	</aside>
</div>

<style>
	.game-body {
		display: grid;
		grid-template-columns: 5fr 1fr;
		height: 100%;
	}
	main {
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	aside {
		padding: 16px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.login-label {
		font-weight: bold;
		font-size: 2rem;
	}
</style>

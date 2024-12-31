import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type ViteDevServer } from 'vite';

import { Server } from 'socket.io';

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: ViteDevServer) {
		if (!server.httpServer) return

		const io = new Server(server.httpServer)

		let gameState = "selecting";
		let selectedGame = "";
		let gameObject: any;
		let clients = new Map()

		io.on('connection', (socket) => {
			console.log("A connection has been made to the server")
			socket.emit('currentState', { playerList: Array.from(clients.values()).map(value => { return value.playerName }), gameState, selectedGame });

			socket.on("playerAdded", (playerName) => {
				clients.set(socket, { playerName })
				socket.emit("gameState", gameState);
				io.emit('updatePlayers', { playerList: Array.from(clients.values()).map(value => { return value.playerName }) });
			});
			socket.on("gameSelected", (game) => {
				gameState = "waiting";
				selectedGame = game;
				import(`./src/lib/server/games/${selectedGame.toLowerCase()}.ts`).then(res => { gameObject = res.default })
				io.emit("gameSelected", selectedGame);
			})
			socket.on("startGame", (data) => {
				gameObject.startGame(data, io);

			})
			socket.on("test", (data) => {
				console.log(data);
			});
		})
	}
}

export default defineConfig({
	plugins: [sveltekit(), webSocketServer]
});

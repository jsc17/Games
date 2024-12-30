import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type ViteDevServer } from 'vite';

import { Server } from 'socket.io';

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: ViteDevServer) {
		if (!server.httpServer) return

		const io = new Server(server.httpServer)

		let playerList = ["Jon"];
		io.on('connection', (socket) => {
			socket.emit('updatePlayers', {playerList});
			socket.on("playerAdded", (playerName)=>{
				playerList.push(playerName);
				socket.emit('updatePlayers', {playerList});
			})
		})
	}
}

export default defineConfig({
	plugins: [sveltekit(), webSocketServer]
});

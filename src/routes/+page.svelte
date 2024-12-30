<script lang="ts">
    import {io} from "socket.io-client"

    const socket = io()

    let playerList = $state([])
    let playerName = $state("")

    socket.on("updatePlayers", (data)=>{
        playerList = data.playerList;
    })

</script>

<main>
    <h1>Players:</h1>
    <ul>
        {#each playerList as player}
            <li>{player}</li>
        {/each}
    </ul>
    <input type="text" bind:value={playerName}>
    <button onclick={()=>{socket.emit("playerAdded", playerName)}}>Send Event</button>
</main>
class WerewordsGame {
    roles = { villagers: 0, werewolves: 0, seer: true, apprentice: true }

    startGame(data: any, io: any) {
        io.emit("test", "Hello World")

    }
}
const werewordsGame = new WerewordsGame();
export default werewordsGame;
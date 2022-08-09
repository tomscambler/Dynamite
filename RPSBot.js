class Bot {
    makeMove(gamestate) {

        return ['P','R','S'][Math.floor(Math.random() * 3)];
    }
}

module.exports = new Bot();

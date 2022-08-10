class Bot {
    makeMove(gamestate) {
        // weight previous moves more heavily but take into account all previous moves
        // after that, think about how and when to deploy the dynamite (after a certain number of draws, and taking into account the max number of dynamites useable)

        if (gamestate.rounds.length === 0) {
            this.dynamiteCount = 100;
            this.roundCount = 0;
            this.p1PreviousOutput = [];
            this.p2PreviousOutput = [];
            this.output =  ['P','R','S'][Math.floor(Math.random() * 3)];
        }
        else{
            this.p2LastMove = gamestate.rounds[this.roundCount-1].p2;
            this.p2PreviousOutput.push(this.p2LastMove);
            this.output = "R";
        }

        this.roundCount++;
        this.p1PreviousOutput.push(this.output);
        return this.output;
    }
}

module.exports = new Bot();
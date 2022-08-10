class Bot {
    makeMove(gamestate) {
        // weight previous moves more heavily but take into account all previous moves
        // after that, think about how and when to deploy the dynamite (after a certain number of draws, and taking into account the max number of dynamites useable)

        if (gamestate.rounds.length ===0) {
            this.dynamite = 100;
            this.roundCount = 0;
            this.p1previousoutput = []
            output =  ['P','R','S'][Math.floor(Math.random() * 3)];
        }

        

        this.p1previousoutput.push(output)
        
        return output;



    }
}

module.exports = new Bot();
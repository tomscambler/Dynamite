class Bot {

    //Dynamite functionaality to be separate / added later
    whatBeats(myChar){
        if (myChar==="R"){
            return "P";
        }
        else if (myChar==="P"){
            return "S";
        }
        else if (myChar==="S"){
            return "R";
        }
    }

    numberOfConsecutiveDraws(gamestate){
        let i=1;
        while (i<=gamestate.rounds.length && gamestate.rounds[gamestate.rounds.length-i].p2===gamestate.rounds[gamestate.rounds.length-i].p1){
            i++;
        }
        return i-1;
    }

    makeMove(gamestate) {
        // weight previous moves more heavily but take into account all previous moves
        // after that, think about how and when to deploy the dynamite (after a certain number of draws, and taking into account the max number of dynamites useable)
        let output;
        let p2RockPercent;
        let p2ScissorsPercent;
        let p2PaperPercent;
        let rand;

        if (gamestate.rounds.length === 0) {
            this.dynamiteCount = 0;
            this.roundCount = 0;
            this.p1PreviousOutput = [];
            this.p2PreviousOutput = [];
            output =  ['P','R','S'][Math.floor(Math.random() * 3)];
        }
        else{
            //if there have been enough draws - play dynamite
            let drawThreshold = 2;
            if (this.dynamiteCount<100 && this.numberOfConsecutiveDraws(gamestate)>=drawThreshold){
                
                rand = Math.random()*100
                if (rand > this.dynamiteCount){
                    output = "D";
                }

                this.dynamiteCount++;
            }
            //if there are enough draws, but no dynamite left
            else if(this.dynamiteCount==0 && this.numberOfConsecutiveDraws(gamestate)>=drawThreshold){
                output = "W";
            }
            
            if (!output){
                //console.log("hi");

                let p2LastMove = gamestate.rounds[this.roundCount-1].p2;
                this.p2PreviousOutput.push(p2LastMove);

                p2RockPercent = this.p2PreviousOutput.filter(i=>i==="R").length/this.roundCount;
                p2ScissorsPercent = this.p2PreviousOutput.filter(i=>i==="S").length/this.roundCount;
                p2PaperPercent = this.p2PreviousOutput.filter(i=>i==="P").length/this.roundCount;
                
                rand = Math.random() * (p2RockPercent + p2ScissorsPercent + p2PaperPercent);
                let toBeat;

                if (rand<p2RockPercent)
                {
                    toBeat = "R";
                }
                else if (rand < p2RockPercent + p2ScissorsPercent)
                {
                    toBeat = "S";
                }
                else
                {
                    toBeat = "P";
                }

                output = this.whatBeats(toBeat);
            }  
        }
        
        //console.log(output, this.dynamiteCount);
        this.roundCount++;
        this.p1PreviousOutput.push(output);
        return output;
    }
}

module.exports = new Bot();
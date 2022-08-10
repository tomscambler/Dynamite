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

    stringOfLastNMoves(n, p2PreviousOutput){
        let outputString = "";
        
        for( let i=1; i<=Math.min(n, p2PreviousOutput.length); i++){
            outputString += p2PreviousOutput[p2PreviousOutput.length-i];
        }

        return outputString;
    }


    makeMove(gamestate) {
        // weight previous moves more heavily but take into account all previous moves
        // after that, think about how and when to deploy the dynamite (after a certain number of draws, and taking into account the max number of dynamites useable)
        let output;
        let p2RockPercent;
        let p2ScissorsPercent;
        let p2PaperPercent;
        let rand;

        //if it's the first round
        if (gamestate.rounds.length === 0) {
            this.dynamiteCount = 0;
            this.roundCount = 0;
            this.p1PreviousOutput = [];
            this.p2PreviousOutput = [];
            output =  ['P','R','S'][Math.floor(Math.random() * 3)];
        }

        //else if it's not the first round:
        else{
            let drawThreshold = 3;

            if(this.stringOfLastNMoves(4,this.p2PreviousOutput)==="DDDD"){
                output = "W";
            }

            //if there have been enough consecutive draws - play dynamite
            else if (this.dynamiteCount<100 && this.numberOfConsecutiveDraws(gamestate)>=drawThreshold){
                
                rand = Math.random()*100

                if (this.numberOfConsecutiveDraws(gamestate)===4){
                    output = "D";
                    this.dynamiteCount++;
                }

                else if (rand > this.dynamiteCount){
                    output = "D";
                    this.dynamiteCount++;
                }
            }

            //if there are enough consecutive draws, but no dynamite left
            else if(this.dynamiteCount==0 && this.numberOfConsecutiveDraws(gamestate)>=drawThreshold){
                output = "W";
            }
            
            if (!output){

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

                if (Math.random()<0.25){
                    toBeat = this.whatBeats(toBeat);
                }

                output = this.whatBeats(toBeat);

                //if we're getting close to the end, more likely to override dynamite
                if (this.dynamiteCount<100 && this.roundCount>1500)
                {
                    if (Math.random()<0.20){
                        output = "D";
                        this.dynamiteCount++;
                    }
                }
            }  
        }
        
        // if (gamestate.rounds[gamestate.rounds.length-1].p1===this.whatBeats(gamestate.rounds[gamestate.rounds.length-1].p2)){
        //     this.p1Score += this.numberOfConsecutiveDraws(gamestate);
        // }

        this.roundCount++;
        this.p1PreviousOutput.push(output);
        return output;
    }
}

module.exports = new Bot();
class Bot {
    constructor(){
        this.myDynamite = 100
        this.opponentDynamite = 100;
        this.p1Score = 0;
        this.p2Score = 0;
        this.roundValue = 1;
    }

    makeMove(gamestate) {
        const lastRoundResult = this.getLastRoundResult(gamestate);
        switch (lastRoundResult) {
            case 'p1Win':
                ++this.p1Score;
                this.roundValue = 1;
            case 'p2Win':
                ++this.p2Score;
                this.roundValue = 1;
            case 'tie':
                ++this.roundValue;
        }

        const opponentLastMove = this.getOpponentLastMove(gamestate);
        if (opponentLastMove == 'D') {
            --this.opponentDynamite
        }

        if (this.roundValue > 3 && this.myDynamite > 0) {
            const doIDynamite = Math.random();
            const doIWater = this.opponentDynamite > 0 ? Math.random() : 0;

            if (doIDynamite < 0.25) {
                if (doIWater < 0.1) {
                    return this.randomRps();
                }
                return 'W';
            }
            else {
                --this.myDynamite;
                return 'D';
            }
        }
        else {
            return this.randomRps();
        }
    }

    randomRps() {
        const randomNumber = Math.floor(Math.random()*3)
        switch (randomNumber) {
            case 0: return 'R';
            case 1: return 'P';
            case 2: return 'S';
            default: return 'R';
        }
    }

    getOpponentLastMove(gamestate) {
        if (gamestate.rounds.length == 0) {
            return;
        }
        else {
            return gamestate.rounds.slice(-1)[0].p2;
        }
    }

    getLastRoundResult(gamestate) {
        if (gamestate.rounds.length == 0) {
            return;
        }
        else {
            return this.getResult(gamestate.rounds.slice(-1)[0]);
        }
    }

    getResult(round) {
        switch (round.p1) {
            case 'R':
                switch (round.p2) {
                    case 'R': return 'tie';
                    case 'P': return 'p2Win';
                    case 'S': return 'p1Win';
                    case 'D': return 'p2Win';
                    case 'W': return 'p1Win';
                    default: return 'tie';
                }
            case 'P':
                switch (round.p2) {
                    case 'R': return 'p1Win';
                    case 'P': return 'tie';
                    case 'S': return 'p2Win';
                    case 'D': return 'p2Win';
                    case 'W': return 'p1Win';
                    default: return 'tie';
                }
            case 'S':
                switch (round.p2) {
                    case 'R': return 'p2Win';
                    case 'P': return 'p1Win';
                    case 'S': return 'tie';
                    case 'D': return 'p2Win';
                    case 'W': return 'p1Win';
                    default: return 'tie';
                }
            case 'D':
                switch (round.p2) {
                    case 'R': return 'p1Win';
                    case 'P': return 'p1Win';
                    case 'S': return 'p1Win';
                    case 'D': return 'tie';
                    case 'W': return 'p2Win';
                    default: return 'tie';
                }
            case 'W':
                switch (round.p2) {
                    case 'R': return 'p2Win';
                    case 'P': return 'p2Win';
                    case 'S': return 'p2Win';
                    case 'D': return 'p1Win';
                    case 'W': return 'tie';
                    default: return 'tie';
                }
            default: return 'tie';
        }
    }
}

module.exports = new Bot();

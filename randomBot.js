class Bot {
    constructor(){
        this.dynamite = 100;
    }

    makeMove(gamestate) {
        return this.randomRps();
    }

    randomRps() {
        const availableMoves = this.dynamite > 0 ? 5 : 4;

        const randomNumber = Math.floor(Math.random()*availableMoves)
        switch (randomNumber){
            case 0:
                return 'R';
            case 1:
                return 'P';
            case 2:
                return 'S';
            case 3:
                return 'W';
            case 4:
                --this.dynamite
                return 'D';
            default: return 'R';
        }
    }
}

module.exports = new Bot();

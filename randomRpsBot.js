class Bot {
    makeMove(gamestate) {
        return this.randomRps();
    }

    randomRps() {
        const randomNumber = Math.floor(Math.random()*3)
        switch (randomNumber){
            case 0: return 'R';
            case 1: return 'P';
            case 2: return 'S';
            default: return 'R';
        }
    }
}

module.exports = new Bot();

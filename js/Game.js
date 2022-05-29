class Game {
    balls;
    drawnBalls;
    chosenNumbers;
    ballsCopy;

    constructor(balls) {
        this.balls = balls;
        this.drawnBalls = [];
        this.chosenNumbers = [];
        this.ballsCopy = [].concat(this.balls);
    }

    playerNumbers(ball) {
        if (this.chosenNumbers.indexOf(ball) === -1 && this.chosenNumbers.length < 6) {
            this.chosenNumbers.push(ball);
        } else if (this.chosenNumbers.indexOf(ball) > -1) {
            this.chosenNumbers.splice(this.chosenNumbers.indexOf(ball), 1);
        }
        // this.choosenNumbers.indexOf(ball) === -1 ? this.choosenNumbers.push(ball) : this.choosenNumbers.splice(this.choosenNumbers.indexOf(ball), 1);

        return this.chosenNumbers;
    }

    getRandomBall() {
        this.ball = '';
        if (this.balls.length === 13) {
            this.balls = [].concat(this.ballsCopy);
        }
        let rand = Math.floor(Math.random() * this.balls.length);
        this.ball = this.balls[rand];
        this.drawnBalls.push(this.ball);
        this.balls.splice(rand, 1);
        return this.ball;
    }


}

let game = new Game(balls);
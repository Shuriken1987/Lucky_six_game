class Game {
    balls;
    drawnBalls;
    choosenNumbers;
    ballsCopy;

    constructor(balls) {
        this.balls = balls;
        this.drawnBalls = [];
        this.choosenNumbers = [];
        this.ballsCopy = [].concat(this.balls);
    }

    playerNumbers(ball) {
        if (this.choosenNumbers.indexOf(ball) === -1 && this.choosenNumbers.length < 6) {
            this.choosenNumbers.push(ball);
        } else if (this.choosenNumbers.indexOf(ball) > -1) {
            this.choosenNumbers.splice(this.choosenNumbers.indexOf(ball), 1);
        }
        // this.choosenNumbers.indexOf(ball) === -1 ? this.choosenNumbers.push(ball) : this.choosenNumbers.splice(this.choosenNumbers.indexOf(ball), 1);
        return this.choosenNumbers;
    }

    getRandomBall() {
        this.ball = '';
        if (this.balls.length === 14){
            this.balls = [].concat(this.ballsCopy);
        }
        let rand = Math.floor(Math.random() * this.balls.length);
        this.ball = this.balls[rand];
        this.drawnBalls.push(this.ball.value);
        this.balls.splice(rand, 1);
        return this.ball;
    }


}

let game = new Game(balls);
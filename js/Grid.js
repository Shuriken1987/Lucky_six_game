class Grid {
    constructor(balls) {
        this.grid = document.querySelector('.chooseBalls');
        this.drawnBalls = document.querySelectorAll('.number');
        this.balls = balls;
    }

    partOneCreate() {
        for (let i = 0; i < this.balls.length; i++) {
            this.div = document.createElement('div');
            this.div.className = 'ball';
            this.div.style.backgroundImage = "url(" + this.balls[i].image + ")";
            this.div.setAttribute('data-id', this.balls[i].value);
            this.grid.appendChild(this.div);
        }
        return this.grid;
    }

    sortedDrawnBalls() {
        this.drawnBalls = document.querySelectorAll('.number');
        let sorted = [];
        this.drawnBalls.forEach(ball => sorted.push(ball));
        sorted.sort((a, b) => a.getAttribute('data-index') - b.getAttribute('data-index'));
        return sorted;
    }
}

let grid = new Grid(balls);

grid.partOneCreate();

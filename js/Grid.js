class Grid {
    constructor(balls) {
        this.grid = document.querySelector('.chooseBalls');
        this.balls = balls;
        // this.table = document.querySelector('.tabla');
        // this.leftTable = document.querySelector('.tabla-deo');
        // this.tabelMidle = document.querySelector('.tabla-deo-veliki');
        // this.bigBall = document.querySelector('.velika-kugla');
        // this.firstFive = document.querySelector('.prve-pet-kugle');
    }

    partOneCreate() {
        for (let i = 0; i < this.balls.length; i++) {
            this.div = document.createElement('div');
            this.div.className = 'ball';
            this.div.style.backgroundImage = "url(" + balls[i].image + ")";
            this.div.setAttribute('data-id', i + 1);
            this.grid.appendChild(this.div);
        }
        return this.grid;
    }

    // tableCenter() {
    //     let kvote = [100, 90, 80, 70, 60, 50, 40, 30, 25, 20, 15, 10];
    //     let grid = '';
    //     grid += `
    //     <div class="kugla-prva">
    //          <span class="broj"  data-index = '1'></span>
    //      </div>
    //     `;
    //     this.bigBall.innerHTML = grid;
    //     for (let i = 0; i < 5; i++) {
    //         grid += `
    //             <div class="kugla-5">
    //                <span class="broj" data-index = '2'></span>
    //             </div>
    //          `;
    //     }
    //     this.firstFive.innerHTML = grid;
    //     this.bigBall.innerHTML = this.firstFive.innerHTML;
    // }
    //
    // tableLeft() {
    //     let kvote = [10000, 7500, 5000, 2500, 1000, 500, 300, 200, 150, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    //     let grid = '';
    //     for (let i = 6; i < 15; i++) {
    //         grid += `
    //          <div class="kugla-puta">
    //                 <div class="kugla">
    //                     <span class="broj" data-index = '${i}' data-puta = '10000'></span>
    //                 </div>
    //                 <span class="puta">${kvote[i - 6]}</span>
    //             </div>
    //         `;
    //     }
    //     this.leftTable.innerHTML = grid;
    // }

}

let grid = new Grid(balls);

grid.partOneCreate();
// grid.tableLeft();
// grid.tableCenter();

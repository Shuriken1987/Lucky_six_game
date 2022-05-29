function mainCode() {
    let ballClick = document.querySelectorAll('.ball');
    let counterDiv = document.querySelector('.counter');
    let chooseBallsDiv = document.querySelector('.firstPart');
    let drawBallsDiv = document.querySelector('.board');
    let firstBall = document.querySelector('.drawn-number');
    let inputHolder = document.querySelector('.input-group');
    let betBtn = document.querySelector('.bet');               // button for placing bets
    let bet = document.querySelector('#place-bet');         // input field for placing bets
    let resetButton = document.querySelector('.close');
    let endOfGame = document.querySelector('.end-of-game');
    let endOfGameText = document.querySelector('p');
    let warning = document.querySelector('.warning');
    let betted = false;
    let roundsHolder = document.querySelector('.roundsHolder');
    let statsBtn = document.querySelector('.stats');
    let gameTables = document.querySelector('.game');

    betBtn.addEventListener('click', bets);

    startGame();

    function startGame() {
        newRound();
        ballClick.forEach(ball => ball.onclick = chooseNumber);
    }

    function newRound() {
        drawBallsDiv.style.display = 'none';
        let counter = 15;
        let loop = setInterval(() => {
            if (counter === 0) {
                chooseBallsDiv.style.display = 'none';
                drawBallsDiv.style.display = 'flex';
                draw();
                clearInterval(loop);
            }
            counterDiv.innerHTML = counter--;
        }, 1000)
    }

    function chooseNumber() {
        let ball = parseInt(this.getAttribute('data-id'));
        game.playerNumbers(ball);
        let numberHolder = document.querySelector('.number-holder');
        let number = document.createElement('div');
        number.className = 'chosen';
        number.setAttribute('data-id', this.getAttribute('data-id'));
        number.setAttribute('style', this.getAttribute('style'));
        numberHolder.appendChild(number);
        let chosen = document.querySelectorAll('.chosen');
        chosen.forEach(el => {
            if (el.getAttribute('data-id') === this.getAttribute('data-id') && game.chosenNumbers.indexOf(ball) === -1) {
                numberHolder.removeChild(el);
            }
        });
    }

    function lastFiveRounds() {
        let lastRound = document.createElement('div');
        game.drawnBalls.forEach(ball => {
            let lastRoundBalls = document.createElement('img');
            lastRound.className = 'lastRound';
            lastRoundBalls.className = 'lastRoundBalls';
            lastRoundBalls.setAttribute('src', ball.image);
            lastRound.appendChild(lastRoundBalls)
            roundsHolder.appendChild(lastRound);
        })
        let rounds = document.querySelectorAll('.lastRound');
        if (rounds.length > 5) {
            roundsHolder.removeChild(rounds[0])
        }
    }

    function draw() {
        inputHolder.style.display = 'none';
        let balls = grid.sortedDrawnBalls();
        let i = 0;
        let ballImage = '';
        let loop = setInterval(() => {
            ballImage = game.getRandomBall().image;
            firstBall.setAttribute('src', ballImage);
            firstBall.style.display = 'block';
            firstBall.classList.add('animate__animated', 'animate__zoomInUp');
            let loop_2 = setTimeout(() => {
                firstBall.classList.remove('animate__animated', 'animate__zoomInUp');
                balls[i].classList.add('animate__animated', 'animate__fadeIn');
                balls[i].setAttribute('src', ballImage);
                balls[i].style.display = 'block';
                i++;
            }, 1000);
            if (i === grid.drawnBalls.length) {
                clearInterval(loop);
                clearInterval(loop_2);
                checkWin(balls);
                lastFiveRounds();
                resetGame();
            }
        }, 2000);
    }


    function resetGame() {
        let chosen = document.querySelectorAll('.chosen');
        chooseBallsDiv.style.display = 'flex';
        game.chosenNumbers = [];
        game.drawnBalls = [];
        chosen.forEach(el => el.remove())
        counterDiv.innerHTML = '';
        firstBall.removeAttribute('src');
        firstBall.style.display = 'none';
        inputHolder.style.display = 'flex';
        grid.drawnBalls.forEach(ball => {
            ball.removeAttribute('src')
            ball.style.display = 'none';
            ball.classList.remove('animate__animated', 'animate__fadeIn');
        });
        resetButton.addEventListener('click', () => {
            endOfGame.style.opacity = '0';
            endOfGame.style.zindex = '-1';
            endOfGameText.innerHTML = '';
            endOfGame.style.display = 'none';
        });
        // bets();
        betted = false;
        warning.innerHTML = '';
        startGame();
    }


    function checkWin(balls) {
        if (betted === true) {
            let output = game.drawnBalls.filter(el => game.chosenNumbers.indexOf(el.value) !== -1);
            console.log(output);
            if (output.length === 6) {
                balls.forEach(ball => {
                    if (ball.getAttribute('src') === 'img/' + output[output.length - 1] + '.png') {
                        let x = ball.getAttribute('data-value');
                        let win = x * bet.value;
                        playerWonStyle(win);
                    }
                });
            } else {
                playerLostStyle(output);
            }
            endOfGame.style.opacity = '.9';
            endOfGame.style.zIndex = '1';
        }
    }

    function bets() {
        if (game.chosenNumbers.length === 6 && !isNaN(bet.value) && bet.value >= 10) {
            betted = true;
            warning.style.display = 'none';
            warning.innerHTML = '';
            inputHolder.style.display = 'none';
        } else {
            displayWarning(bet.value);
            warning.style.display = 'block';
            bet.value = '';
        }
        return bet.value;
    }

    function displayWarning(bet) {
        if (game.chosenNumbers.length !== 6) {
            warning.innerHTML = 'Please select 6 numbers first.';
        } else if (isNaN(bet)) {
            warning.innerHTML = 'Invalid bet.';
        } else if (bet < 10) {
            warning.innerHTML = 'Minimum bet is 10$';
        }
        return warning.innerHTML;
    }


    function playerWonStyle(win) {
        endOfGame.style.display = 'flex';
        endOfGame.style.backgroundColor = 'rgba(29, 202, 43, 0.904)';
        endOfGameText.innerHTML = 'Congratulations you won ' + win + '$';
    }

    function playerLostStyle(output) {
        endOfGame.style.display = 'flex';
        endOfGame.style.backgroundColor = 'rgba(219, 32, 32, 0.904)';
        endOfGameText.innerHTML = `You lost,
                                   you hit ${output.length} numbers.
                `;
    }

    statsBtn.addEventListener('click', () => {
        if (statsBtn.innerHTML === 'Stats') {
            roundsHolder.style.display = 'block';
            gameTables.style.display = 'none';
            statsBtn.innerHTML = 'Game';
        } else {
            roundsHolder.style.display = 'none';
            gameTables.style.display = 'flex';
            statsBtn.innerHTML = 'Stats';
        }
    });

    // function stats() {
    //     rounds.style.display = 'block';
    //     row.style.display = 'none';
    //     statsBtn.innerHTML = 'game';
    //     statsBtn.addEventListener('click',()=>{
    //          if (statsBtn.innerHTML = 'game') {
    //         rounds.style.display = 'none';
    //         row.style.display = 'flex';
    //
    //     }
    //           statsBtn.innerHTML = 'stats';
    //     })
    //
    // }
}

mainCode();


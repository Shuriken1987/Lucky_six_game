function mainCode() {
    let ballClick = document.querySelectorAll('.ball');
    let counterDiv = document.querySelector('.counter');
    let chooseBallsDiv = document.querySelector('.pocetak');
    let drawBallsDiv = document.querySelector('.board');
    let firstBall = document.querySelector('.drawn-number');
    let drawnBalls = document.querySelectorAll('.number');
    let inputHolder = document.querySelector('.input-group');
    let betBtn = document.querySelector('.bet');               // button for placing bets
    let bet = document.querySelector('#place-bet');         // input field for placing bets
    let resetButton = document.querySelector('.close');
    let endOfGame = document.querySelector('.end-of-game');
    let endOfGameText = document.querySelector('p');
    let warning = document.querySelector('.warning');


    betBtn.addEventListener('click', bets);

    startGame();

    function startGame() {
        drawBallsDiv.style.display = 'none';
        newRound();
        ballClick.forEach(ball => {
            ball.onclick = chooseNumber;
        });
    }

    function newRound() {
        let counter = 20;
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
        number.className = 'choosen';
        number.setAttribute('data-id', this.getAttribute('data-id'));
        number.setAttribute('style', this.getAttribute('style'));
        numberHolder.appendChild(number);
        let choosen = document.querySelectorAll('.choosen');
        choosen.forEach(el => {
            if (el.getAttribute('data-id') === this.getAttribute('data-id') && game.choosenNumbers.indexOf(ball) === -1) {
                numberHolder.removeChild(el);
            }
        });
    }

    function draw() {
        inputHolder.style.display = 'none';
        let balls = sortedBallDivs();
        let i = 0;
        let ballImage = '';
        let loop = setInterval(() => {
            ballImage = game.getRandomBall().image;
            firstBall.setAttribute('src', ballImage);
            firstBall.style.display = 'block';
            balls[i].classList.add('animate__animated', 'animate__fadeIn');
            balls[i].setAttribute('src', ballImage);
            balls[i].style.display = 'block';
            i++;
            if (i === sortedBallDivs().length) {
                clearInterval(loop);
                checkWin(balls);
                resetGame();                                  //ovde sam prekinuo
            }
        }, 500);
    }

    function resetGame() {
        let choosen = document.querySelectorAll('.choosen');
        chooseBallsDiv.style.display = 'flex';
        game.choosenNumbers = [];
        game.drawnBalls = [];
        choosen.forEach(el => el.remove())
        counterDiv.innerHTML = '';
        firstBall.removeAttribute('src');
        firstBall.style.display = 'none';
        inputHolder.style.display = 'flex';
        warning.innerHTML = '';
        // console.log(bets());
        drawnBalls.forEach(ball => {
            ball.removeAttribute('src')
            ball.style.display = 'none';
        });
        resetButton.addEventListener('click', () => {
            endOfGame.style.opacity = '0';
            endOfGame.style.zindex = '-1';
            endOfGameText.innerHTML = '';
            endOfGame.style.display = 'none';
            // endOfGame.removeAttribute('background-color');
        });
        startGame();
    }


    function checkWin(balls) {
        if (game.choosenNumbers.length === 6 && bets() !== '') {
            let output = game.drawnBalls.filter(el => game.choosenNumbers.indexOf(el) !== -1);
            console.log(output);
            if (output.length === 6) {
                balls.forEach(ball => {
                    if (ball.getAttribute('src') === 'img/' + output[output.length - 1] + '.png') {
                        let x = ball.getAttribute('data-puta');
                        let win = x * bet.value;
                        endOfGame.style.display = 'flex';
                        endOfGame.style.backgroundColor = 'rgba(29, 202, 43, 0.904)';
                        endOfGameText.innerHTML = 'Congratulations you won ' + win + '$';
                    }
                });
            } else {
                endOfGame.style.display = 'flex';
                endOfGame.style.backgroundColor = 'rgba(219, 32, 32, 0.904)';
                endOfGameText.innerHTML = `You lost,
                                           you hit ${output.length} numbers,
                                           your numbers are ${output}
                `;
            }
            endOfGame.style.opacity = '.9';
            endOfGame.style.zIndex = '1';
        }
        // else{
        //     let choosen = document.querySelectorAll('.choosen');    // ovo bi trebalo na pocetku
        //     choosen.forEach(el=> el.remove());
        // }
    }

    function bets() {
        if (game.choosenNumbers.length === 6 && !isNaN(bet.value) && bet.value >= 10) {
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
        console.log(bet)
        if (game.choosenNumbers.length !== 6) {
            warning.innerHTML = 'Please select 6 numbers first.';
            // let choosen = document.querySelectorAll('.choosen');
            // choosen.forEach(ball => ball.remove());
            // game.choosenNumbers = [];
        } else if (isNaN(bet)) {
            warning.innerHTML = 'Invalid bet.';
        } else if (bet < 10) {
            warning.innerHTML = 'Minimum bet is 10$';
        }
        return warning.innerHTML;
    }

    function sortedBallDivs() {
        let sorted = [];
        drawnBalls.forEach(ball => sorted.push(ball))
        sorted.sort((a, b) => a.getAttribute('data-index') - b.getAttribute('data-index'));
        return sorted;
    }
}

mainCode();


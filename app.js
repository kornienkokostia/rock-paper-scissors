let round = 0;
let win = 0;

const showCards = () => {
    const main = document.querySelector('.main')
    const div = document.createElement('div');
    div.className = 'choise';
    div.innerHTML = `
    <h1 class="choise-h2">Choose!</h1>
    <div class="choise-cards">
        <div class="choise-card rock">✊</div>
        <div class="choise-card paper">✋</div>
        <div class="choise-card scissors">✌</div>
    </div>
    <button class="choise-button">Reset</button>
    `;

    main.appendChild(div);
    document.querySelector('.choise-button').addEventListener('click', () => {
        document.querySelector('.scoreboard-field-results').innerHTML = "";
        win = 0
        round = 0
        alert('The game score was reset!')
    })
}

const createScoreboard = () => {
    const main = document.querySelector('.main')
    const div = document.createElement('div');
    
    div.className = 'scoreboard';
    div.innerHTML = `
    <div class="scoreboard-field">
        <h1 class="scoreboard-field-h2">Scoreboard</h1>
        <div class="scoreboard-field-results">
        </div>
        <button class="scoreboard-field-button">Continue!</button>
    </div>
    `;

    main.appendChild(div);
    
    document.querySelector('.scoreboard-field-button').addEventListener('click', () => {
        document.querySelector('.scoreboard').style.display = "none";
        document.querySelector('.choise').style.display = "flex";
    })
}

const showScoreboard = (your, random, round) => {
    if (document.querySelector('.scoreboard')) {
        document.querySelector('.scoreboard').style.display = "flex"
    } else {
        createScoreboard()
    }
    let opot = ['WIN', 'LOSE', 'DRAW']
    let res = ''
    if (your === "paper" && random === "scissors") {
        res = opot[1]
    }
    if (your === "paper" && random === "rock") {
        res = opot[0]
        win++
    }
    if (your === "paper" && random === "paper") {
        res = opot[2]
    }
    if (your === "rock" && random === "scissors") {
        res = opot[0]
        win++
    }
    if (your === "rock" && random === "paper") {
        res = opot[1]
    }
    if (your === "rock" && random === "rock") {
        res = opot[2]
    }
    if (your === "scissors" && random === "scissors") {
        res = opot[2]
    }
    if (your === "scissors" && random === "rock") {
        res = opot[1]
    }
    if (your === "scissors" && random === "paper") {
        res = opot[0]
        win++
    }
    switch (your) {
        case 'rock':
            your = '✊'
            break;
        case 'paper':
            your = '✋'
            break;
        case 'scissors':
            your = '✌'
            break;
    }
    switch (random) {
        case 'rock':
            random = '✊'
            break;
        case 'paper':
            random = '✋'
            break;
        case 'scissors':
            random = '✌'
            break;
    }
    let board = document.querySelector('.scoreboard-field-results')
    let div = document.createElement('div')
    div.classList.add('scoreboard-item')
    div.innerHTML = `<p class='round'>Round ${round}</p>
    <p class='your'>${your}</p> <span class="vs">vs</span>  <p class='random'>${random}</p><p class='res'>${res}</p>`
    board.append(div)
    document.querySelector('.scoreboard-field-results').scrollTo(
        { top: document.querySelector('.scoreboard-field-results').scrollHeight, behavior: 'smooth' });
    if (win === 3) {
        console.log('win')
        endPage(state = true)
    } 
    if (round === 10 & win <= 2) {
        console.log('lose')
        endPage(state = false)
    }   
}

const endPage = (state) => {
    document.querySelector('.scoreboard-field-button').style.display = "none";
    document.querySelector('.scoreboard-field-h2').classList.add("padding-on-board")
    document.querySelector('.scoreboard-field').classList.add("display-flex-board")  
    if (document.querySelector('.end')) {
        document.querySelector('.end').remove()
    } 
    const main = document.querySelector('.main')
    const div = document.createElement('div');
    div.className = 'end';
    div.innerHTML = `
        <h1 class="end-h2"></h1>
        <p class="end-p"></p>
        <button class="end-button">Play Again!</button>`;
    main.appendChild(div);
    if (state === true) {
        document.querySelector('.end-h2').innerHTML = 'Congrats!!!'
        document.querySelector('.end-p').innerHTML = 'You Won'
    } 
    if (state === false) {
        document.querySelector('.end-h2').innerHTML = "I'm sorry"
        document.querySelector('.end-p').innerHTML = 'You Lost'
    }
        
    document.querySelector('.end-button').addEventListener('click', () => {
        document.querySelector('.scoreboard-field-results').innerHTML = "";
        document.querySelector('.choise').style.display = "flex";
        document.querySelector('.scoreboard-field-button').style.display = "block";
        document.querySelector('.end').style.display = "none";
        document.querySelector('.scoreboard').style.display = "none";
        document.querySelector('.scoreboard-field').classList.remove("display-flex-board");
        document.querySelector('.scoreboard-field-h2').classList.remove("padding-on-board");
        win = 0
        round = 0
    })
    
}

const chooseCard = () =>{
    showCards()
    let hands = [...document.querySelectorAll('.choise-card')]
    hands.map(hand => hand.addEventListener('click', () => {
        round++
        let yourHand = ''
        if (hand.classList.contains('rock')) {
            yourHand = 'rock'
        }
        if (hand.classList.contains('paper')) {
            yourHand = 'paper'
        }
        if (hand.classList.contains('scissors')) {
            yourHand = 'scissors'
        }

        let randomHands = ['rock', 'paper', 'scissors'];
        let randomHand = randomHands[Math.floor(Math.random() * randomHands.length)];
        document.querySelector('.choise').style.display = "none";
        showScoreboard(yourHand, randomHand, round)
        
    }))
}

document.querySelector('.start-button').addEventListener('click', () => {
    let start = document.querySelector(".start");
    start.style.display = "none";
    chooseCard()
})

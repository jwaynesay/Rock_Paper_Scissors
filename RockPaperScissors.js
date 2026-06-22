// Define button variables
const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const resetBtn = document.getElementById('reset');

//Define scoreboard variables
const playerScoreDisplay = document.getElementById('humanScore');
const computerScoreDisplay = document.getElementById('computerScore');
const resultDisplay = document.getElementById('result');

//Create play game function 
function playGame(maxRounds = 5) {
    let humanScore = 0;
    let computerScore = 0;
    let roundsPlayed = 0;
    const options = ['rock', 'paper', 'scissors'];

//Function computer's choice random
    function getComputerChoice() {
        return options[Math.floor(Math.random() * options.length)];
    }

//Function player's choice
    function playRound(playerChoice) {
        const computerChoice = getComputerChoice();
        roundsPlayed += 1;

    //Define tie
    if (playerChoice === computerChoice) {
        return {
            message: `Round ${roundsPlayed}: It's a tie. You both chose ${playerChoice}.`,
            winner: 'tie'
        };
    }
        //Define player winning
        const playerWins =
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'scissors' && computerChoice === 'paper') ||
            (playerChoice === 'paper' && computerChoice === 'rock');

        //Boolean if player wins
        if (playerWins) {
            humanScore += 1;
            return {
                message: `Round ${roundsPlayed}: You Win! ${playerChoice} beats ${computerChoice}.`,
                winner: 'player'
            };
        }

        //Boolean if computer wins
        computerScore += 1;
        return {
            message: `Round ${roundsPlayed}: You Lose! ${computerChoice} beats ${playerChoice}.`,
            winner: 'computer'
        };
    }

    //Function computer and human score
    function getFinalWinnerMessage() {
        if (humanScore > computerScore) {
            return `Game over — you win ${humanScore} to ${computerScore}!`;
        }
        if (computerScore > humanScore) {
            return `Game over — the computer wins ${computerScore} to ${humanScore}.`;
        }
        return `Game over — it's a draw at ${humanScore} each.`;
    }

    function isGameOver() {
        return roundsPlayed >= maxRounds;
    }

    //Scoreboard return
    return {
        playRound,
        getHumanScore: () => humanScore,
        getComputerScore: () => computerScore,
        isGameOver,
        getFinalWinnerMessage,
        getRoundsPlayed: () => roundsPlayed
    };
}

//Define play game variable
let game = playGame();

function updateScoreboard() {
    playerScoreDisplay.textContent = `Player: ${game.getHumanScore()}`;
    computerScoreDisplay.textContent = `Computer: ${game.getComputerScore()}`;
}

function showResult(message) {
    resultDisplay.textContent = message;
}

function setChoiceButtonsEnabled(enabled) {
    rockBtn.disabled = !enabled;
    paperBtn.disabled = !enabled;
    scissorsBtn.disabled = !enabled;
}

function handleChoice(playerChoice) {
    if (game.isGameOver()) {
        return;
    }

    const roundResult = game.playRound(playerChoice);
    let message = roundResult.message;

    if (game.isGameOver()) {
        message += ` ${game.getFinalWinnerMessage()}`;
        setChoiceButtonsEnabled(false);
    }

    showResult(message);
    updateScoreboard();
}

rockBtn.addEventListener('click', () => handleChoice('rock'));
paperBtn.addEventListener('click', () => handleChoice('paper'));
scissorsBtn.addEventListener('click', () => handleChoice('scissors'));

resetBtn.addEventListener('click', () => {
    game = playGame();
    setChoiceButtonsEnabled(true);
    updateScoreboard();
    resultDisplay.textContent = '';
});


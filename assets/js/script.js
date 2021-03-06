// Wait for the dom to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function () {
            if (this.getAttribute('data-type') === 'submit') {
                checkAnswer();
            } else {
                let gameType = this.getAttribute('data-type');
                runGame(gameType);
            }
        })
    }

    document.getElementById('answer_box').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    })

    runGame('addition');
})

function runGame(gameType) {
    // Generate two random numbers between 1 and 25
    // Math.floor rounds down the whole number
    // Math.randon generates random numbers
    // +1 makes the nunmber 1-25 instead of 0-24

    document.getElementById('answer_box').value = '';
    document.getElementById('answer_box').focus();

    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    switch (gameType) {
        case 'addition':
            displayAdditonQuestion(num1, num2);
            break;

        case 'subtract':
            displaySubtractQuestion(num1, num2);
            break;

        case 'multiply':
            displayMultiplyQuestion(num1, num2);
            break;

        case 'division':
            displayDivisionQuestion(num1, num2);
            break;

        default:
            alert(`Unknown game type ${gameType}`);
            throw `Unknown game type ${gameType}, aborting!`;
            break;
    }

    // if (gameType === 'addition') {
    //     displayAdditonQuestion(num1, num2);
    // } else if (gameType === 'subtract') {
    //     displaySubtractQuestion(num1, num2);
    // } else {
    //     alert(`Unknown game type ${gameType}`);
    //     throw `Unknown game type ${gameType}, aborting!`;
    // }
}

function checkAnswer() {
    //  Check the answer agsint the first element in the returned calculateCorrectAnswer array

    let userAnswer = parseInt(document.getElementById('answer_box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert('Hey! you got it right! :oD');
        incrementScore();
    } else {
        alert(`Sorry... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

function calculateCorrectAnswer() {
    // Get the operands (the nunmbers) and the operator (plus, minus etc)
    // directly from the DOM

    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === '+') {
        return [operand1 + operand2, 'addition'];
    } else if (operator === '-') {
        return [operand1 - operand2, 'subtract'];
    } else if (operator === 'x') {
        return [operand1 * operand2, 'multiply'];
    } else if (operator === '??') {
        return [operand1 / operand2, 'division'];
    } else {
        alert(`Unimplemented operator ${operator}`)
        throw `Unimplemented operator ${operator}, aborting!`;
    }
}

function incrementScore() {

    // Gets the current score from the DOM and increments it by one
    let elemScore = document.getElementById('score');
    let oldScore = parseInt(elemScore.innerText);
    elemScore.innerText = ++oldScore;
}

function incrementWrongAnswer() {

    // Gets the current incorrect score from the DOM and increments it by one
    let elemScore = document.getElementById('incorrect');
    let oldScore = parseInt(elemScore.innerText);
    elemScore.innerText = ++oldScore;
}

function displayAdditonQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '+';

}

function displaySubtractQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = '-';


}

function displayMultiplyQuestion(operand1, operand2) {

    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = 'x';


}

function displayDivisionQuestion(operand1, operand2) {

    let newOperand1 = operand1 > operand2 ? operand1 : operand2;
    let newOperand2 = operand1 > operand2 ? operand2 : operand1;

    if (newOperand1 % newOperand2 === 0) {
        document.getElementById('operand1').textContent = newOperand1;
        document.getElementById('operand2').textContent = newOperand2;
        document.getElementById('operator').textContent = '??';
    } else {
        console.log(`skipped: ${newOperand1} / ${newOperand2} remainder: ${newOperand1 % newOperand2}`)
        runGame('division');
    }


}
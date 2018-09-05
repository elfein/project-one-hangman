// GAME START

// ----- Target Word Generation -----
let targetWordArr = ['sacred flame', 'moonbeam', 'fireball', 'vampiric touch', 'guiding bolt', 'vicious mockery']
let wordIndex
let targetWord
function newTargetWord() {
    wordIndex = Math.floor((Math.random() * 6))
    targetWord = targetWordArr[wordIndex]
}

newTargetWord()

// ----- Target Word Display Handling ------
let spacer = '<span>    </span>'
let wordDisplay = []
const updateWordDisplay = (word) => {
    for (i = 0; i < word.length; i++) {
        if (targetWord[i] !== ' ') {
            wordDisplay.push(' _ ')
        } else {
            wordDisplay.push(spacer)
        }
    }
}

updateWordDisplay(targetWord)


// HTML elements for board start & status setting
$('#status').html('Status: OK')
$('#targetword').html(wordDisplay)
let incorrectCount = 0
let gameEnd = false



// GAME PLAY

// ------ Letter Button Click Handling ------

let currentBtn

// Do not take action if button is used or game is over
let checknewBtnAndGameOn = () => {
    return (!($(currentBtn).attr('class').includes('btn-used')) && !gameEnd)
}

// Actions to take if correct letter chosen
const correctBtn = () => {
    newLetter = currentBtn.attr('id')
    for (i = 0; i < wordDisplay.length; i++) {
        currentBtn.addClass('btn-right')
        // replace correct letter
        if (targetWord[i] === newLetter) {
            wordDisplay[i] = newLetter
            $('#targetword').html(wordDisplay)
        }
    }

    // check for win
    if (incorrectCount < 6 && wordDisplay.indexOf(' _ ') === -1) {
        $('#status').html('Status: You win!')
        gameEnd = true
    }
}

$('.letterbuttons button').on('click', checkForMatch)

function checkForMatch(event) {
    currentBtn = $(this)
    if (checknewBtnAndGameOn()) {
        // if correct letter
        if (targetWord.indexOf(this.id) !== -1) {
            correctBtn()
        }
        // otherwise (incorrect letter)
        else {
            console.log(this.id)
            $(this).addClass('btn-wrong')

            // update play image
            incorrectCount++
            $('#playimg').attr('src', `css/images/bear-${incorrectCount}.jpg`)
            // check for lose
            if (incorrectCount >= 6 && wordDisplay.indexOf(' _ ') >= 0) {
                $('#status').html('Status: Try again :(')
                gameEnd = true
            }
        }

        // turning button "off"
        currentBtn.addClass('btn-used')
        // disabling all buttons if last move of game
        allBtnsOff()
    }
}


// End of Game Events
function allBtnsOff() {
    if (gameEnd === true) {
        $('.letterbuttons').children('button').addClass('btn-end')
    }
    $('#restart').html('Restart')
}

$('#restart').on('click', resetGame)

function resetGame() {
    gameEnd = false
    // Set buttons back to start state
    $('.letterbuttons').children('button').removeClass('btn-used', 'btn-right', 'btn-wrong', 'btn-end')
    $('.letterbuttons').children('button').attr('class', 'btn-start')
    // Set play image back to start state
    incorrectCount = 0
    $('#playimg').attr('src', `css/images/bear-${incorrectCount}.jpg`)
    // make new target word
    newTargetWord()
    // display new target word
    wordDisplay = []
    updateWordDisplay(targetWord)
    $('#targetword').html(wordDisplay)
    // reset status
    $('#status').html('Status: OK')
}
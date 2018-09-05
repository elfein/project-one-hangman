// Wizard Fight Assets
wizInstruct = 'Your wizard adversary is summoning their familiar&mdash;cast your spell before they attack!'
wizArr = ['sacred flame', 'moonbeam', 'fireball', 'vampiric touch', 'guiding bolt', 'vicious mockery']

// Family Reunion Assets
famInstruct = 'Oh no! Your grumpy relatives are on their way to visit&mdash;make their favorite dish before they get here or else things will get rocky...'
famArr = ['eggplant parmesan', 'teriyaki salmon', 'fish and chips', 'garlic chicken', 'captain\'s chicken', 'masaman salmon']


// Page Wide Theme Assets
const wordSetObj = {
    'wiz': wizArr,
    'fam': famArr
}


// PAGE LOAD ------------------------------------------------------------

// ----- Target Word Generation -----
let targetWordArr = wordSetObj.wiz
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


// ----- HTML elements for page start & game status setting -----
$('#targetword').html(wordDisplay)
let incorrectCount = 0
let winCount = 0
let gameEnd = false
$('#status').html('OK')
$('#wins').html(winCount)

// THEME SELECTION ------------------------------------------------------------

let themeBtn
let themeBtnId

// click to change themes
function navClick(event) {
    themeBtn = $(this)
    themeBtnId = $(themeBtn).attr('id')
    changeTitle()
    changeArr()
    resetGame()
}


const changeTitle = () => {
    $('h1').html($(themeBtn).html())
}

const changeArr = () => {
    console.log(themeBtnId)
    if (themeBtnId === 'wiz') {
        console.log(1)
        targetWordArr = wordSetObj.wiz
    } else if (themeBtnId === 'fam') {
        console.log(2)
        targetWordArr = wordSetObj.fam
    } else if (themeBtnId === 'motiv') {
        targetWordArr = wordSetObj.motiv
    }
    console.log(targetWordArr)
}

$('.themes button').on('click', navClick)

// GAME PLAY ------------------------------------------------------------

// Action to take when a letter is clicked
let currentBtn
function letterClick(event) {
    currentBtn = $(this)
    // do not take action if button is used or game is over
    if (checknewBtnAndGameOn()) {
        // if correct letter
        if (targetWord.indexOf(this.id) !== -1) {
            correctBtn()
        }
        // otherwise, if incorrect letter
        else {
            incorrectBtn()
        }

        // turning button "off"
        currentBtn.addClass('btn-used')
        // disabling all buttons if this is last move of game
        allBtnsOff()
    }
}

// to see if button is used or game is over
let checknewBtnAndGameOn = () => {
    return (!($(currentBtn).attr('class').includes('btn-used')) && !gameEnd)
}

// ----- Actions to take if correct letter chosen -----
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
        $('#status').html('You win!')
        winCount++
        $('#wins').html(winCount)
        gameEnd = true
    }
}


// ----- Actions to take if incorrect letter chosen -----
const incorrectBtn = () => {
    console.log(currentBtn.attr('id'))
    $(currentBtn).addClass('btn-wrong')

    // update play image
    incorrectCount++
    $('#playimg').attr('src', `css/images/bear-${incorrectCount}.jpg`)
    // check for lose
    if (incorrectCount >= 6 && wordDisplay.indexOf(' _ ') >= 0) {
        $('#status').html('Try again :(')
        gameEnd = true
    }
}


// call function on click
$('.letterbuttons button').on('click', letterClick)



// GAME END ------------------------------------------------------------
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
    $('#status').html('OK')
}
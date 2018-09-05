// Target Word Generation
let targetWordArr = ['sacred flame', 'moonbeam', 'fireball', 'vampiric touch', 'guiding bolt', 'vicious mockery']
let wordIndex = Math.floor((Math.random() * 6))
let targetWord = targetWordArr[wordIndex]

// Target Word Display Handling
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


// Elements for board start: status, target word
$('#status').html('Status: OK')
$('#targetword').html(wordDisplay)
let incorrectCount = 0
let gameEnd = false


// Letter Button Click Handling
$('.letterbuttons button').on('click', checkForMatch)

function checkForMatch($event) {
    // check for diabled (off) button before continuing AND no win/loss
    if ($(this).attr('class') !== 'btn-used' && !gameEnd) {
        // if correct letter
        if (targetWord.indexOf(this.id) !== -1) {
            for (i = 0; i < wordDisplay.length; i++) {
                $(this).addClass('btn-right')
                // replace correct letter
                if (targetWord[i] === this.id) {
                    wordDisplay[i] = this.id
                    $('#targetword').html(wordDisplay)
                }
            }
            // check for win
            if (incorrectCount < 6 && wordDisplay.indexOf(' _ ') === -1) {
                $('#status').html('Status: You win!')
                gameEnd = true
            }
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
        $(this).addClass('btn-used')
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
    wordIndex = Math.floor((Math.random() * 6))
    targetWord = targetWordArr[wordIndex]
    // display new target word
    wordDisplay = []
    updateWordDisplay(targetWord)
    $('#targetword').html(wordDisplay)
    // reset status
    $('#status').html('Status: OK')
}
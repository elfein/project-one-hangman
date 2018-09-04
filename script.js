// Target Word Handling
let targetWord = 'sacred flame'
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
    if ($(this).attr('class') !== 'btn-off' && !gameEnd) {
        // if correct letter
        if (targetWord.indexOf(this.id) !== -1) {
            for (i = 0; i < wordDisplay.length; i++) {

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
            incorrectCount++
            // update play image
            $('#playimg').attr('src', `css/images/bear-${incorrectCount}.jpg`)
            // check for lose
            if (incorrectCount >= 6 && wordDisplay.indexOf(' _ ') >= 0) {
                $('#status').html('Status: Try again :(')
                gameEnd = true
            }
        }

        // turning button "off"
        $(this).addClass('btn-off')
        allBtnsOff()
    }
}

// End of Game Events
function allBtnsOff() {
    if (gameEnd === true) {
        $('.letterbuttons').children('button').css('background', 'pink')
        }
    $('#restart').html('Restart')
}

$('#restart').on('click', resetGame)

function resetGame() {
    gameEnd = false
    $('.letterbuttons').children('button').removeClass('btn-off')
    $('.letterbuttons').children('button').css('background', 'lightgrey')
    incorrectCount = 0
    $('#playimg').attr('src', `css/images/bear-${incorrectCount}.jpg`)
}
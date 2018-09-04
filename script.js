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


// Letter Button Click Handling
$('.letterbuttons button').on('click', checkForMatch)

function checkForMatch() {

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
        }
    }

    // otherwise (incorrect letter)
    else {
        console.log(this.id)
        incorrectCount++
        // check for lose
        if (incorrectCount >= 6 && wordDisplay.indexOf(' _ ') >= 0) {
            $('#status').html('Status: Try again :(')
        }
    }

    // turning button "off"
    $(this).addClass('btn-off')
} 
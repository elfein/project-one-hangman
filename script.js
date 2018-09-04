// Target Word Handling
let targetWord = 'healing word'
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


// Letter Button Click Handling
$('.letterbuttons button').on('click', checkForMatch)

function checkForMatch() {
    if (targetWord.indexOf(this.id) !== -1) {
        for (i = 0; i < wordDisplay.length; i++) {
            if (targetWord[i] === this.id) {
                wordDisplay[i] = this.id
                $('#targetword').html(wordDisplay)
            }
        }
    }
}
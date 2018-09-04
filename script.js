// Target Word Handling
let targetWord = 'fireball'
const wordDisplay = []
const updateWordDisplay = (word) => {
    for (i = 0; i < word.length; i++) {
        wordDisplay.push(' _ ')
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
     
 }
}
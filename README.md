# Hangman Project

[_Play it here_](https://lucid-fermi-271bb8.netlify.com/)

### Overview

For project #1, I created a game of hangman. However, I did move away from literal hangman imagery and included lighter subjects instead!

Once the user comes to the site, they can start playing hangman by selecting letters to fill in the mystery word. On a correct choice, the letter in the mystery word is revealed, but on an incorrect choice, the "hangman" image updates. The game ends when the player wins or loses. If the player completes the mystery word, they win, and the win counter increases. If the player makes 6 incorrect choices, the player loses. The player can get a hint about the mystery word, reset the game, and change to a different theme.

### Technologies Used
- Languages - HTML5, CSS3, Javascript, jQuery
- Project Planning & User Stories - [Trello] (https://trello.com/b/1K2EesED/emmy-project-1-hangman)
- Visual Studio Code

### Features
- 3 theme options, which affect page content and color theme
- updating "hangman" image
- Win counter
- Status marker
- Restart button
- Randomized mystery words
- Hint overlay with transition
- Visual markers for used, correct, and incorrect letters
- Responsive design
- Letter buttons disabled if used or after game end, active upon restart

### Wireframe

![alt text](wireframes/wireframe-1.png "MVP Wireframe")
![alt text](wireframes/wireframe-2.png "Wireframe 2")
![alt text](wireframes/wireframe-3.png "Wireframe 3")
![alt text](wireframes/wireframe-4.png "Wireframe 4")

### Future Development
- Make status update with detailed description on each move
- Make a start button to make all other interactive elements active, if disabled at page load
- Create difficulty selectors, to allow for more incorrect letters or longer mystery words
- Give each theme more detailed visual style
- Add transitions to visual button changes, mystery word updates, "hangman" image updates, and more

### Other comments
- One of the biggest struggles was handling the letter selection buttons. Their gameplay-related states were determined by class, but I also need to style their theme-related visuals somehow, which was an interesting problem to solve.
- Handling the mystery word was the first problem I tackled and I feel good about this solution, but it would be interesting to include handling for punctuation or capital letters. 
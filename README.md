# TIC-TAC-TOE
 This is a browser-based Tic-Tac-Toe game built using HTML, CSS, and JavaScript. It features both Multiplayer and Computer modes, with the Computer difficulty configurable across three levels: Easy, Medium, and Hard.

## Features  
**Multiplayer Mode**: Two players can play on the same device.  
**Computer Mode**: Play against the computer with three difficulty levels:  
Easy  
Medium  
Hard (implemented using the Minimax algorithm)  
**Score Tracking**: The game tracks wins, losses, and ties for each player.  
**Responsive Design**: The game is fully responsive and works seamlessly across desktop and mobile devices.  

## How to Play
**Select a Mode**: Choose between Multiplayer or Computer Mode.  
**Choose Difficulty**: In Computer Mode, select the difficulty level from the dropdown (Easy, Medium, Hard).  
**Take Turns**: Click on any cell to place your marker. If you're in Computer Mode, the Computer will automatically play its turn after yours.  
**Track the Score**: Wins, losses, and ties are tracked and displayed below the game board.  

## Installation and Setup 
Clone the Repository:

https://github.com/AaqibhafeezKhan/TIC-TAC-TOE.git

Navigate to the Folder:

cd TIC-TAC-TOE

**Open the Game**: Open index.html in any modern browser:

open index.html

## Project Structure

TIC-TAC-TOE/
│
├── index.html         # Main HTML file
├── style.css          # Game styles and responsive design
├── script.js          # Game logic and Computer functionality
├── README.md          # Project information

## Technologies Used
**HTML5**: Structure and layout of the game.  
**CSS3**: Responsive design and styling.  
**JavaScript**: Game logic, score tracking, and Computer play mode implementation.  
**Computer mode Implementation**  
The Computer mode in this Tic-Tac-Toe game uses the Minimax Algorithm in the "Hard" difficulty mode. This algorithm ensures that the Computer makes optimal moves to either win or force a draw.
For the Easy mode, the Computer selects a random move. In Medium mode, it mixes optimal and random moves to provide a more human-like challenge.

## Future Improvements  
Add animations and sound effects for a more engaging experience.  
Implement online multiplayer mode using web sockets.  
Add an "Undo Move" feature.  
Improve Computer performance for large-scale games or alternative grid sizes.  

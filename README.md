# TIC-TAC-TOE 🎮

A responsive browser-based Tic-Tac-Toe game with multiplayer and intelligent computer opponent modes, built using modern web technologies.

![Game Preview](https://aaqibhafeezkhan.github.io/TIC-TAC-TOE/)

## Features ✨

- **Game Modes**
  - 🕹️ Multiplayer: Local two-player mode
  - 🤖 Computer Opponent: Play against AI with three difficulty levels
    - 🟢 Easy: Random moves
    - 🟡 Medium: Mix of random and smart moves
    - 🔴 Hard: Unbeatable Minimax algorithm

- **Game Features**
  - 📊 Score tracking system
  - ♿ Full accessibility support (ARIA labels, keyboard navigation)
  - 📱 Responsive mobile-first design
  - 🎨 Interactive animations and visual feedback
  - 🔄 One-click game restart

## Installation ⚙️

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AaqibhafeezKhan/TIC-TAC-TOE.git
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

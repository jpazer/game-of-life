# game-of-life
Conway's Game of Life Simulator

<p>Try it here: http://jasminepazer.com/projects/life/</p>

*Try drawing a line of cells down the middle, it is really cool. <br/>
*Try drawing a line of 10 cells, this is a stable pattern. It doesn’t die.

Users can drag pre-made patterns onto the screen, or create their own. When they’re satisfied, pressing play will start the simulation, and the patterns come to life. While the simulation is running the user can still switch the states of cells. They can also pause and restart from where they left off.

Each cell has 2 states, dead and alive, and 4 rules that it must follow. <br/>
*Any live cell with fewer than two live neighbors dies, as if caused by under-population. <br/>
*Any live cell with two or three live neighbors lives on to the next generation. <br/>
*Any live cell with more than three live neighbors dies, as if by over-population. <br/>
*Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

Cellular automata fascinates me. The way that each cell lives out a life of its own, and that with minimal input it takes off and patterns transform on their own. Very cool. Thats why I made this javascript game.

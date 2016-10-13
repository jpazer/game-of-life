// main.js
// Dependencies: Cell.js, Pattern.js, utilities.js, loader.js
// Description: singleton object
//author: jasmine pazer
//date: 10/06/16

"use strict"

var app = app || {};

app.main = {
    
///////////PROPERTIES////////////
    
	WIDTH: 600,
	HEIGHT: 600,
	canvas: undefined,
	topCanvas: undefined,
	ctx: undefined,
	topCtx: undefined,
	grid: new Array(60),
	gameState: "pause",
	state: {
		INSTRUCT: "help",
		PAUSE: "pause",
		PLAY: "play",
		prevState: "pause",
	},
	stateText: {
		HELP: ": Instructions",
		PAUSE: ": Click and drag to make patterns",
		PLAY: ": Running simulation",
	},
	animationID: undefined,
	pattern: new Array(),
	mouseDown: false,
	clicknum: 0,

//////////FUNCTIONS///////////////
    
	init: function(){
    /*Initilizes variables, states, and mouse actions*/
        
		this.canvas = document.querySelector('#mainCanvas');
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.ctx = this.canvas.getContext('2d');

		this.topCanvas = document.querySelector('#topCanvas');
		this.topCanvas.width = this.WIDTH + 100;
		this.topCanvas.height = this.HEIGHT;
		this.topCtx = this.topCanvas.getContext('2d');
        
        this.setGameState("help");

		document.querySelector("#playButton").onclick = function(){
            app.main.setGameState("play");
		};
		document.querySelector("#pauseButton").onclick = function(){
			app.main.setGameState("pause");
		};
		document.querySelector("#clearButton").onclick = function(){
			app.main.setGameState("clear");
		};
		document.querySelector("#helpButton").onclick = function(){
			app.main.setGameState("help");
		};

		this.topCanvas.onmousedown = this.doMouseDown;
		this.topCanvas.onmousemove = this.doMouseMove;
		this.topCanvas.onmouseup = this.doMouseUp;

		document.body.style.cursor = "crosshair";

		//initialize the grid and patterns
		for (var x=0; x<60; x++){
			this.grid[x] = new Array(60);
			for (var y=0; y<60; y++){
				this.grid[x][y] = new Cell(x,y,10,10);
			}
		}
		this.pattern[0]= new Pattern();//pattern to be dragged
		this.pattern[1]= new Pattern();//patterns on display
        this.drawPatterns();
        
		//start the loop
		this.update();
	},
    
    setGameState: function(state){
    /*Change game state and update all labels and screens to match*/
        
        this.state.prevState = this.gameState;
        this.topCtx.clearRect(0,0,600,600);
        
        if(state === "play"){
			this.gameState = this.state.PLAY;
			document.querySelector("#stateLabel").innerHTML = this.stateText.PLAY;
        }
        
        if(state === "pause"){
			this.gameState = this.state.PAUSE;
			document.querySelector("#stateLabel").innerHTML =  this.stateText.PAUSE;
        }
        
        if(state === "clear"){
            //clear the canvas
			this.clearCells();
			this.gameState = app.main.state.PAUSE;
			document.querySelector("#stateLabel").innerHTML =  this.stateText.PAUSE;
        }
        
        if(state === "help"){
			this.gameState = this.state.INSTRUCT;
			document.querySelector("#stateLabel").innerHTML =  this.stateText.HELP;
			//display instructions
            this.instructScreen();
        }
    },

	update: function(){
    /**/
        //update view every frame
		this.animationID = requestAnimationFrame(this.update.bind(this));
        
        var totalNeighbors = 0;

        //change the state of cells every 100 frames
        if (this.animationID % 8 == 0){
            //update the color of cells
            if (this.gameState != this.state.INSTRUCT){
                for (var x=0; x<60; x++){
                    for (var y=0; y<60; y++){
                        this.grid[x][y].update(this.ctx);
                    }
                }
            }

            if (this.gameState == this.state.PLAY){
                //find the neighbors for each cell
                for (var x=0; x<60; x++){
                    for (var y=0; y<60; y++){
                        totalNeighbors += this.grid[x][y].findNeighbors(this.grid);
                    }
                }

                //go back to pause screen if all cells are off.
                if(totalNeighbors == 0) {
                    this.setGameState("pause");
                }

                //update the state based on the neighbors found
                //(need to be seperate so cells don't change state 
                //before everyone has found their neighbors)
                for (var x=0; x<60; x++){
                    for (var y=0; y<60; y++){
                        this.grid[x][y].updateState();
                    }
                }
            }//if gameState Play
        }//if animationID
	},


	doMouseUp: function() {
		this.mouseDown = false;

		if (app.main.pattern[0].drag == true){
			app.main.pattern[0].drag = false;
            
            //move pattern from topCtx to ctx
			var cell = app.main.pattern[0].cell;
			for (var i=0;i < app.main.pattern[0].patternLength; i++){
				app.main.grid[cell[i].x][cell[i].y].state = true;
			}
			app.main.pattern[0].set(700,700);
		}
	},

    
	doMouseDown: function(e){
		var mouse = getMouse(e);
		this.mouseDown = true;
		
		if (app.main.gameState == app.main.state.INSTRUCT){
			//if in the start button rect then start the game
			if (mouse.x > 240 && mouse.x < 240+110 && mouse.y > 400 && mouse.y < 400+40){
                console.log(app.main.state.prevState);
                app.main.setGameState(app.main.state.prevState);
			}
		}else{
            //clicknum is used so each cell can only change state once per mousedown
            //otherwise as you hover with the mouse down it changes each frame
			this.clicknum+=1;
            
            //check if a pattern has been selected
            app.main.pattern[0].checkClick(mouse);
            
            //check for a click in each pattern
            for (var x=0; x<60; x++){
                for (var y=0; y<60; y++){
                    app.main.grid[x][y].checkClick(mouse, this.clicknum);
                }
            }
		}
	},

	doMouseMove: function(e){
		var mouse = getMouse(e);
        
        //error checking for clicknum
		if (this.clicknum===undefined || this.clicknum===NaN) {
			this.clicknum = 0;
		}

        //if noton help page, and no patterns are being dragged check for hover over all cells
		if(app.main.gameState != app.main.state.INSTRUCT && app.main.pattern[0].drag == false){
			for (var x=0; x<60; x++){
				for (var y=0; y<60; y++){
					if (this.mouseDown) {
                        //state change when clicking and dragging
						app.main.grid[x][y].checkClick(mouse, this.clicknum);
					}else{
                        //hover cell highlight
						app.main.grid[x][y].checkOver(mouse, app.main.topCtx);
					}
				}
			}
		}
        //what to do when a pattern is being dragged
		if (app.main.pattern[0].drag == true){
            //clear the last drawing of the pattern
			app.main.topCtx.clearRect(0,0,700,600);
            //set the starting cell to draw the pattern from
			app.main.pattern[0].set(parseInt(mouse.x/10), parseInt(mouse.y/10));
            app.main.drawPatterns();
		}
	},
    
    instructScreen: function(){
    /*Draws the instruction screen*/
		this.topCtx.fillStyle = "white";
		this.topCtx.font = "50px 'exoregular'";
		this.topCtx.fillText("Conway's Game of Life", 40,100);

		this.topCtx.font = "20px 'exoregular'";
		this.topCtx.fillText(" - Click and drag to change the state of cells.", 90,160);
		this.topCtx.fillText(" - Press PLAY to start the simulation.", 90,200);
		this.topCtx.fillText(" - Press PAUSE to pause the simulation.", 90,240);
		this.topCtx.fillText(" - Press CLEAR to set all cells to the off state.", 90,280);
		this.topCtx.fillText(" - Press HELP to return to this page.", 90,320);
		this.topCtx.fillText(" - Drag and drop pre-made patterns from the right.", 90,360);

		this.topCtx.fillText("Developed by: Jasmine Pazer", 170,550);

		this.topCtx.fillRect(235,400, 110, 40);

		this.topCtx.fillStyle = "black";
		this.topCtx.font = "30px 'exoregular'";
		this.topCtx.fillText("START", 245, 430);

	},
    
    drawPatterns: function(){
        //draw the pattern being dragged
        this.pattern[0].draw(this.topCtx);
        
        //draw the patterns on right
		for(var i=0;i<6;i++){
			this.pattern[1].patternNum = i;
			this.pattern[1].set(65,i*10+3);
			this.pattern[1].draw(this.topCtx);
		}
    },
    
    clearCells: function(){
    /*set the state of all the cells to off*/
        
		for (var x=0; x<60; x++){
			for (var y=0; y<60; y++){
				this.grid[x][y].state = false;
			}
		}
	},

	pauseGame: function(){
		this.setGameState("pause");

 		//stop animation loop
		cancelAnimationFrame(this.animationID);

	},

	resumeGame: function(){
		//stop animation loop, just in case
		cancelAnimationFrame(this.animationID);

		this.setGameState(this.state.prevState);
		//restart the loop
		this.update();
	},
}; //end app.main

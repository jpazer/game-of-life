// Pattern.js
// Dependencies: Cell.js
// Description: Holds the cells that make up each pattern
//author: jasmine pazer
//last updated: 10/06/16

"use strict"

window.Pattern = (function(){


//constructor
function Pattern(){
	this.cell = new Array();
	this.drag = false;
	this.patternNum = 0;
	this.patternLength = 5;
}

//functions

Pattern.prototype.set = function(x, y){
	if (this.patternNum == 0){
		this.cell[0] = new Cell(x, y, 10,10);
		this.cell[1] = new Cell(x+1, y, 10,10);
		this.cell[2] = new Cell(x, y+1, 10,10);
		this.cell[3] = new Cell(x, y+2, 10,10);
		this.cell[4] = new Cell(x-1, y+1, 10,10);
		this.patternLength = 5;
	}
	if (this.patternNum == 1){
		this.cell[0] = new Cell(x-1, y, 10,10);
		this.cell[1] = new Cell(x, y, 10,10);
		this.cell[2] = new Cell(x+1, y, 10,10);
		this.cell[3] = new Cell(x+1, y+1, 10,10);
		this.cell[4] = new Cell(x+1, y+2, 10,10);
		this.cell[5] = new Cell(x, y+2, 10,10);
		this.cell[6] = new Cell(x-1, y+2, 10,10);
		this.cell[7] = new Cell(x-1, y+1, 10,10);
		this.cell[8] = new Cell(x, y-1, 10,10);
		this.cell[9] = new Cell(x, y+3, 10,10);
		this.patternLength = 10;
	}
	if (this.patternNum == 2){
		this.cell[0] = new Cell(x-1, y+2, 10,10);
		this.cell[1] = new Cell(x, y+2, 10,10);
		this.cell[2] = new Cell(x+1, y+2, 10,10);
		this.cell[3] = new Cell(x-1, y+1, 10,10);
		this.cell[4] = new Cell(x, y, 10,10);
		this.patternLength = 5;

	}
	if (this.patternNum == 3){
		this.cell[0] = new Cell(x-2, y, 10,10);
		this.cell[1] = new Cell(x-2, y+2, 10,10);
		this.cell[2] = new Cell(x-1, y+3, 10,10);
		this.cell[3] = new Cell(x, y+3, 10,10);
		this.cell[4] = new Cell(x+1, y+3, 10,10);
		this.cell[5] = new Cell(x+2, y+3, 10,10);
		this.cell[6] = new Cell(x+2, y+2, 10,10);
		this.cell[7] = new Cell(x+2, y+1, 10,10);
		this.cell[8] = new Cell(x+1, y, 10,10);
		this.patternLength = 9;
	}
	if (this.patternNum == 4){
		this.cell[0] = new Cell(x-1, y+1, 10,10);
		this.cell[1] = new Cell(x, y+1, 10,10);
		this.cell[2] = new Cell(x+1, y+1, 10,10);
		this.patternLength = 3;
	}
	if (this.patternNum == 5){
		this.cell[0] = new Cell(x-1, y-2, 10,10);
		this.cell[1] = new Cell(x, y-2, 10,10);
		this.cell[2] = new Cell(x+1, y-1, 10,10);
		this.cell[3] = new Cell(x+2, y, 10,10);
		this.cell[4] = new Cell(x+2, y+1, 10,10);
		this.cell[5] = new Cell(x+2, y+2, 10,10);
		this.cell[6] = new Cell(x+1, y+3, 10,10);
		this.cell[7] = new Cell(x, y+4, 10,10);
		this.cell[8] = new Cell(x-1, y+4, 10,10);
		this.patternLength = 9;
	}


};

Pattern.prototype.draw = function(ctx){


	for(var i=0;i<this.cell.length;i++){
		this.cell[i].state = true;
		this.cell[i].update(ctx);
	}

	ctx.strokeStyle = "white";
	ctx.strokeRect(600,0,100,100);
	ctx.strokeRect(600,100,100,100);
	ctx.strokeRect(600,200,100,100);
	ctx.strokeRect(600,300,100,100);
	ctx.strokeRect(600,400,100,100);
	ctx.strokeRect(600,500,100,100);


};

Pattern.prototype.checkClick = function(mouse){

	if (mouse.x >= 600 && mouse.x < 700 && mouse.y >= 0 && mouse.y < 600){
		this.drag =  true;
		if (mouse.y <100){
			this.patternNum = 0;
		}
		if (mouse.y >=100 && mouse.y < 200){
			this.patternNum = 1;
		}
		if (mouse.y >=200 && mouse.y < 300){
			this.patternNum = 2;
		}
		if (mouse.y >=300 && mouse.y < 400){
			this.patternNum = 3;
		}
		if (mouse.y >=400 && mouse.y < 500){
			this.patternNum =4;
		}
		if (mouse.y >=500 && mouse.y < 600){
			this.patternNum = 5;
		}
		return true;
	}else{
		this.drag = false;
		return false;
	}
};

return Pattern;

}()); //end app.Pattern

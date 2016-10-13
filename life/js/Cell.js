// Cell.js
// Dependencies: none
// Description: Cell Class
//author: jasmine pazer
//last updated: 10/06/16

"use strict"

window.Cell = (function(){


//////////CONSTRUCTOR///////////////
function Cell(sx, sy, sw, sh){
	this.x = sx;
	this.y = sy;
	this.w = sw;
	this.h = sh;
	this.neighborCount = 0;
	this.state = false;
	this.pclicknum = 0;
}

//////////FUNCTIONS///////////////


Cell.prototype.findNeighbors = function(grid){
/*Look in the adjacent cells for neighbors that are alive*/
	this.neighborCount = 0;
	if (this.x >0){
		//check left
		if (grid[this.x-1][this.y].state == true){
			this.neighborCount++;
		}
		if (this.y>0){
			//check diagnal up left
			if (grid[this.x-1][this.y-1].state == true){
				this.neighborCount++;
			}
		}
		if (this.y< 60-1){
			//check diagonal down left
			if (grid[this.x-1][this.y+1].state == true){
				this.neighborCount++;
			}
		}
	}
	
	if (this.x < 60-1){
		//check right
		if (grid[this.x+1][this.y].state == true){
			this.neighborCount++;
		}
		if (this.y>0){
			//check diagnal up right
			if (grid[this.x+1][this.y-1].state == true){
				this.neighborCount++;
			}
		}
		if (this.y< 60-1){
			//check diagonal down right
			if (grid[this.x+1][this.y+1].state == true){
				this.neighborCount++;
			}
		}
	}
	if (this.y>0){
		//check up
		if (grid[this.x][this.y-1].state == true){
			this.neighborCount++;
		}
	}
	if (this.y< 60-1){
		//check down
		if (grid[this.x][this.y+1].state == true){
			this.neighborCount++;
		}
	}
    return this.neighborCount;
};


Cell.prototype.updateState = function(){
/*determines what state the Cell is in*/
    
	//A dead cell with exactly three live neighbors becomes a live cell (birth).
	if (this.state == false && this.neighborCount == 3){
		this.state = true;
        return;
    //A live cell with less than 2 neighbors is too lonely and dies, and with more than
    //3 neighbors is overcrowded and dies
	}else if (this.state == true && this.neighborCount < 2 || this.neighborCount > 3){
        this.state = false;
	}
};

Cell.prototype.update = function(ctx){
/*Changes the color of the cell to reflect its state*/
    
	if (this.state == false){
		ctx.fillStyle = "black";
	}
	else{
		ctx.fillStyle = "white";
	}

	//draw the Cell!
	ctx.fillRect(this.x*this.w, this.y*this.h, this.w, this.h);
};
    

Cell.prototype.checkClick = function(mouse, clicknum){
/*Checks if the mouse is in this cell and if it hasn't changed state yet this click then it changes state*/
	if (mouse.x >= this.x*this.w && mouse.x < this.x*this.w+this.w && mouse.y >= this.y*this.h && mouse.y < this.y*this.h+this.h){
		if (this.pclicknum != clicknum) {
			this.pclicknum = clicknum;
			if (this.state == true){
				this.state = false;
			}else{
				this.state = true;	
			}	
		}
	}
};


Cell.prototype.checkOver = function(mouse, ctx){
/*If the mouse is in the cell, then show the oposite color of its current state and draw it*/
	if (mouse.x >= this.x*this.w && mouse.x < this.x*this.w+this.w && mouse.y >= this.y*this.h && mouse.y < this.y*this.h+this.h){
		if (this.state == false){
			ctx.fillStyle = 'rgba(255,255,255, 0.2)';
		}
		else{
			ctx.fillStyle = 'rgba(0,0,0,0.5)';
		}
		ctx.fillRect(this.x*this.w, this.y*this.h, this.w, this.h);
	}
	else{
		ctx.clearRect(this.x*this.w, this.y*this.h, this.w, this.h);
	}
};

return Cell;

}()); //end app.Cell
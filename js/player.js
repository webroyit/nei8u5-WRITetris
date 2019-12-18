class Player{
    constructor(){
        this.position = {x: 0, y: 0};
        this.matrix = null;
        this.score = 0;
    }

    playerDrop(){
        this.position.y++;
    
        // when it hit the ground, it add the shape to the grid
        if(collide(grid, this)){
            this.position.y--;
            merge(grid, this)
            playerReset();
            gridSweep();
            updateScore();
        }
        // reset the drop down timer
        dropCounter = 0;
    }

    playerMove(dir){
        this.position.x += dir;
    
        // move the shape back if it hits the wall or other shape when moving to the left or right
        if(collide(grid, this)){
            this.position.x -= dir;
        }
    }

    playerRotate(dir){
        const pos = this.position.x;
        let offset = 1;
        rotate(this.matrix, dir);
    
        while(collide(grid, this)){
            this.position.x += offset;
            // check if there is collision when rotating
            offset = -(offset + (offset > 0 ? 1 : -1));
    
            // move back the shape
            if(offset > this.matrix[0].length){
                rotate(this.matrix, -dir);
                this.position.x = pos;
                return;
            }
        }
    }
}
class Player{
    constructor(tetris){
        this.DROP_SLOW = 1000;
        this.DROP_FAST = 50;

        this.tetris = tetris;
        this.grid = tetris.grid;

        this.dropCounter = 0;
        this.dropInterval = this.DROP_SLOW;

        this.position = {x: 0, y: 0};
        this.matrix = null;
        this.score = 0;

        // to fix that matrix is null
        this.playerReset();
    }

    playerDrop(){
        this.position.y++;
    
        // when it hit the ground, it add the shape to the grid
        if(this.grid.collide(this)){
            this.position.y--;
            this.grid.merge(this);
            this.playerReset();
            this.score += this.grid.gridSweep();
            this.tetris.updateScore(this.score);
        }
        // reset the drop down timer
        this.dropCounter = 0;
    }

    playerMove(dir){
        this.position.x += dir;
    
        // move the shape back if it hits the wall or other shape when moving to the left or right
        if(this.grid.collide(this)){
            this.position.x -= dir;
        }
    }

    playerRotate(dir){
        const pos = this.position.x;
        let offset = 1;
        this.rotateMatrix(this.matrix, dir);
    
        while(this.grid.collide(this)){
            this.position.x += offset;
            // check if there is collision when rotating
            offset = -(offset + (offset > 0 ? 1 : -1));
    
            // move back the shape
            if(offset > this.matrix[0].length){
                this.rotateMatrix(this.matrix, -dir);
                this.position.x = pos;
                return;
            }
        }
    }

    rotateMatrix(matrix, dir){
        // transpose - swap the row and the column
        for(let y = 0; y < matrix.length; ++y){
            for(let x = 0; x < y; ++x){
                [
                    matrix[x][y],
                    matrix[y][x]
                ] = [
                    matrix[y][x],
                    matrix[x][y]
                ]
            }
        }
    
        // reverse each row
        if(dir > 0){
            matrix.forEach(row => row.reverse());
        }
        else{
            matrix.reverse();
        }
    }
    
    // create random shape piece
    playerReset(){
        const pieces = "TLJOSZI";
        this.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);

        // put the new shape piece on the top center of the grid 
        this.position.y = 0;
        this.position.x = (this.grid.matrix[0].length / 2 | 0) - (this.matrix[0].length / 2 | 0);

        // clear the grid 
        if(this.grid.collide(this)){
            this.grid.clear();
            this.score = 0;
            updateScore();
        }
    }

    playerUpdate(deltaTime){
        this.dropCounter += deltaTime;

        // move the shape down by 1 space for every second
        if(this.dropCounter > this.dropInterval){
            this.playerDrop();
        }
    }
}
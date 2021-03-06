class Player{
    constructor(tetris){
        this.DROP_SLOW = 1000;
        this.DROP_FAST = 50;

        this.events = new Events();

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

    // shape layout
    createPiece(type){
        if(type === "T"){
            return [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0]
            ];
        }
        else if(type === "L"){
            return [
                [0, 2, 0],
                [0, 2, 0],
                [0, 2, 2]
            ];
        }
        else if(type === "J"){
            return [
                [0, 3, 0],
                [0, 3, 0],
                [3, 3, 0]
            ];
        }
        else if(type === "O"){
            return [
                [4, 4],
                [4, 4]
            ];
        }
        else if(type === "S"){
            return [
                [0, 5, 5],
                [5, 5, 0],
                [0, 0, 0]
            ];
        }
        else if(type === "Z"){
            return [
                [6, 6, 0],
                [0, 6, 6],
                [0, 0, 0]
            ];
        }
        else if(type === "I"){
            return [
                [0, 7, 0, 0],
                [0, 7, 0, 0],
                [0, 7, 0, 0],
                [0, 7, 0, 0]
            ];
        }
    }

    playerDrop(){
        this.position.y++;
        // reset the drop down timer
        this.dropCounter = 0;
    
        // when it hit the ground, it add the shape to the grid
        if(this.grid.collide(this)){
            this.position.y--;
            this.grid.merge(this);
            this.playerReset();
            this.score += this.grid.gridSweep();
            this.events.emit("score", this.score);
            return;
        }
        this.events.emit("pos", this.position);
    }

    playerMove(dir){
        this.position.x += dir;
    
        // move the shape back if it hits the wall or other shape when moving to the left or right
        if(this.grid.collide(this)){
            this.position.x -= dir;
            // to prevent sending update to the server
            return;
        }

        this.events.emit("pos", this.position);
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

        this.events.emit("matrix", this.matrix);
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
        this.matrix = this.createPiece(pieces[pieces.length * Math.random() | 0]);

        // put the new shape piece on the top center of the grid 
        this.position.y = 0;
        this.position.x = (this.grid.matrix[0].length / 2 | 0) - (this.matrix[0].length / 2 | 0);

        // clear the grid 
        if(this.grid.collide(this)){
            this.grid.clear();
            this.score = 0;
            this.events.emit("score", this.score);
        }

        this.events.emit("pos", this.position);
        this.events.emit("matrix", this.matrix);
    }

    playerUpdate(deltaTime){
        this.dropCounter += deltaTime;

        // move the shape down by 1 space for every second
        if(this.dropCounter > this.dropInterval){
            this.playerDrop();
        }
    }
}
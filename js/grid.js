class Grid{
    constructor(w, h){
        const matrix = [];

        while(h--){
            matrix.push(new Array(w).fill(0));
        }

        this.matrix = matrix;
    }

    // clear the row
    clear(){
        this.matrix.forEach(row => row.fill(0));
    }

    // check if the shape touch the wall or other shape
    collide(player){
        const [mtrix, pos] = [player.matrix, player.position];
    
        for(let y = 0; y < mtrix.length; ++y){
            for(let x = 0; x < mtrix.length; ++x){
                // check if the shape in the grid exist
                if(mtrix[y][x] !== 0 && (this.matrix[y + pos.y] && this.matrix[y + pos.y][x + pos.x]) !== 0){
                    return true;
                }
            }
        }
    
        return false;
    }

    // add the current shape to the grid
    merge(player){
        player.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if(value !== 0){
                    this.matrix[y + player.position.y][x + player.position.x] = value;
                }
            })
        })
    }

    // clear the row if it filled
    gridSweep(){
        let rowCount = 1;
        let score = 0;
        outer: for(let y = this.matrix.length - 1; y > 0; --y){
            for(let x = 0; x < this.matrix[y].length; ++x){
                if(this.matrix[y][x] === 0){
                    // goes to the next row if it not filled
                    continue outer;
                }
            }
            // remove that row and add a new empty row to the top
            const row = this.matrix.splice(y, 1)[0].fill(0);
            this.matrix.unshift(row);
            ++y;

            // give the player the point
            score += rowCount * 10;
            rowCount *= 2;
        }
        return score;
    }
}
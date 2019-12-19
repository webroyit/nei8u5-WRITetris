class Grid{
    constructor(w, h){
        const matrix = [];

        while(h--){
            matrix.push(new Array(w).fill(0));
        }

        this.matrix = matrix;
    }

    clear(){
        this.matrix.forEach(row => row.fill(0));
    }

    // clear the row if it filled
    gridSweep(){
        let rowCount = 1;
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
            player.score += rowCount * 10;
            rowCount *= 2;
        }
    }
}
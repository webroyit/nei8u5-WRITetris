class Tetris{
    constructor(){
        let lastTime = 0;

        const update = (time = 0) => {
            // keep track of time
            const deltaTime = time - lastTime;
            lastTime = time;
            
            player.playerUpdate(deltaTime);
            this.draw();
        
            // update the dom
            requestAnimationFrame(update);
        };
        
        update();
    }

    // add the shape to the board
    draw(){
        // styles the context
        context.fillStyle = "#e6f2ff";   // add color
        context.fillRect(0, 0, canvas.width, canvas.height);    // add sizes to make a rectangle shape

        this.drawMatrix(grid.matrix, {x: 0, y: 0});
        this.drawMatrix(player.matrix, player.position);
    }

    // draw the shape out
    drawMatrix(matrix, offset){
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if(value !== 0){
                    context.fillStyle = colors[value];
                    // x for left
                    // y for top
                    context.fillRect(x + offset.x, y + offset.y, 1, 1);
                }
            });
        });
    }
}
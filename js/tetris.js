class Tetris{
    constructor(element){
        this.element = element;
        this.canvas = element.querySelector("canvas");
        
        this.context = this.canvas.getContext("2d");
        this.context.scale(20, 20);  // make the shape bigger

        this.grid = new Grid(12, 20);
        this.player = new Player(this);     // instance of tetris

        this.player.events.listen("score", score => {
            this.updateScore(score);
        });

        this.colors = [
            null,
            "#6666ff",
            "#e066ff",
            "#ff66a3",
            "#ff5c33",
            "#e9eb14",
            "#00cc00",
            "#5c8a8a"
        ];

        let lastTime = 0;

        this._update = (time = 0) => {
            // keep track of time
            const deltaTime = time - lastTime;
            lastTime = time;
            
            this.player.playerUpdate(deltaTime);
            this.draw();
        
            // update the dom
            requestAnimationFrame(this._update);
        };

        this.updateScore(0);
    }

    // add the shape to the board
    draw(){
        // styles the context
        this.context.fillStyle = "#e6f2ff";   // add color
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);    // add sizes to make a rectangle shape

        this.drawMatrix(this.grid.matrix, {x: 0, y: 0});
        this.drawMatrix(this.player.matrix, this.player.position);
    }

    // draw the shape out
    drawMatrix(matrix, offset){
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if(value !== 0){
                    this.context.fillStyle = this.colors[value];
                    // x for left
                    // y for top
                    this.context.fillRect(x + offset.x, y + offset.y, 1, 1);
                }
            });
        });
    }

    run(){
        this._update();
    }

    // update the player score
    updateScore(score){
        this.element.querySelector('#score').innerText = score;
    }
}
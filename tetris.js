const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

// make the shape bigger
context.scale(20, 20);

// create the layout of the shapes
const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
];

// add the shape to the board
function draw(){
    // styles the context
    context.fillStyle = "#e6f2ff";   // add color
    context.fillRect(0, 0, canvas.width, canvas.height);    // add sizes to make a rectangle shape

    drawMatrix(player.matrix, player.position);
}

// draw the shape out
function drawMatrix(matrix, offset){
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value !== 0){
                context.fillStyle = "red";
                // x for left
                // y for top
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

// update the position of the shape
function update(){
    draw();
    
    // update the dom
    requestAnimationFrame(update);

}

const player = {
    position: {x: 5, y: 3},
    matrix: matrix
}

update();
const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

// make the shape bigger
context.scale(20, 20);

// styles the context
context.fillStyle = "#e6f2ff";   // add color
context.fillRect(0, 0, canvas.width, canvas.height);    // add sizes to make a rectangle shape

// create the layout of the shapes
const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
];

// draw the shape out
function drawMatrix(matrix){
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value !== 0){
                context.fillStyle = "red";
                // x for left
                // y for top
                context.fillRect(x, y, 1, 1);
            }
        });
    });
}

drawMatrix(matrix);
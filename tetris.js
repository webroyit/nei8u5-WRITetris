let lastTime = 0;
let dropCounter = 0;
let dropInterval = 1000;

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

// save the shape
function createMatrix(w, h){
    const matrixList = [];

    while(h--){
        matrixList.push(new Array(w).fill(0));
    }

    return matrixList;
}

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
function update(time = 0){
    // keep track of time
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;

    // move the shape down by 1 space for every second
    if(dropCounter > dropInterval){
        player.position.y++;
        dropCounter = 0;
    }

    draw();

    // update the dom
    requestAnimationFrame(update);
}

function merge(grid, player){
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value !== 0){
                grid[y + player.position.y][x + player.position.x] = value;
            }
        })
    })
}

const grid = createMatrix(12, 20);

console.table(grid);

const player = {
    position: {x: 4, y: 0},
    matrix: matrix
}

// for keyboard
document.addEventListener("keydown", event => {
    // move left
    if(event.keyCode === 37){
        player.position.x--;
    }
    // move right
    else if(event.keyCode === 39){
        player.position.x++;
    }
    // move down
    else if(event.keyCode === 40){
        player.position.y++;
        // reset the drop down timer
        dropCounter = 0;
    }
})

update();
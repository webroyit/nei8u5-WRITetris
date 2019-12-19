let lastTime = 0;

const buttonLeft = document.getElementById("button-left");
const buttonDown = document.getElementById("button-down");
const buttonRight = document.getElementById("button-right");
const buttonRotateLeft = document.getElementById("button-rotateLeft");
const buttonRotateRight = document.getElementById("button-rotateRight");

const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

// make the shape bigger
context.scale(20, 20);

function collide(grid, player){
    const [mtrix, pos] = [player.matrix, player.position];

    for(let y = 0; y < mtrix.length; ++y){
        for(let x = 0; x < mtrix.length; ++x){
            // check if the shape in the grid exist
            if(mtrix[y][x] !== 0 && (grid[y + pos.y] && grid[y + pos.y][x + pos.x]) !== 0){
                return true;
            }
        }
    }

    return false;
}

// save the shape
function createMatrix(w, h){
    const matrixList = [];

    while(h--){
        matrixList.push(new Array(w).fill(0));
    }

    return matrixList;
}

// shape layout
function createPiece(type){
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

// add the shape to the board
function draw(){
    // styles the context
    context.fillStyle = "#e6f2ff";   // add color
    context.fillRect(0, 0, canvas.width, canvas.height);    // add sizes to make a rectangle shape

    drawMatrix(grid, {x: 0, y: 0});
    drawMatrix(player.matrix, player.position);
}

// draw the shape out
function drawMatrix(matrix, offset){
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

// clear the row if it filled
function gridSweep(){
    let rowCount = 1;
    outer: for(let y = grid.length - 1; y > 0; --y){
        for(let x = 0; x < grid[y].length; ++x){
            if(grid[y][x] === 0){
                // goes to the next row if it not filled
                continue outer;
            }
        }
        // remove that row and add a new empty row to the top
        const row = grid.splice(y, 1)[0].fill(0);
        grid.unshift(row);
        ++y;

        // give the player the point
        player.score += rowCount * 10;
        rowCount *= 2;
    }
}

function update(time = 0){
    // keep track of time
    const deltaTime = time - lastTime;
    lastTime = time;
    
    player.playerUpdate(deltaTime);
    draw();

    // update the dom
    requestAnimationFrame(update);
}

// update the player score
function updateScore(){
    document.getElementById('score').innerText = player.score;
}

// add the current shape to the grid
function merge(grid, player){
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value !== 0){
                grid[y + player.position.y][x + player.position.x] = value;
            }
        })
    })
}

// create random shape piece
function playerReset(){
    const pieces = "TLJOSZI";
    player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);

    // put the new shape piece on the top center of the grid 
    player.position.y = 0;
    player.position.x = (grid[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);

    // clear the grid 
    if(collide(grid, player)){
        grid.forEach(row => row.fill(0));
        player.score = 0;
        updateScore();
    }
}

function rotate(matrix, dir){
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

const colors = [
    null,
    "#6666ff",
    "#e066ff",
    "#ff66a3",
    "#ff5c33",
    "#e9eb14",
    "#00cc00",
    "#5c8a8a"
]

const grid = createMatrix(12, 20);

const player = new Player;

// for keyboard
document.addEventListener("keydown", event => {
    // move left
    if(event.keyCode === 37){
        player.playerMove(-1);
    }
    // move right
    else if(event.keyCode === 39){
        player.playerMove(1);
    }
    // move down
    else if(event.keyCode === 40){
        player.playerDrop();
    }
    // q - rotate the shape to the left
    else if(event.keyCode === 81){
        player.playerRotate(-1);
    }
    // w - rotate the shape to the right
    else if(event.keyCode === 87){
        player.playerRotate(1);
    }
})

buttonLeft.addEventListener('click', () => player.playerMove(-1));
buttonDown.addEventListener('click', () => player.playerDrop());
buttonRight.addEventListener('click', () => player.playerMove(1));
buttonRotateLeft.addEventListener('click', () => player.playerRotate(-1));
buttonRotateRight.addEventListener('click', () => player.playerRotate(1));

playerReset();
update();
let lastTime = 0;
let dropCounter = 0;
let dropInterval = 1000;

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
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ];
    }
    else if(type === "J"){
        return [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ];
    }
    else if(type === "O"){
        return [
            [1, 1],
            [1, 1]
        ];
    }
    else if(type === "S"){
        return [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ];
    }
    else if(type === "Z"){
        return [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ];
    }
    else if(type === "I"){
        return [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
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
                context.fillStyle = "green";
                // x for left
                // y for top
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

function update(time = 0){
    // keep track of time
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;

    // move the shape down by 1 space for every second
    if(dropCounter > dropInterval){
        playerDrop();
    }

    draw();

    // update the dom
    requestAnimationFrame(update);
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

    if(collide(grid, player)){
        grid.forEach(row => row.fill(0));
    }
}

function playerDrop(){
    player.position.y++;

    // when it hit the ground, it add the shape to the grid
    if(collide(grid, player)){
        player.position.y--;
        merge(grid, player)
        playerReset();
    }
    // reset the drop down timer
    dropCounter = 0;
}

function playerMove(dir){
    player.position.x += dir;

    // move the shape back if it hits the wall or other shape when moving to the left or right
    if(collide(grid, player)){
        player.position.x -= dir;
    }
}

function playerRotate(dir){
    const pos = player.position.x;
    let offset = 1;
    rotate(player.matrix, dir);

    while(collide(grid, player)){
        player.position.x += offset;
        // check if there is collision when rotating
        offset = -(offset + (offset > 0 ? 1 : -1));

        // move back the shape
        if(offset > player.matrix[0].length){
            rotate(player.matrix, -dir);
            player.position.x = pos;
            return;
        }
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

const grid = createMatrix(12, 20);

const player = {
    position: {x: 4, y: 0},
    matrix: createPiece("Z")
}

// for keyboard
document.addEventListener("keydown", event => {
    // move left
    if(event.keyCode === 37){
        playerMove(-1);
    }
    // move right
    else if(event.keyCode === 39){
        playerMove(1);
    }
    // move down
    else if(event.keyCode === 40){
        playerDrop();
    }
    // q - rotate the shape to the left
    else if(event.keyCode === 81){
        playerRotate(-1);
    }
    // w - rotate the shape to the right
    else if(event.keyCode === 87){
        playerRotate(1);
    }
})

buttonLeft.addEventListener('click', () => playerMove(-1));
buttonDown.addEventListener('click', () => playerDrop());
buttonRight.addEventListener('click', () => playerMove(1));
buttonRotateLeft.addEventListener('click', () => playerRotate(-1));
buttonRotateRight.addEventListener('click', () => playerRotate(1));

update();
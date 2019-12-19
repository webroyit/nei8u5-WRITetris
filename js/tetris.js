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

    drawMatrix(grid.matrix, {x: 0, y: 0});
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
function merge(matrix, player){
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value !== 0){
                matrix[y + player.position.y][x + player.position.x] = value;
            }
        })
    })
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

const grid = new Grid(12, 20);
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

player.playerReset();
update();
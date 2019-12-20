const buttonLeft = document.getElementById("button-left");
const buttonDown = document.getElementById("button-down");
const buttonRight = document.getElementById("button-right");
const buttonRotateLeft = document.getElementById("button-rotateLeft");
const buttonRotateRight = document.getElementById("button-rotateRight");

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

// update the player score
function updateScore(){
    document.getElementById('score').innerText = player.score;
}

const grid = new Grid(12, 20);
const player = new Player;
const canvas = document.getElementById("tetris");
const tetris = new Tetris(canvas);

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
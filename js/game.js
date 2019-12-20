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

const playerElements = document.querySelectorAll(".player");

const tetrisList = [];

// loop through each player
[...playerElements].forEach(element => {
    const tetris = new Tetris(element);
    tetrisList.push(tetris);
});

const keyListener = event => {
    [
        [37, 39, 40, 79, 80], // [ArrowLeft, ArrowRight, ArrowDown, o, p]
        [90, 67, 88, 65, 83]  // [z, c, x, a, s]
    ].forEach((key, index) => {
        const player = tetrisList[index].player;

        // prevent calling the function twice
        if(event.type === "keydown"){
            // move left
            if(event.keyCode === key[0]){
                player.playerMove(-1);
            }
            // move right
            else if(event.keyCode === key[1]){
                player.playerMove(1);
            }
            // rotate the shape to the left
            else if(event.keyCode === key[3]){
                player.playerRotate(-1);
            }
            // rotate the shape to the right
            else if(event.keyCode === key[4]){
                player.playerRotate(1);
            }
        }
         // move down
        if(event.keyCode === key[2]){
            // fix a bug when both player press the down button at the same time
            if(event.type === "keydown"){
                if(player.dropInterval !== player.DROP_FAST){
                    player.playerDrop();
                    player.dropInterval = player.DROP_FAST;
                }
            }
            else{
                player.dropInterval = player.DROP_SLOW;
            }
        }
    })
}

// for keyboard
document.addEventListener("keydown", keyListener);
document.addEventListener("keyup", keyListener);

// buttonLeft.addEventListener('click', () => tetris.player.playerMove(-1));
// buttonDown.addEventListener('click', () => tetris.player.playerDrop());
// buttonRight.addEventListener('click', () => tetris.player.playerMove(1));
// buttonRotateLeft.addEventListener('click', () => tetris.player.playerRotate(-1));
// buttonRotateRight.addEventListener('click', () => tetris.player.playerRotate(1));
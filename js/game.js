const buttonLeft = document.getElementById("button-left");
const buttonDown = document.getElementById("button-down");
const buttonRight = document.getElementById("button-right");
const buttonRotateLeft = document.getElementById("button-rotateLeft");
const buttonRotateRight = document.getElementById("button-rotateRight");

const playerElements = document.querySelectorAll(".player");

const tetrisManager = new TetrisManager(document);

const keyListener = event => {
    [
        [37, 39, 40, 79, 80], // [ArrowLeft, ArrowRight, ArrowDown, o, p]
        [90, 67, 88, 65, 83]  // [z, c, x, a, s]
    ].forEach((key, index) => {
        const player = tetrisManager.instances[index].player;

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

buttonLeft.addEventListener('click', () => tetrisList[0].player.playerMove(-1));
buttonDown.addEventListener('click', () => tetrisList[0].player.playerDrop());
buttonRight.addEventListener('click', () => tetrisList[0].player.playerMove(1));
buttonRotateLeft.addEventListener('click', () => tetrisList[0].player.playerRotate(-1));
buttonRotateRight.addEventListener('click', () => tetrisList[0].player.playerRotate(1));
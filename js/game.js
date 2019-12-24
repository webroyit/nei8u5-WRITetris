const buttonLeft = document.getElementById("button-left");
const buttonDown = document.getElementById("button-down");
const buttonRight = document.getElementById("button-right");
const buttonRotateLeft = document.getElementById("button-rotateLeft");
const buttonRotateRight = document.getElementById("button-rotateRight");

const tetrisManager = new TetrisManager(document);
const localTetris = tetrisManager.createPlayer();
localTetris.element.classList.add("local");
localTetris.run();

const connectionManager = new ConnectionManager(tetrisManager);

// connect to the server
connectionManager.connect("ws://localhost:7000");

const keyListener = event => {
    [
        [37, 39, 40, 79, 80], // [ArrowLeft, ArrowRight, ArrowDown, o, p]
        [90, 67, 88, 65, 83]  // [z, c, x, a, s]
    ].forEach((key, index) => {
        const player = localTetris.player;

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

buttonLeft.addEventListener('click', () => localTetris.player.playerMove(-1));
buttonDown.addEventListener('click', () => localTetris.player.playerDrop());
buttonRight.addEventListener('click', () => localTetris.player.playerMove(1));
buttonRotateLeft.addEventListener('click', () => localTetris.player.playerRotate(-1));
buttonRotateRight.addEventListener('click', () => localTetris.player.playerRotate(1));
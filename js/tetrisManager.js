class TetrisManager{
    constructor(document){
        this.document = document;
        this.template = document.getElementById("player-template");
        this.instances = [];
        
        const playerElements = document.querySelectorAll(".player");
        // loop through each player
        [...playerElements].forEach(element => {
            console.log(element)
            const tetris = new Tetris(element);
            this.instances.push(tetris);
        });
    }

    createPlayer(){
        // get access to the hidden content
        const element = this.document
            .importNode(this.template.content, true)
            .children[0];

        // create the board
        const tetris = new Tetris(element);
        this.instances.push(tetris);

        // show it on the DOM
        this.document.body.appendChild(tetris.element);

        return tetris;
    }
}
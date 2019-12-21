class TetrisManager{
    constructor(document){
        this.document = document;
        this.template = document.getElementById("player-template");
        
        this.instances = new Set;
    }

    createPlayer(){
        // get access to the hidden content
        const element = this.document
            .importNode(this.template.content, true)
            .children[0];

        // create the board
        const tetris = new Tetris(element);
        this.instances.add(tetris);

        // show it on the DOM
        this.document.body.appendChild(tetris.element);

        return tetris;
    }

    removePlayer(tetris){
        this.instances.delete(tetris);

        // remove it from the DOM
        this.document.body.removeChild(tetris.element);
    }
}
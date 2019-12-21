class TetrisManager{
    constructor(document){
        this.document = document;
        this.instances = [];
        
        const playerElements = document.querySelectorAll(".player");
        // loop through each player
        [...playerElements].forEach(element => {
            console.log(element)
            const tetris = new Tetris(element);
            this.instances.push(tetris);
        });
            }
}
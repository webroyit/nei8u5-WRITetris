class TetrisManager{
    constructor(document){
        this.document = document;
        this.instances = [];
        
        // loop through each player
        [...playerElements].forEach(element => {
            const tetris = new Tetris(element);
            this.instances.push(tetris);
        });
            }
}
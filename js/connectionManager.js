class ConnectionManager{
    constructor(tetrisManager){
        this.conn = null;
        this.peers = new Map;

        this.tetrisManager = tetrisManager;
    }

    connect(address){
        this.conn = new WebSocket(address);

        this.conn.addEventListener("open", () => {
            console.log("Connection Success");
            this.initSession();
        });

        this.conn.addEventListener("message", event => {
            console.log("Recevied Message", event.data);
            this.receive(event.data);
        });
    }

    initSession(){
        // get the ID from the url
        const sessionId = window.location.hash.split("#")[1];

        if(sessionId){
            // join another player room
            this.send({
                type: "join-session",
                id: sessionId
            });
        }
        else{
            // create a new room
            this.send({ type: "create-session" });
        }
    }

    // add another board if a new player join
    updateManager(peers){
        const me = peers.you;
        const clients = peers.clients.filter(id => me !== id);
        clients.forEach(id => {
            if(!this.peers.has(id)){
                const tetris = this.tetrisManager.createPlayer();
                this.peers.set(id, tetris);
            }
        });

        [...this.peers.entries()].forEach(([id, tetris]) => {
            // delete the board if the player left
            if(clients.indexOf(id) === -1){
                this.tetrisManager.removePlayer(tetris);
                this.peers.delete(id);
            }
        })
    }

    receive(msg){
        const data = JSON.parse(msg);
        if(data.type === "session-created"){
            // add the ID to the url
            window.location.hash = data.id;
        }
        else if(data.type === "session-broadcast"){
            this.updateManager(data.peers);
        }
    }

    send(data){
        // convert the data into JSON string
        const msg = JSON.stringify(data);
        console.log(`Sending Message ${msg}`);
        this.conn.send(msg);
    }
}
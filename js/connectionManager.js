class ConnectionManager{
    constructor(){
        this.conn = null;
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

    receive(msg){
        const data = JSON.parse(msg);
        if(data.type === "session-created"){
            // add the ID to the url
            window.location.hash = data.id;
        }
    }

    send(data){
        // convert the data into JSON string
        const msg = JSON.stringify(data);
        console.log(`Sending Message ${msg}`);
        this.conn.send(msg);
    }
}
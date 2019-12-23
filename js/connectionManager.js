class ConnectionManager{
    constructor(){
        this.conn = null;
    }

    connect(address){
        this.conn = new WebSocket(address);

        this.conn.addEventListener("open", () => {
            console.log("Connection Success");

            this.send({ type: "create-session" });
        });

        this.conn.addEventListener("message", event => {
            console.log("Recevied Message", event.data);
        });
    }

    send(data){
        // convert the data into JSON
        const msg = JSON.stringify(data);
        console.log(`Sending Message ${msg}`);
        this.conn.send(msg);
    }
}
class ConnectionManager{
    constructor(){
        this.conn = null;
    }

    connect(address){
        this.conn = new WebSocket(address);

        this.conn.addEventListener("open", () => {
            console.log("Connection Success");

            this.conn.send("create-session");
        })
    }
}
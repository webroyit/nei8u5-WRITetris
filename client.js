class Client{
    constructor(conn, id){
        this.conn = conn;
        this.session = null;
        this.id = id;

        this.state = null;
    }

    broadcast(data){
        if(!this.session){
            throw new Error("No session to broadcast");
        }

        data.clientId = this.id;

        this.session.clients.forEach(client => {
            if(this === client){
                return;
            }
            client.send(data);
        })
    }

    send(data){
        // convert the data into JSON string
        const msg = JSON.stringify(data);
        console.log(`Send Message ${msg}`);
        this.conn.send(msg, function ack(err){
            if(err){
                console.log(error("Message Failed", msg, err));
            }
        })
    }
}

module.exports = Client;
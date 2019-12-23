class Client{
    constructor(conn){
        this.conn = conn;
        this.session = null;
    }

    send(msg){
        console.log(`Send Message ${msg}`);
        this.conn.send(msg, function ack(err){
            if(err){
                console.log(error("Message Failed", msg, err));
            }
        })
    }
}

module.exports = Client;
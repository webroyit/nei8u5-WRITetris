class Client{
    constructor(conn){
        this.conn = conn;
        this.session = null;
    }

    send(data){
        // convert the data into JSON
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
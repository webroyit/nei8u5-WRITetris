const WebSocketServer = require("ws").Server;

const server = new WebSocketServer({ port: 7000 });

const sessions = new Map;

class Session{
    constructor(id){
        this.id = id;
    }
}

// start the websocket
server.on("connection", conn => {
    console.log("Websocket Online");

    conn.on("message", msg => {
        console.log("Message received", msg);

        if(msg === "create-session"){
            const session = new Session("foobar");
            sessions.set(session.id, session);
            console.log(sessions);
        }
    })

    conn.on("close", () => {
        console.log("Connection Closed");
    })
});
const WebSocketServer = require("ws").Server;
const Session = require("./session");
const Client = require("./client");

const server = new WebSocketServer({ port: 7000 });

const sessions = new Map;

// create random ID
function createId(len = 6, chars = "abcdefghijklmnopqrstuvwxyz0123456789"){
    let id = "";
    while(len--){
        id += chars[Math.random() * chars.length | 0];
    }

    return id;
}

// start the websocket
server.on("connection", conn => {
    console.log("Websocket Online");
    const client = new Client(conn);

    conn.on("message", msg => {
        console.log("Message received", msg);

        if(msg === "create-session"){
            const id = createId();
            const session = new Session(id);
            session.join(client);
            sessions.set(session.id, session);
            console.log(sessions);
        }
    })

    conn.on("close", () => {
        console.log("Connection Closed");
        const session = client.session;

        if(session){
            session.leave(client);
            if(session.clients.size === 0){
                sessions.delete(session.id);
            }
        }
    })
});
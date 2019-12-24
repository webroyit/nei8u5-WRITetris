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

function createClient(conn, id = createId()){
    return new Client(conn, id);
}

// (id = createId()) means that if there is no id, it will excute this function
function createSession(id = createId()){
    if(sessions.has(id)){
        throw new Error(`Session ${id} already exists`);
    }

    const session = new Session(id);
    console.log("Creating Session", session);

    sessions.set(id, session);

    return session;
}

function getSession(id){
    return sessions.get(id);
}

// send a message to all group
function broadcastSession(session){
    const clients = [...session.clients];

    clients.forEach(client => {
        client.send({
            type: "session-broadcast",
            peers: {
                you: client.id,
                clients: clients.map(client => client.id)
            }
        });
    })
}

// start the websocket
server.on("connection", conn => {
    console.log("Websocket Online");
    const client = createClient(conn);

    conn.on("message", msg => {
        console.log("Message received", msg);
        // convert the data into object
        const data = JSON.parse(msg);

        if(data.type === "create-session"){
            const session = createSession();
            session.join(client);
            client.send({
                type: "session-created",
                id: session.id
            });
        }
        else if(data.type === "join-session"){
            const session = getSession(data.id) || createSession(data.id);
            session.join(client);

            broadcastSession(session);
        }

        console.log("Sessions", sessions);
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

        broadcastSession(session);
    })
});
const WebSocketServer = require("ws").Server;

const server = new WebSocketServer({ port: 7000 });

// start the websocket
server.on("connection", conn => {
    console.log("Websocket Online");

    conn.on("message", msg => {
        console.log("Message received", msg);
    })

    conn.on("close", () => {
        console.log("Connection Closed");
    })
});
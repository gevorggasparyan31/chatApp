const net = require('net');

const clients = [];

const server = net.createServer((socket) => {
    clients.push(socket);

    let clientName = '';

    socket.on('data', (data) => {
        const message = data.toString();

        if (!clientName) {
            clientName = message;
            broadcast(`${clientName} has joined the chat.`, socket);
        } else {
            broadcast(`${clientName}: ${message}`, socket);
        }
    });

    socket.on('end', () => {
        if (clientName) {
            broadcast(`${clientName} has left the chat.`, socket);
        }
    });
});

function broadcast(message, sender) {
    clients.forEach((client) => {
        if (client !== sender) {
            client.write(message);
        }
    });
}

server.listen(3000, () => {
    console.log(`Chat server is running on port 3000`);
});
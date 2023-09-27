const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const client = new net.Socket();

let clientName = '';

client.connect(3000, 'localhost', () => {
    rl.question('Enter your name: ', (name) => {
        clientName = name;
        console.log(`Connected to the chat server as ${clientName}.`);
        client.write(clientName);

        rl.on('line', (input) => {
            client.write(input);
        });
    });
});

client.on('data', (data) => {
    console.log(data.toString());
});

client.on('close', () => {
    console.log('Disconnected from the chat server.');
    process.exit(0);
});

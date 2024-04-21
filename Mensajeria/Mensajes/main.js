const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', function connection(ws) {
    console.log('Cliente conectado');

    ws.on('message', function incoming(message) {
        console.log('Mensaje recibido: %s', message);
        
        const parsedMessage = JSON.parse(message);
        
        // Reenviar el mensaje a todos los demás clientes
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                const outgoingMessage = {
                    username: parsedMessage.username,
                    content: parsedMessage.content
                };
                client.send(JSON.stringify(outgoingMessage));
            }
        });
    });

    ws.on('close', function close() {
        console.log('Cliente desconectado');
    });
});

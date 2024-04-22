const WebSocket = require('ws');
const sqlite3 = require('sqlite3').verbose(); // Importar el módulo SQLite3
const db = new sqlite3.Database(':memory:'); // Conectar a una base de datos en memoria

// Crear la tabla para almacenar los mensajes
db.run('CREATE TABLE IF NOT EXISTS messages (username TEXT, content TEXT)');

const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', function connection(ws) {
    console.log('Cliente conectado');

    ws.on('message', function incoming(message) {
        console.log('Mensaje recibido: %s', message);
        
        const parsedMessage = JSON.parse(message);
        const username = parsedMessage.username;
        const content = parsedMessage.content;
        
        // Reenviar el mensaje a todos los demás clientes
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                const outgoingMessage = {
                    username: username,
                    content: content
                };
                client.send(JSON.stringify(outgoingMessage));
            }
        });

        // Guardar el mensaje en la base de datos
        db.run('INSERT INTO messages (username, content) VALUES (?, ?)', [username, content]);
    });

    ws.on('close', function close() {
        console.log('Cliente desconectado');
    });

    // Cuando un cliente se reconecta, enviarle los mensajes almacenados
    db.all('SELECT * FROM messages', function(err, rows) {
        if (err) {
            console.error('Error al obtener mensajes almacenados:', err);
            return;
        }

        rows.forEach(function(row) {
            ws.send(JSON.stringify(row));
        });
    });
});

const amqp = require('amqplib');

// URL de conexión a RabbitMQ
const rabbitmqUrl = 'amqp://localhost';

// Nombre de la cola
const queueName = 'mi_cola';

// Función para enviar mensajes (productor)
async function enviarMensaje() {
    try {
        // Conectar al servidor RabbitMQ
        const connection = await amqp.connect(rabbitmqUrl);
        // Crear un canal
        const channel = await connection.createChannel();
        // Declarar una cola
        await channel.assertQueue(queueName);
        // Enviar un mensaje a la cola
        await channel.sendToQueue(queueName, Buffer.from('Hola RabbitMQ!'));
        console.log('Mensaje enviado a la cola');
        // Cerrar la conexión
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
    }
}

// Función para recibir mensajes (consumidor)
async function recibirMensaje() {
    try {
        // Conectar al servidor RabbitMQ
        const connection = await amqp.connect(rabbitmqUrl);
        // Crear un canal
        const channel = await connection.createChannel();
        // Declarar una cola
        await channel.assertQueue(queueName);
        console.log('Esperando mensajes...');
        // Consumir mensajes de la cola
        channel.consume(queueName, (mensaje) => {
            console.log('Mensaje recibido:', mensaje.content.toString());
            // Confirmar la recepción del mensaje
            channel.ack(mensaje);
        }, { noAck: false }); // Indicar que se deben enviar confirmaciones (acknowledgements)
    } catch (error) {
        console.error('Error al recibir mensaje:', error);
    }
}
// Llamar a las funciones
enviarMensaje();
recibirMensaje();

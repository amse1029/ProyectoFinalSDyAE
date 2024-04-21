   const ws = new WebSocket('ws://localhost:8081');
        const chatDiv = document.getElementById('chat');

        ws.addEventListener('message', function (event) {
            const message = JSON.parse(event.data);
            chatDiv.innerHTML += `<p><strong>${message.username}:</strong> ${message.content}</p>`;
        });

        function sendMessage() {
            const messageInput = document.getElementById('messageInput');
            const messageContent = messageInput.value;
            const message = {
                username: 'Maestro',
                content: messageContent
            };
            chatDiv.innerHTML += `<p><strong>${message.username}:</strong> ${message.content}</p>`;
            ws.send(JSON.stringify(message));
            messageInput.value = '';
        }
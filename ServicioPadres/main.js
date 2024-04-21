const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON en las solicitudes
app.use(express.json());
// Ruta para hacer la solicitud a la otra API
app.get('/api/otra-api', async (req, res) => {
  try {
      
    var url = "http://localhost/webservice/rest/server.php";
    var cursos = [];
    //var tbody = document.getElementById('tablaCursos');
    // Construir los parámetros de la URL
    var parametros = [];
    parametros.push("wstoken=b5905aee33fbbe8a2cb3f613bcec7bbf");
    parametros.push("wsfunction=gradereport_user_get_grades_table");
    // parametros.push("courseid=2");
    parametros.push("moodlewsrestformat=json");
    parametros.push("userid=" + encodeURIComponent(4));
    parametros.push("courseid=" + encodeURIComponent(2));
    //parametros.push("groupid=0");
    // Combinar todos los parámetros en la URL
    url += "?" + parametros.join("&");
    // Hacer una solicitud GET a la otra API
    const response = await axios.get(url);
    
    // Devolver los datos recibidos como respuesta
    res.json(response.data);
  } catch (error) {
    // Manejar cualquier error que ocurra durante la solicitud
    console.error('Error al hacer la solicitud a la otra API:', error);
    res.status(500).json({ error: 'Error al hacer la solicitud a la otra API' });
  }
});
// Manejador de ruta para todas las demás solicitudes
app.all('*', (req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor API Gateway escuchando en el puerto ${PORT}`);
});

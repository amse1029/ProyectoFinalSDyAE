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
        parametros.push("wstoken=a7ab7c13eca9c4d87556998dff78a606");
        parametros.push("wsfunction=gradereport_user_get_grades_table");
        // parametros.push("courseid=2");
        parametros.push("moodlewsrestformat=json");
        parametros.push("userid=" + req.query.userId);
        parametros.push("courseid=" + req.query.courseId);
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
        res.status(500).json({error: 'Error al hacer la solicitud a la otra API'});
    }
});

app.get('/api/consultar-cursos', async (req, res) => {
    try {
        var url = "http://localhost/webservice/rest/server.php";

        // Construir los parámetros de la URL
        var parametros = [];
        parametros.push("wstoken=a7ab7c13eca9c4d87556998dff78a606");
        parametros.push("wsfunction=core_enrol_get_users_courses");
        parametros.push("moodlewsrestformat=json");
        parametros.push("userid=" + req.query.userId);

        // Combinar todos los parámetros en la URL
        url += "?" + parametros.join("&");

        // Hacer la solicitud utilizando Axios
        axios.get(url)
                .then(function (response) {
                    // Devolver la respuesta JSON
                    res.json(response.data);
                })
                .catch(function (error) {
                    // Manejar errores
                    console.error("Error al enviar la solicitud:", error);
                    res.status(500).json({error: 'Error al enviar la solicitud'});
                });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({error: 'Error al procesar la solicitud'});
    }
});

app.get('/api/consultar-profesor-curso', async (req, res) => {
    try {
        const url = "http://localhost/webservice/rest/server.php";
        const params = {
            wstoken: 'a7ab7c13eca9c4d87556998dff78a606',
            wsfunction: 'core_enrol_get_enrolled_users',
            courseid: req.query.courseId,
            moodlewsrestformat: 'json'
        };
        // Realizar la solicitud GET utilizando Axios
        const response = await axios.get(url, {params})
                .then(function (response) {
                    // Devolver la respuesta JSON con los maestros del curso
                    const cursoInfo = response.data;

                    // Filtrar los maestros y alumnos
                    const maestros = cursoInfo.filter(user => user.roles.some(role => role.shortname === 'editingteacher'));
                    res.json(maestros);
                });
    } catch (error) {
        // Manejar errores
        console.error("Error al enviar la solicitud:", error);
        // Aquí puedes agregar cualquier lógica adicional para manejar el error
    }
});

app.get('/api/consultar-tareas-alumno-curso', async (req, res) => {
    try {
        const url = "http://localhost/webservice/rest/server.php";
        const params = {
            wstoken: 'a7ab7c13eca9c4d87556998dff78a606',
            wsfunction: 'mod_assign_get_assignments',
            courseids: [req.query.courseId],
            moodlewsrestformat: 'json'
        };
        // Realizar la solicitud GET utilizando Axios
        const response = await axios.get(url, {params})
                .then(function (response) {
                    const cursoInfo = response.data;

                    res.json(cursoInfo);
                });
    } catch (error) {
        // Manejar errores
        console.error("Error al enviar la solicitud:", error);
        // Aquí puedes agregar cualquier lógica adicional para manejar el error
    }
});

app.get('/api/consultar-calificaciones-curso', async (req, res) => {
     try {
        const axios = require('axios');
        const url = "http://localhost/webservice/rest/server.php";
        const userId = req.query.userId;
        const courseId = req.query.courseId;
        const token = 'b5905aee33fbbe8a2cb3f613bcec7bbf';

        const params = {
            wstoken: token,
            wsfunction: 'gradereport_user_get_grades_table',
            moodlewsrestformat: 'json',
            userid: userId,
            courseid: courseId
        };

        // Realizar la solicitud GET utilizando Axios
        const response = await axios.get(url, { params });

        // Manejar la respuesta
        console.log("Solicitud exitosa!");
        console.log(response.data);
        const data = response.data;
     
        res.json(data);

    } catch (error) {
        // Manejar errores
        console.error("Error al enviar la solicitud:", error);
        // Aquí puedes agregar cualquier lógica adicional para manejar el error
    }
});



//esta es la parte de control escolar 

// Función para obtener el maestro que asignó las calificaciones
async function obtenerMaestroCalificaciones(courseId) {
    try {
        const url = "http://localhost/webservice/rest/server.php";
        const params = {
            wstoken: 'a7ab7c13eca9c4d87556998dff78a606',
            wsfunction: 'core_course_get_courses',
            options: [
                {
                    name: 'ids',
                    value: [courseId]
                }
            ],
            moodlewsrestformat: 'json'
        };
        const response = await axios.get(url, { params });
        const courseInfo = response.data[0];
        const maestroId = courseInfo['teacher'];
        return maestroId;
    } catch (error) {
        console.error("Error al obtener el maestro que asignó las calificaciones:", error);
        throw new Error("Error al obtener el maestro que asignó las calificaciones");
    }
}


// Función para verificar si un maestro ha asignado calificaciones en un curso
async function haAsignadoCalificaciones(maestroId, courseId) {
    try {
        const response = await axios.get(`http://localhost/api/consultar-calificaciones-curso?userId=${maestroId}&courseId=${courseId}`);
        const calificaciones = response.data;
        return calificaciones.length > 0;
    } catch (error) {
        console.error("Error al verificar si el maestro ha asignado calificaciones:", error);
        throw new Error("Error al verificar si el maestro ha asignado calificaciones");
    }
}



async function obtenerMaestrosSinCalificacion(courseId) {
    try {
        // Realizar la solicitud para obtener la lista de maestros del curso
        const response = await axios.get(`http://localhost/api/consultar-profesor-curso?courseId=${courseId}`);
        const maestros = response.data;
        const maestrosSinCalificacion = maestros.filter(async maestro => {
            const haAsignado = await haAsignadoCalificaciones(maestro.id, courseId);
            return !haAsignado;
        });
        return maestrosSinCalificacion;
    } catch (error) {
        console.error("Error al obtener la lista de maestros sin calificación:", error);
        throw new Error("Error al obtener la lista de maestros sin calificación");
    }
}




// Función para obtener el promedio del alumno
async function obtenerPromedioAlumno(userId, courseId) {
    try {
        const url = "http://localhost/webservice/rest/server.php";
        const params = {
            wstoken: 'a7ab7c13eca9c4d87556998dff78a606',
            wsfunction: 'gradereport_user_get_grades_table',
            moodlewsrestformat: 'json',
            userid: userId,
            courseid: courseId
        };
        const response = await axios.get(url, { params });
        const grades = response.data.tables[0].tabledata;
        let totalGrade = 0;
        let totalWeight = 0;
        grades.forEach(grade => {
            totalGrade += parseFloat(grade.grade) * parseFloat(grade.weight);
            totalWeight += parseFloat(grade.weight);
        });
        const average = totalGrade / totalWeight;
        return average;
    } catch (error) {
        console.error("Error al obtener el promedio del alumno:", error);
        throw new Error("Error al obtener el promedio del alumno");
    }
}

// Ruta para obtener el maestro que asignó las calificaciones
app.get('/api/obtener-maestro-calificaciones', async (req, res) => {
    try {
        const courseId = req.query.courseId;
        const maestroCalificaciones = await obtenerMaestroCalificaciones(courseId);
        res.json({ maestroCalificaciones: maestroCalificaciones });
    } catch (error) {
        console.error("Error al obtener el maestro que asignó las calificaciones:", error);
        res.status(500).json({ error: 'Error al obtener el maestro que asignó las calificaciones' });
    }
});

// Ruta para obtener la lista de maestros que no han asignado calificación
app.get('/api/obtener-maestros-sin-calificacion', async (req, res) => {
    try {
        const courseId = req.query.courseId;
        const maestrosSinCalificacion = await obtenerMaestrosSinCalificacion(courseId);
        res.json({ maestrosSinCalificacion: maestrosSinCalificacion });
    } catch (error) {
        console.error("Error al obtener la lista de maestros sin calificación:", error);
        res.status(500).json({ error: 'Error al obtener la lista de maestros sin calificación' });
    }
});

// Ruta para obtener el promedio del alumno
app.get('/api/obtener-promedio-alumno', async (req, res) => {
    try {
        const userId = req.query.userId;
        const courseId = req.query.courseId;
        const promedioAlumno = await obtenerPromedioAlumno(userId, courseId);
        res.json({ promedioAlumno: promedioAlumno });
    } catch (error) {
        console.error("Error al obtener el promedio del alumno:", error);
        res.status(500).json({ error: 'Error al obtener el promedio del alumno' });
    }
});







// parte control escolar x kim
app.get('/api/consultar-todos-cursos', async (req, res) => {
    try {
        const url = "http://localhost/webservice/rest/server.php";
        const params = {
            wstoken: 'b5905aee33fbbe8a2cb3f613bcec7bbf',
            wsfunction: 'core_course_get_courses',
            moodlewsrestformat: 'json'
        };
        // Realizar la solicitud GET utilizando Axios
        const response = await axios.get(url, {params});

        // Extraer solo los campos id y fullname de cada curso
        const cursos = response.data.map(curso => ({
                id: curso.id,
                fullname: curso.fullname
            }));

        // Devolver la respuesta JSON solo con los id y fullname de los cursos
        res.json(cursos);
    } catch (error) {
        // Manejar errores
        console.error("Error al enviar la solicitud:", error);
        // Aquí puedes agregar cualquier lógica adicional para manejar el error
    }
});


app.get('/api/consultar-alumnos-por-curso', async (req, res) => {
    try {
        const axios = require('axios');
        const url = "http://localhost/webservice/rest/server.php";
        const courseId = req.query.courseId;
        const token = 'b5905aee33fbbe8a2cb3f613bcec7bbf';

        const params = {
            wstoken: token,
            wsfunction: 'gradereport_grader_get_users_in_report',
            moodlewsrestformat: 'json',
            courseid: courseId
        };

        // Realizar la solicitud GET utilizando Axios
        const response = await axios.get(url, {params});

        // Verificar si hay usuarios en la respuesta
        if (response.data.users) {
            // Extraer solo los campos id y fullname de cada usuario
            const alumnos = response.data.users.map(alumno => ({
                    id: alumno.id,
                    fullname: alumno.fullname
                }));

            // Devolver la respuesta JSON solo con los id y fullname de los alumnos
            res.json(alumnos);
        } else {
            // Manejar el caso en que no haya usuarios en la respuesta
            res.status(404).json({error: 'No se encontraron usuarios en la respuesta'});
        }

    } catch (error) {
        // Manejar errores
        console.error("Error al enviar la solicitud:", error);
        // Aquí puedes agregar cualquier lógica adicional para manejar el error
    }
});


// Manejador de ruta para todas las demás solicitudes
app.all('*', (req, res) => {
    res.status(404).json({mensaje: 'Ruta no encontrada'});
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor API Gateway escuchando en el puerto ${PORT}`);
});




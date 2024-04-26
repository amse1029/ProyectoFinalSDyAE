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
        parametros.push("wstoken=b5905aee33fbbe8a2cb3f613bcec7bbf");
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
            wstoken: 'b5905aee33fbbe8a2cb3f613bcec7bbf',
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
            wstoken: 'b5905aee33fbbe8a2cb3f613bcec7bbf',
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
//

const {getProfesores} = require('./funciones.js');
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
        const response = await axios.get(url, {params});

        let sum = 0;
        let hasNaN = false;
        // Recorre todas las tablas
        for (const table of response.data.tables) {
            // Recorre los datos de la tabla
            for (const data of table.tabledata) {
                // Verifica si hay un atributo contributiontocoursetotal
                if (data.contributiontocoursetotal) {
                    // Extrae el contenido del atributo contributiontocoursetotal y lo convierte a número
                    const contribution = parseFloat(data.contributiontocoursetotal.content);
                    // Suma el valor al total
                    if (!Number.isNaN(contribution)) {
                        sum += contribution;
                    } else {
                        hasNaN = true;
                    }
                }
            }
        }
        if (hasNaN) {
            // Llamar a la otra función si hay NaN
            const profesores = await getProfesores(courseId);
            res.json({contibucionTotal: sum, profesores});
        } else {
            const jsonData = {contibucionTotal: sum};
            res.json(jsonData);
        }

    } catch (error) {
        // Manejar errores
        console.error("Error al enviar la solicitud:", error);
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

const {obtenerIdsCursos} = require('./funciones.js');

app.get('/api/consultar-alumnos-por-curso', async (req, res) => {
    try {
        const axios = require('axios');
        const url = "http://localhost/webservice/rest/server.php";
        const token = 'b5905aee33fbbe8a2cb3f613bcec7bbf';

        // Obtener todos los IDs de los cursos
        const idsCursos = await obtenerIdsCursos();

        // Array para almacenar la información de alumnos de todos los cursos con su respectivo courseId
        let alumnosTodosCursos = [];

        // Para cada curso, realizar la solicitud de consulta de alumnos y calificaciones
        await Promise.all(idsCursos.map(async (courseId) => {
            const paramsAlumnos = {
                wstoken: token,
                wsfunction: 'gradereport_grader_get_users_in_report',
                moodlewsrestformat: 'json',
                courseid: courseId
            };

            // Realizar la solicitud GET para obtener los alumnos utilizando Axios
            const responseAlumnos = await axios.get(url, {params: paramsAlumnos});

            // Verificar si hay usuarios en la respuesta
            if (responseAlumnos.data.users) {
                // Extraer solo los campos id y fullname de cada usuario
                const alumnosCurso = responseAlumnos.data.users.map(alumno => ({
                        id: alumno.id,
                        fullname: alumno.fullname,
                        courseId: courseId // Agregar el ID del curso al objeto de alumno
                    }));

                // Agregar la información de los alumnos del curso al array
                alumnosTodosCursos = alumnosTodosCursos.concat(alumnosCurso);

                // Para cada alumno en el curso, obtener sus calificaciones
                await Promise.all(alumnosCurso.map(async (alumno) => {
                    const paramsCalificaciones = {
                        wstoken: token,
                        wsfunction: 'gradereport_user_get_grades_table',
                        moodlewsrestformat: 'json',
                        userid: alumno.id,
                        courseid: courseId
                    };

                    // Realizar la solicitud GET para obtener las calificaciones del alumno utilizando Axios
                    const responseCalificaciones = await axios.get(url, {params: paramsCalificaciones});

                    // Calcular la suma de las calificaciones del alumno
                    let sum = 0;
                    let hasNaN = false;
                    for (const table of responseCalificaciones.data.tables) {
                        for (const data of table.tabledata) {
                            if (data.contributiontocoursetotal) {
                                const contribution = parseFloat(data.contributiontocoursetotal.content);
                                if (!Number.isNaN(contribution)) {
                                    sum += contribution;
                                } else {
                                    hasNaN = true;
                                }
                            }
                        }
                    }

                    if (hasNaN) {
                        // Llamar a la otra función si hay NaN
                        const profesores = await getProfesores(courseId);
                        profesores.forEach(profesor => {
                            alumnosTodosCursos.push({NoCalifico: profesor.fullname, Curso: courseId});
                        });
                    }


                    // Agregar las calificaciones al objeto del alumno
                    alumno.calificaciones = sum;
                }));
            }
        }));

        // Devolver la respuesta JSON con la información de todos los alumnos de todos los cursos
        res.json(alumnosTodosCursos);

    } catch (error) {
        // Manejar errores
        console.error("Error al enviar la solicitud:", error);
        res.status(500).json({error: 'Error al procesar la solicitud'});
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




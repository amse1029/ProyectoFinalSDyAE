/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


function hacerSolicitud(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const urlDestino = 'http://localhost:89' + url;
        xhr.open('GET', urlDestino, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    try {
                        const jsonRespuesta = JSON.parse(xhr.responseText);
                        console.log('Respuesta del servidor:', jsonRespuesta);
                        resolve(jsonRespuesta);
                    } catch (error) {
                        console.error("Error al analizar el json de respuesta", error);
                        reject(error);
                    }
                } else {
                    console.error('Error al hacer la solicitud:', xhr.statusText);
                    reject(new Error(xhr.statusText));
                }
            }
        };
        xhr.onerror = function () {
            console.error('Error de red al hacer la solicitud');
            reject(new Error('Error de red al hacer la solicitud'));
        };
        xhr.send();
    });
}

async function consultarAlumno() {
    try {
        const respuesta = await hacerSolicitud('/api/otra-api?userId=4&courseId=2');
        return respuesta;
    } catch (error) {
        console.error('Error al consultar alumno:', error);
        throw error;
    }
}

async function consultarTareasDeAlumnoEnCurso(courseId) {
    try {
        const respuesta = await hacerSolicitud('/api/consultar-tareas-alumno-curso?courseId=' + courseId);
        return respuesta;
    } catch (error) {
        console.error('Error al consultar tareas:', error);
        throw error;
    }
}

async function consultarCursos() {
    try {
        const respuesta = await hacerSolicitud('/api/consultar-cursos?userId=2');
        return respuesta;
    } catch (error) {
        console.error('Error al consultar tareas:', error);
        throw error;

    }

}

function consultarProfesorCurso() {
    hacerSolicitud('/api/consultar-profesor-curso?courseId=2');
}

function consultarCalificaciones() {
    hacerSolicitud('/api/consultar-calificaciones-curso?courseId=2&userId=4');
}



//esto es para control escolar 
function maestroConCalificar() {
    fetch('/api/obtener-maestro-calificaciones');
}


function mestroSinCalificar() {
    fetch('/api/obtener-maestros-sin-calificacion');
}


function promedioAlum() {
    fetch('/api/obtener-promedio-alumno');
}


function consultarCusosAlumnoYCargarAsignaciones() {
    var tbody = document.getElementById('bodyCursos');

    consultarCursos().then(function (resultado) {
        resultado.forEach(function (elemento) {
            const tareasNombres = [];
            const tareasIds = [];
            var idCurso = elemento['id']; // Declarar idCurso como variable local
            console.log(idCurso);

            // Utilizar una función de cierre para capturar el valor correcto de idCurso
            (function(idCurso) {
                consultarTareasDeAlumnoEnCurso(idCurso).then(function (resultadoTareas) {
                    console.log(resultadoTareas['courses']);
                    var tareas = resultadoTareas['courses'][0];
                    var nombreCurso = tareas['fullname'];
                    console.log(nombreCurso);

                    arregloTareas = tareas['assignments'].forEach(function (assign) {
                        console.log(assign['id']);
                        console.log(assign['name']);

                        var idTarea = assign['id'];
                        var nombreTarea = assign['name'];
                        tareasIds.push(idTarea);
                        tareasNombres.push(nombreTarea);
                    });

                    console.log(tareasIds);
                    var i = 0;
                    tareasNombres.forEach(function (tareaNom) {
                        var fila = document.createElement('tr');

                        var nombreCursoFila = document.createElement('td');
                        nombreCursoFila.textContent = nombreCurso;
                        fila.appendChild(nombreCursoFila);

                        var nomTarea = document.createElement('td');
                        nomTarea.textContent = tareaNom;
                        fila.appendChild(nomTarea);

                        var idCursoFila = document.createElement('td');
                        idCursoFila.textContent = idCurso;
                        fila.appendChild(idCursoFila);

                        var tareaIdFila = document.createElement('td');
                        tareaIdFila.textContent = tareasIds[i];
                        fila.appendChild(tareaIdFila);

                        tbody.appendChild(fila);
                        i++;
                    });
                });
            })(idCurso);
        });
    });
}

/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


function hacerSolicitud(url) {
    const xhr = new XMLHttpRequest();
    const urlDestino = 'http://localhost:89' + url;
    xhr.open('GET', urlDestino, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('Respuesta del servidor:', xhr.responseText);
            } else {
                console.error('Error al hacer la solicitud:', xhr.statusText);
            }
        }
    };
    xhr.onerror = function() {
        console.error('Error de red al hacer la solicitud');
    };
    xhr.send();
}

function consultarCursos() {
    hacerSolicitud('/api/consultar-todos-cursos');
}

function consultarAlumnosPorCurso() {
    hacerSolicitud('/api/consultar-alumnos-por-curso?courseId=2');
}

function consultarCalificacionesPorAlumnoCurso() {
    hacerSolicitud('/api/consultar-calificaciones-curso?courseId=3&userId=2');
}




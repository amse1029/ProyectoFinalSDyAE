/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

window.onload = function() {
    // Llama a la función cada mes (aproximadamente)
    setInterval(obtenerCalificacionPorCurso, calcularTiempoMes());
};

// Función para calcular el tiempo en milisegundos de un mes
function calcularTiempoMes() {
    // Obtener la fecha actual
    var fechaActual = new Date();
    // Sumar un mes a la fecha actual
    fechaActual.setMonth(fechaActual.getMonth() + 1);
    // Calcular la diferencia de tiempo entre la fecha actual y la fecha futura
    var tiempoHastaProximoMes = fechaActual.getTime() - Date.now();
    return tiempoHastaProximoMes;
}

function obtenerCalificacionPorCurso() {
    var request = new XMLHttpRequest();
    var url = "http://localhost/webservice/rest/server.php";
    var cursos = [];
    // Construir los parámetros de la URL
    var parametros = [];
    parametros.push("wstoken=a7ab7c13eca9c4d87556998dff78a606");
    parametros.push("wsfunction=gradereport_user_get_grades_table");
    parametros.push("moodlewsrestformat=json");
    parametros.push("userid=" + encodeURIComponent(document.getElementById("userId").value));
    parametros.push("courseid=" + encodeURIComponent(document.getElementById("courseId").value));
    // Combinar todos los parámetros en la URL
    url += "?" + parametros.join("&");
    request.open("GET", url, true);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                // La solicitud fue exitosa
                console.log("Solicitud exitosa!");
                console.log(request.responseText);
                const data = JSON.parse(request.responseText);
                // Array para almacenar las calificaciones por curso
                var calificacionesPorCurso = [];
                data.tables.forEach(table => {
                    table.tabledata.forEach(item => {
                        // Obtener la información del curso y la calificación del alumno
                        var cursoId = item.courseid;
                        var cursoNombre = item.coursename;
                        var alumnoId = item.userid;
                        var alumnoNombre = item.username;
                        var calificacion = item.grade.content;
                        
                        // Obtener información del maestro
                        var maestroId = item.graderid;
                        var maestroNombre = item.graderfullname;

                        // Verificar si ya existe una entrada para este curso en el array
                        var cursoExistente = calificacionesPorCurso.find(curso => curso.cursoId === cursoId);
                        if (cursoExistente) {
                            // Si el curso ya existe, agregar la calificación del alumno
                            cursoExistente.calificaciones.push({ alumnoId: alumnoId, alumnoNombre: alumnoNombre, calificacion: calificacion });
                            cursoExistente.maestro = { maestroId: maestroId, maestroNombre: maestroNombre };
                        } else {
                            // Si el curso no existe, crear una nueva entrada
                            calificacionesPorCurso.push({
                                cursoId: cursoId,
                                cursoNombre: cursoNombre,
                                calificaciones: [{ alumnoId: alumnoId, alumnoNombre: alumnoNombre, calificacion: calificacion }],
                                maestro: { maestroId: maestroId, maestroNombre: maestroNombre }
                            });
                        }
                    });
                });

                // Calcular el promedio de calificaciones por curso
                calificacionesPorCurso.forEach(curso => {
                    var sum = 0;
                    curso.calificaciones.forEach(calificacion => {
                        sum += parseFloat(calificacion.calificacion);
                    });
                    curso.promedioCalificaciones = sum / curso.calificaciones.length;
                });

                // Imprimir las calificaciones por curso y los maestros
                calificacionesPorCurso.forEach(curso => {
                    console.log("Curso:", curso.cursoNombre);
                    console.log("Promedio de calificaciones:", curso.promedioCalificaciones);
                    console.log("Maestro:", curso.maestro.maestroNombre);
                    curso.calificaciones.forEach(calificacion => {
                        console.log("Alumno:", calificacion.alumnoNombre);
                        console.log("Calificación:", calificacion.calificacion);
                    });
                    console.log("---");
                });

                // Array para almacenar los maestros que no han asignado una calificación
                var maestrosEnListaNegra = [];

                // Iterar sobre las calificaciones por curso para identificar los maestros sin calificación
                calificacionesPorCurso.forEach(curso => {
                    if (curso.calificaciones.length === 0) {
                        maestrosEnListaNegra.push(curso.maestro);
                    }
                });
                
                generarHTMLListaNegra(maestrosEnListaNegra);
                
            } else {
                // Manejo de errores en caso de que la solicitud no sea exitosa
                console.error("Error en la solicitud: ", request.statusText);
                // Aquí puedes agregar cualquier lógica adicional para manejar el error
            }
        }
    };
    
    

    request.onerror = function () {
        // Manejo de errores en caso de que la solicitud falle
        console.error("Error al enviar la solicitud");
        // Aquí puedes agregar cualquier lógica adicional para manejar el error
    };
    request.send();
}

function generarHTMLListaNegra(maestrosEnListaNegra) {
    var htmlListaNegra = "<h1>Maestros en Lista Negra</h1>";
    htmlListaNegra += "<ul>";
    maestrosEnListaNegra.forEach(maestro => {
        htmlListaNegra += "<li>" + maestro.maestroNombre + "</li>";
    });
    htmlListaNegra += "</ul>";

    // Crear un nuevo archivo HTML llamado "listaNegra.html" y escribir el HTML generado
    // Aquí asumo que tienes una función para escribir un archivo HTML, puedes usar las herramientas de tu backend para hacerlo
    escribirHTMLListaNegra(htmlListaNegra);
}

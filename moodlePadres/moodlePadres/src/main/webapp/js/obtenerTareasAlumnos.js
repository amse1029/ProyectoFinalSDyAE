/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

function enviarPeticion() {
    var request = new XMLHttpRequest();
    var url = "http://localhost/webservice/rest/server.php";
    var cursoId = document.getElementById("cursoId").value; // Obtener el ID del curso específico
    var alumnoId = document.getElementById("alumnoId").value; // Obtener el ID del alumno específico
    var tareas = [];
    var tbody = document.getElementById('tablaTareas');

    // Construir los parámetros de la URL para obtener las tareas del curso
    var parametrosTareas = [];
    parametrosTareas.push("wstoken=a7ab7c13eca9c4d87556998dff78a606");
    parametrosTareas.push("wsfunction=mod_assign_get_assignments");
    parametrosTareas.push("courseids[0]=" + cursoId);
    parametrosTareas.push("moodlewsrestformat=json");

    // Combinar todos los parámetros en la URL para obtener las tareas
    var urlTareas = url + "?" + parametrosTareas.join("&");

    // Solicitar las tareas del curso
    request.open("GET", urlTareas, true);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                // La solicitud de obtener las tareas fue exitosa
                console.log("Solicitud de tareas exitosa!");
                console.log(request.responseText);
                tareas = JSON.parse(request.responseText);
                mostrarTareasDeAlumno(tareas, alumnoId, tbody); // Mostrar las tareas del alumno después de obtenerlas
            } else {
                // Manejo de errores en caso de que la solicitud de tareas no sea exitosa
                console.error("Error en la solicitud de tareas: ", request.statusText);
                // Aquí puedes agregar cualquier lógica adicional para manejar el error
            }
        }
    };
    request.send();
}

// Función para mostrar las tareas de un alumno específico en la tabla
function mostrarTareasDeAlumno(tareas, alumnoId, tbody) {
    // Filtrar las tareas para obtener solo las asignadas al alumno específico
    var tareasAlumno = tareas.filter(function (tarea) {
        return tarea.userid === alumnoId;
    });

    // Limpiar la tabla antes de agregar las nuevas filas
    tbody.innerHTML = "";

    // Agregar las tareas del alumno a la tabla
    tareasAlumno.forEach(function (tarea) {
        var fila = document.createElement('tr');

        var celdaNombreTarea = document.createElement('td');
        celdaNombreTarea.textContent = tarea.name;
        fila.appendChild(celdaNombreTarea);

        var celdaFechaLimite = document.createElement('td');
        celdaFechaLimite.textContent = tarea.duedate ? tarea.duedate : "Sin fecha límite";
        fila.appendChild(celdaFechaLimite);

        // Agregar más celdas según sea necesario para mostrar otros detalles de la tarea

        tbody.appendChild(fila);
    });
}




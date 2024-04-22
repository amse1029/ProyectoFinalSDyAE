/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


function obtenerCalificacionPorCurso() {
    var request = new XMLHttpRequest();
    var url = "http://localhost/webservice/rest/server.php";
    var cursos = [];
    //var tbody = document.getElementById('tablaCursos');
    // Construir los parámetros de la URL
    var parametros = [];
    parametros.push("wstoken=a7ab7c13eca9c4d87556998dff78a606");
    parametros.push("wsfunction=gradereport_user_get_grades_table");
    // parametros.push("courseid=2");
    parametros.push("moodlewsrestformat=json");
    parametros.push("userid=" + encodeURIComponent(document.getElementById("userId").value));
    parametros.push("courseid=" + encodeURIComponent(document.getElementById("courseId").value));
    //parametros.push("groupid=0");
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
                data.tables.forEach(table => {
                    table.tabledata.forEach(item => {
                        //const asignacion = obtenerTextoEntreAnotaciones(item.itemname.content);

                        var calificacion = "No disponible";
                        var feedback = "No disponible";
                        var total = "No disponible";
                        if ('itemname' in item) {

                            if ('feedback' in item) {
                                feedback = item.feedback.content;
                                console.log("Feedback:", feedback);
                            }
                            if ('grade' in item) {
                                calificacion = item.grade.content;
                                console.log("Calificación:", calificacion);
                            }
                            if ('contributiontocoursetotal' in item) {
                                total = item.contributiontocoursetotal.content;
                                console.log("Total:", total);
                            }
                            console.log("---");
                        }

                    });
                });

                function obtenerTextoEntreAnotaciones(texto) {
                    const regex = /<([^>]*)>/;
                    const match = regex.exec(texto);
                    return match ? match[1] : "No disponible";
                }

//                cursos = JSON.parse(request.responseText);
//
//                cursos.forEach(curso => {
//                   // var fila = document.createElement('tr');
//
//                    //var celdaCursoNombre = document.createElement('td');
//                   // celdaCursoNombre.textContent = curso.fullname;
//                   // fila.appendChild(celdaCursoNombre);
//
////                    var celdaNombreAlumno = document.createElement('td');
////                    celdaNombreAlumno.textContent = "algo equis";
////                    fila.appendChild(celdaNombreAlumno);
////                    
////                    buscarInfoCursos(curso.id, fila, tbody);
////                    tbody.appendChild(fila);
//                    console.log("Asignacion:", curso.id);
//                    console.log("Calificacion:", curso.fullname);
//                    console.log("feedback:", curso.id);
//                    console.log("total:", curso.fullname);
//
//                });
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
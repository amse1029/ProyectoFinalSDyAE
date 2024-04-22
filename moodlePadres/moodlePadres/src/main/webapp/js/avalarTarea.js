/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

function avalarTarea(idTarea) {
    var request = new XMLHttpRequest();
    var url = "http://localhost/webservice/rest/server.php";
    // Construir los parámetros de la URL
    var parametros = [];
    parametros.push("wstoken=a7ab7c13eca9c4d87556998dff78a606");
    parametros.push("wsfunction=gradereport_user_get_grades_table");
    parametros.push("moodlewsrestformat=json");
    parametros.push("userid=" + encodeURIComponent(document.getElementById("userId").value));
    parametros.push("courseid=" + encodeURIComponent(document.getElementById("courseId").value));
    parametros.push("status=graded"); // Estado de la tarea (en este caso, calificada)
    parametros.push("applytoall=0"); // Aplicar la calificación solo a esta tarea
    parametros.push("plugindata[assignfeedbackcomments_editor][text]=" + encodeURIComponent("Comentario del padre")); // Comentario del padre

    // Combinar todos los parámetros en la URL
    url += "?" + parametros.join("&");
    request.open("GET", url, true);

    // Enviar la solicitud para avalar la tarea
    request.open("GET", url, true);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                // La solicitud de avalar la tarea fue exitosa
                console.log("Tarea avalada correctamente!");
                console.log(request.responseText);
                // Aquí puedes agregar cualquier lógica adicional después de avalar la tarea
            } else {
                // Manejo de errores en caso de que la solicitud no sea exitosa
                console.error("Error al avalar la tarea: ", request.statusText);
                // Aquí puedes agregar cualquier lógica adicional para manejar el error
            }
        }
    };
    request.send();
}


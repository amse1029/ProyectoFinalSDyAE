function enviarPeticion() {
    var request = new XMLHttpRequest();
    var url = "http://localhost/webservice/rest/server.php";
    var cursos = [];
    var tbody = document.getElementById('tablaCursos');
    // Construir los parámetros de la URL
    var parametros = [];
    parametros.push("wstoken=b5905aee33fbbe8a2cb3f613bcec7bbf");
    parametros.push("wsfunction=core_enrol_get_users_courses");
    // parametros.push("courseid=2");
    parametros.push("moodlewsrestformat=json");
    parametros.push("userid=" + encodeURIComponent(document.getElementById("userId").value));
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
                cursos = JSON.parse(request.responseText);

                cursos.forEach(curso => {
                    var fila = document.createElement('tr');

                    var celdaCursoNombre = document.createElement('td');
                    celdaCursoNombre.textContent = curso.fullname;
                    fila.appendChild(celdaCursoNombre);

                    var celdaNombreAlumno = document.createElement('td');
                    celdaNombreAlumno.textContent = "algo equis";
                    fila.appendChild(celdaNombreAlumno);
                    
                    buscarInfoCursos(curso.id, fila, tbody);
                    tbody.appendChild(fila);
                    console.log("ID del curso:", curso.id);
                    console.log("Nombre completo del curso:", curso.fullname);

                });
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

function buscarInfoCursos(cursoId, filaTabla) {
    var request = new XMLHttpRequest();
    var url = "http://localhost/webservice/rest/server.php";
    var params = [];

    params.push("wstoken=b5905aee33fbbe8a2cb3f613bcec7bbf");
    params.push("wsfunction=core_enrol_get_enrolled_users");
    params.push("courseid=" + cursoId);
    params.push("moodlewsrestformat=json");

    url += "?" + params.join("&");
    request.open("GET", url, true);

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                // La solicitud fue exitosa
                console.log("Solicitud exitosa!");
                console.log(request.responseText);
                var cursoInfo = JSON.parse(request.responseText);
                const maestros = cursoInfo.filter(user => user.roles.some(role => role.shortname === 'editingteacher'));
                cursoInfo = cursoInfo.filter(maestro => !maestros.some(filtrado => filtrado.id === maestro.id));

                maestros.forEach(maestro => {
                    var celdaNombreMaestro = document.createElement('td');
                    celdaNombreMaestro.textContent = maestro.fullname;
                    filaTabla.appendChild(celdaNombreMaestro);

                    var celdaIdCurso = document.createElement('td');
                    celdaIdCurso.textContent = cursoId;
                    filaTabla.appendChild(celdaIdCurso);

                    var celdaIdAlumno = document.createElement('td');
                    celdaIdAlumno.textContent = "1";
                    filaTabla.appendChild(celdaIdAlumno);

                    var celdaIdMaestro = document.createElement('td');
                    celdaIdMaestro.textContent = maestro.id;
                    filaTabla.appendChild(celdaIdMaestro);

                    console.log("ID del maestro:", maestro.id);
                    console.log("Nombre completo del maestro:", maestro.fullname);
                });
            } else {
                // Manejo de errores en caso de que la solicitud no sea exitosa
                console.error("Error en la solicitud: ", request.statusText);
                // Aquí puedes agregar cualquier lógica adicional para manejar el error
            }
        }
    };
    request.onerror = function () {
        // Manejo de errores en caso de que la solicitud falle
        console.error("Error al enviar la solicitud al obtener info de los cursos");
        // Aquí puedes agregar cualquier lógica adicional para manejar el error
    };

    request.send();


}
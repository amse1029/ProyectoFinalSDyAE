/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


// Mostrar resultados de calificaciones por curso en la página
function mostrarResultados(calificacionesPorCurso) {
    var resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = ""; // Limpiar el contenido existente

    calificacionesPorCurso.forEach(curso => {
        var cursoDiv = document.createElement("div");
        cursoDiv.classList.add("curso");

        var nombreCursoHeader = document.createElement("h2");
        nombreCursoHeader.textContent = "Curso: " + curso.cursoNombre;
        cursoDiv.appendChild(nombreCursoHeader);

        var promedioCalificacionesParrafo = document.createElement("p");
        promedioCalificacionesParrafo.textContent = "Promedio de Calificaciones: " + curso.promedioCalificaciones.toFixed(2);
        cursoDiv.appendChild(promedioCalificacionesParrafo);

        var maestroParrafo = document.createElement("p");
        maestroParrafo.textContent = "Maestro: " + curso.maestro.maestroNombre;
        cursoDiv.appendChild(maestroParrafo);

        var calificacionesLista = document.createElement("ul");
        curso.calificaciones.forEach(calificacion => {
            var calificacionItem = document.createElement("li");
            calificacionItem.textContent = calificacion.alumnoNombre + ": " + calificacion.calificacion;
            calificacionesLista.appendChild(calificacionItem);
        });
        cursoDiv.appendChild(calificacionesLista);

        resultadosDiv.appendChild(cursoDiv);
    });
}

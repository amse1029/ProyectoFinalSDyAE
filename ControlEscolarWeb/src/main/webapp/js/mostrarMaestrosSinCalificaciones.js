/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


// Mostrar maestros sin calificaciones en la página
function mostrarMaestrosSinCalificaciones(maestrosSinCalificaciones) {
    var maestrosDiv = document.getElementById("maestrosSinCalificaciones");
    maestrosDiv.innerHTML = ""; // Limpiar el contenido existente

    var listaMaestros = document.createElement("ul");
    maestrosSinCalificaciones.forEach(maestro => {
        var maestroItem = document.createElement("li");
        maestroItem.textContent = maestro.nombre;
        listaMaestros.appendChild(maestroItem);
    });

    maestrosDiv.appendChild(listaMaestros);
}

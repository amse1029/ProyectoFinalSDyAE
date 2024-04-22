/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


// Obtener maestros sin calificaciones desde el servidor
function obtenerMaestrosSinCalificaciones(callback) {
    fetch('/api/maestrosSinCalificaciones')
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(error => {
            console.error('Error al obtener los maestros sin calificaciones:', error);
        });
}

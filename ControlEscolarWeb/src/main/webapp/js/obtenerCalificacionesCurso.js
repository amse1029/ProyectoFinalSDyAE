/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


// Obtener calificaciones por curso desde el servidor
function obtenerCalificacionPorCurso(callback) {
    fetch('/api/calificacionesPorCurso')
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(error => {
            console.error('Error al obtener las calificaciones por curso:', error);
        });
}

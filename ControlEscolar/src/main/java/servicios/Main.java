/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package servicios;

/**
 *
 * @author DELL
 */
public class Main {

    public static void main(String[] args) {
        MoodleConsumer moodle = new MoodleConsumer();

        moodle.getAlumnos();
        //moodle.getCursos();
        //moodle.getCalificacionesPorCursoId(6);
        moodle.close();
        
//        SistemaEscolarConsumer sistemaEscolar =new SistemaEscolarConsumer();
//        String json="{\"calificacionParcial\":10.0,\"id\":1,\"idAlumno\":1,\"nombreAlumno\":\"Jesus\",\"nombreMaestro\":\"Cabada\",\"nombreMateria\":\"Matematicas\",\"numParcial\":1}";
//        sistemaEscolar.enviarCalificacion(json);
//        sistemaEscolar.close();
    }
}

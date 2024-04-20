/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Datos;

import dominiobroker.Alumno;
import dominiobroker.Calificacion;
import dominiobroker.Curso;
import dominiobroker.Maestro;
import java.io.IOException;
import java.util.ArrayList;
import org.json.JSONException;

/**
 *
 * @author javie
 */
public class FachadaDatos implements IDatos {

    @Override
    public ArrayList<Curso> getCursos() {
       ResourceCurso curso = new ResourceCurso();
       return curso.getCursos();
    }
    
@Override
public ArrayList<Calificacion> getCalificaciones(ArrayList<Curso> cursos) {
   try {
       ResourceCalificacion cal = new ResourceCalificacion();
       return cal.getCalificaciones(cursos);
   } catch (JSONException e) {
       e.printStackTrace(); // Manejo básico de la excepción, imprime el rastreo de la pila
       // También podrías manejar la excepción de otra manera, como lanzarla nuevamente o registrarla
       return null; // Otra opción sería devolver una lista vacía o algún otro valor predeterminado
   }
}

    
    @Override
    public ArrayList<Maestro> getMaestros() {
       ResourceMaestro maestro = new ResourceMaestro();
       return maestro.getMaestros();
    }

    @Override
    public Curso getCursoById(Integer id) {
        ResourceCurso curso=new ResourceCurso();
        return curso.getCursoById(id);
    }
    @Override
    public ArrayList<Alumno> getAlumnos() {
       ResourceAlumnos alumno = new ResourceAlumnos();
       return alumno.getAlumnos();
    }

    @Override
    public void enviarCalificaciones(ArrayList<Calificacion> calificaciones)throws IOException {
        ResourceCalificacion cal = new ResourceCalificacion();
        cal.enviarCalificaciones(calificaciones);
    }

    
    
}

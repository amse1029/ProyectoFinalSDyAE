/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package Datos;
import dominiobroker.Alumno;
import dominiobroker.Calificacion;
import dominiobroker.Curso;
import dominiobroker.Maestro;
import java.io.IOException;
import java.util.ArrayList;
/**
 *
 * @author DELL
 */
public interface IDatos {
      public ArrayList<Curso> getCursos();
    public ArrayList<Alumno> getAlumnos();
    public Curso getCursoById(Integer id);
    public ArrayList<Maestro> getMaestros();
    public ArrayList<Calificacion> getCalificaciones(ArrayList<Curso> cursos);
    public void enviarCalificaciones(ArrayList<Calificacion> calificaciones) throws IOException;

}

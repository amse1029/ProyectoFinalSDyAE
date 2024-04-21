/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package Negocio;
import dominiobroker.Alumno;
import dominiobroker.Curso;
import dominiobroker.Maestro;
import dominiobroker.Calificacion;
import java.io.IOException;
import java.util.ArrayList;

/**
 *
 * @author DELL
 */
public interface INegocio {
       
    public ArrayList<Curso> getCursos();
    public ArrayList<Maestro> getMaestros();
    public ArrayList<Alumno> getAlumnos();
    public ArrayList<Calificacion> getCalificaciones( ArrayList<Curso> cursos);
     public void enviCalificacions(ArrayList<Calificacion> calificaciones) throws IOException; 
        
    
}

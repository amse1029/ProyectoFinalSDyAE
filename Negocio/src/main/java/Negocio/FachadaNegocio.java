/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Negocio;
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
public class FachadaNegocio implements INegocio{
    @Override
    public ArrayList<Curso> getCursos() {
        CtrlCurso curso = new CtrlCurso();
       return curso.getCursos();
    }
    
    @Override
    public ArrayList<Calificacion> getCalificaciones( ArrayList<Curso> cursos) {
        CtrlCalificacion cal = new CtrlCalificacion();
       return cal.getCalificaciones(cursos);
    }
    


    @Override
    public ArrayList<Maestro> getMaestros() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
   
    @Override
    public void enviCalificacions(ArrayList<Calificacion> calificaciones) throws IOException {
        CtrlCalificacion cal = new CtrlCalificacion();
        cal.enviarCalificaciones(calificaciones);
    }
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Negocio;
import Datos.FabricaDatos;
import Datos.FachadaDatos;
import dominiobroker.Curso;
import java.util.ArrayList;


/**
 *
 * @author DELL
 */
public class CtrlCurso {
        
    public ArrayList<Curso> getCursos(){
        FachadaDatos fachadaDatos = FabricaDatos.getFachadaDatos();
        
        
        return fachadaDatos.getCursos();
    }
    public Curso getCursoById(Integer id){
        FachadaDatos fachadaDatos = FabricaDatos.getFachadaDatos();
        return fachadaDatos.getCursoById(id);
    }
}

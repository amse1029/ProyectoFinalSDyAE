/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dominiobroker;
import java.util.ArrayList;
/**
 *
 * @author DELL
 */
public class Alumno {
    ArrayList<Curso> cursos;
    String nombre;
    int id;

    @Override
    public String toString() {
        return "Alumno{" + "cursos=" + cursos + ", nombre=" + nombre + ", id=" + id + '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Alumno() {
    }

    public ArrayList<Curso> getCursos() {
        return cursos;
    }

    public void setCursos(ArrayList<Curso> cursos) {
        this.cursos = cursos;
    }

    public Alumno(ArrayList<Curso> cursos, String nombre) {
        this.cursos = cursos;
        this.nombre = nombre;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    
    
    
}

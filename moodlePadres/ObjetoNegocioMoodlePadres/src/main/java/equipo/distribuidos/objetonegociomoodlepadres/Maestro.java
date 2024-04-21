/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package equipo.distribuidos.objetonegociomoodlepadres;
import java.util.ArrayList;
/**
 *
 * @author DELL
 */
public class Maestro {
     private int id;
    private String nombre;

    public Maestro(String nombre) {
        this.nombre = nombre;
    }

   public Maestro(Long id_maestro, String nombreMaestro) {
    this.id = id_maestro.intValue();
    this.nombre = nombreMaestro;
}


    public String getNombre() {
        return nombre;
    }

    @Override
    public String toString() {
        return "Maestro " + "id=" + id + ", nombre=" + nombre + '}';
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

}
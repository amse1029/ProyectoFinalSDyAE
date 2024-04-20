/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Negocio;
import Datos.ResourceCalificacion;
import dominiobroker.Calificacion;
import dominiobroker.Curso;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;
import java.util.ArrayList;
import org.json.JSONException;

/**
 *
 * @author DELL
 */
public class CtrlCalificacion {
    
public ArrayList<Calificacion> getCalificaciones(ArrayList<Curso> cursos) {
        ResourceCalificacion resource = new ResourceCalificacion();
        try {
            return resource.getCalificaciones(cursos);
        } catch (JSONException e) {
            e.printStackTrace(); // Manejo básico de la excepción, imprime el rastreo de la pila
            // También podrías manejar la excepción de otra manera, como lanzarla nuevamente o registrarla
            return null; // Otra opción sería devolver una lista vacía o algún otro valor predeterminado
        }
    }
    //e we para enviar los datos ala api del chui pueden ahcerun metodo en control y en accesoa datos llamado enviar calificaciones y ahi se conectan ala api

    public void enviarCalificaciones(ArrayList<Calificacion> calificaciones) throws ProtocolException, IOException{
    ResourceCalificacion resource = new ResourceCalificacion();
         resource.enviarCalificaciones(calificaciones);
    }
    
}

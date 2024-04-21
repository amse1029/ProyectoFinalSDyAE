/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.pruebacontrolescolar;

import Servicios.Alumnos;
import Servicios.Cursos;
import Servicios.ServicioMaestros;
import equipo.distribuidos.objetonegociomoodlepadres.Alumno;
import equipo.distribuidos.objetonegociomoodlepadres.Curso;
import equipo.distribuidos.objetonegociomoodlepadres.Maestro;
import java.io.IOException;
import java.util.List;

/**
 *
 * @author DELL
 */
public class PruebaControlEscolar {
     public static void main(String[] args) {
        // URL base de tu sitio Moodle
        String baseUrl = "http://localhost:8080";
        long idCurso = 12; // Reemplaza con el ID real del curso que deseas obtener
        
        try {
            // Obtener el maestro del curso
            Maestro maestro = ServicioMaestros.obtenerMaestroDeCurso(baseUrl, idCurso);
            
            // Imprimir el maestro obtenido
            if (maestro != null) {
                System.out.println("Maestro del curso:");
                System.out.println(maestro);
            } else {
                System.out.println("No se encontró un maestro para el curso con ID " + idCurso);
            }
            
            // Obtener el alumno
            Alumnos servicioAlumnos = new Alumnos(baseUrl);
            Alumno alumno = servicioAlumnos.obtenerAlumno();
            System.out.println("Alumno obtenido: " + alumno);
            
            // Obtener el curso
            Curso curso = Cursos.obtenerCurso(baseUrl, idCurso); 
            System.out.println("Curso obtenido: " + curso);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

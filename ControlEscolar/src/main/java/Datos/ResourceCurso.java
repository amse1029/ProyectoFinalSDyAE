/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Datos;

import dominiobroker.Alumno;
import dominiobroker.Curso;
import dominiobroker.Maestro;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import servicios.MoodleConsumer;

/**
 *
 * @author DELL
 */
public class ResourceCurso {
      MoodleConsumer moodle = new MoodleConsumer();

    public ArrayList<Curso> getCursos() {
        ArrayList<Curso> cursos = new ArrayList<Curso>();

        try {
            // Convertir cadena a JSONObject
            JSONObject jsnobject = new JSONObject(moodle.getCursos());

            // Convertir JSONObject a JSONArray
            JSONArray jsonArray = jsnobject.getJSONArray("courses");

            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject explrObjectCourses = jsonArray.getJSONObject(i);

                // Lista de Maestros
                ArrayList<Maestro> maestros = new ArrayList<>();

                // Obtener array contacts dentro del array courses del JSON
                JSONArray jsonArrayContacts = jsonArray.getJSONObject(i).optJSONArray("contacts");
                // For para obtener maestros del curso
                for (int j = 0; j < jsonArrayContacts.length(); j++) {
                    JSONObject explrObjectContacts = jsonArrayContacts.getJSONObject(j);
                    maestros.add(new Maestro(explrObjectContacts.getInt("id"), explrObjectContacts.getString("fullname")));
                }

                ResourceAlumnos alumnos = new ResourceAlumnos();

                // Agregar un curso a la lista
                cursos.add(new Curso(maestros, explrObjectCourses.getString("fullname"), explrObjectCourses.getString("shortname"), explrObjectCourses.getInt("id")));
            }
        } catch (Exception e) {
            e.printStackTrace(); // Manejo básico de la excepción, imprime el rastreo de la pila
            // También podrías manejar la excepción de otra manera, como lanzarla nuevamente o registrarla
        }

        return cursos;
    }

    public Curso getCursoById(Integer id) {
        ArrayList<Curso> cursos = getCursos();

        for (Curso c : cursos) {
            if (c.getId() == id) {
                return c;
            }
        }
        return null;
    }
}

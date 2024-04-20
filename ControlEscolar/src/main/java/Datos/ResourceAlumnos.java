/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Datos;

/**
 *
 * @author DELL
 */
import dominiobroker.Alumno;
import dominiobroker.Curso;
import dominiobroker.Maestro;
import Negocio.CtrlCurso;
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
import org.json.JSONException; // Agregamos la importación de JSONException
import servicios.MoodleConsumer;

public class ResourceAlumnos {
    MoodleConsumer moodle = new MoodleConsumer();

    public ArrayList<Alumno> getAlumnos() {
        ArrayList<Alumno> alumnos = new ArrayList<Alumno>();

        try {
            JSONArray jsonArray = new JSONArray(moodle.getAlumnos());
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject explrObjectCourses = jsonArray.getJSONObject(i);
                Alumno a = new Alumno();
                a.setNombre(explrObjectCourses.getString("fullname"));
                a.setId(explrObjectCourses.getInt("id"));

                ResourceCurso curso = new ResourceCurso();

                if (jsonArray.getJSONObject(i).has("enrolledcourses")) {
                    JSONArray jsonArrayCourses = jsonArray.getJSONObject(i).optJSONArray("enrolledcourses");
                    ArrayList<Curso> cursos = new ArrayList<>();
                    for (int j = 0; j < jsonArrayCourses.length(); j++) {
                        JSONObject objCourses = jsonArrayCourses.getJSONObject(j);
                        cursos.add(curso.getCursoById(objCourses.getInt("id")));
                    }
                    a.setCursos(cursos);
                    alumnos.add(a);
                }
            }
        } catch (JSONException e) {
            e.printStackTrace(); // Manejo básico de la excepción, imprime el rastreo de la pila
            // También podrías manejar la excepción de otra manera, como lanzarla nuevamente o registrarla
        }

        return alumnos;
    }
}

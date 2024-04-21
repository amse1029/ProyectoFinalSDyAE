/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Servicios;

import com.google.gson.Gson;
import equipo.distribuidos.objetonegociomoodlepadres.Curso;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.IOException;

/**
 *
 * @author DELL
 */
public class Cursos {
   
    public static Curso obtenerCurso(String baseUrl, long idCurso) throws IOException {
        // Construir la URL para obtener el curso específico
        String endpoint = baseUrl + "/webservice/rest/server.php" +
                "?wstoken=d81504f29684a90768a7aa24810ea0d3" +
                "&wsfunction=core_course_get_course" +
                "&moodlewsrestformat=json" +
                "&id=" + idCurso;

        // Crear cliente HTTP
        HttpClient httpClient = HttpClients.createDefault();
        HttpGet request = new HttpGet(endpoint);

        // Ejecutar la solicitud
        HttpResponse response = httpClient.execute(request);
        HttpEntity entity = response.getEntity();

        if (entity != null) {
            // Convertir la respuesta a JSON
            String jsonString = EntityUtils.toString(entity);
            Gson gson = new Gson();
            // Parsear el JSON a un objeto Curso
            return gson.fromJson(jsonString, Curso.class);
        } else {
            // Si la respuesta es nula, lanzar una excepción o retornar null, según sea el caso
            return null;
        }
    }
}

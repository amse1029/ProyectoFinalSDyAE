package Servicios;

import com.google.gson.Gson;
import equipo.distribuidos.objetonegociomoodlepadres.Alumno;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.IOException;

public class Alumnos {

    private final String baseUrl;
    private final HttpClient httpClient;
    private final Gson gson;

    public Alumnos(String baseUrl) {
        this.baseUrl = baseUrl;
        this.httpClient = HttpClients.createDefault();
        this.gson = new Gson();
    }

    public Alumno obtenerAlumno() throws IOException {
        String endpoint = baseUrl + "/webservice/rest/server.php" +
                "?wstoken=YOUR_MOODLE_TOKEN" +
                "&wsfunction=core_user_get_users" +
                "&moodlewsrestformat=json";

        HttpGet request = new HttpGet(endpoint);

        HttpResponse response = httpClient.execute(request);
        HttpEntity entity = response.getEntity();

        if (entity != null) {
            String jsonString = EntityUtils.toString(entity);
            // Se espera que el JSON devuelto represente un solo objeto Alumno
            return gson.fromJson(jsonString, Alumno.class);
        } else {
            // Manejar respuesta nula o vacía
            return null;
        }
    }
}

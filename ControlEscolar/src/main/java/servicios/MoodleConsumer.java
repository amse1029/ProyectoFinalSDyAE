/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package servicios;

/**
 *
 * @author DELL
 */
import jakarta.ws.rs.ClientErrorException;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.WebTarget;
import jakarta.ws.rs.core.MediaType;

public class MoodleConsumer {
    private WebTarget webTarget;
    private Client client;
    private static final String BASE_URI = "http://localhost:8080/webservice/rest";

    public MoodleConsumer() {
        client = jakarta.ws.rs.client.ClientBuilder.newClient();
    }

    public String getAlumnos() throws ClientErrorException {
        webTarget = client.target(BASE_URI).path("{page}")
                    .resolveTemplate("page", "server.php")
                    .queryParam("wstoken", "d81504f29684a90768a7aa24810ea0d3")
                    .queryParam("moodlewsrestformat", "json")
                    .queryParam("wsfunction", "core_enrol_get_enrolled_users")
                    .queryParam("courseid", "1");
        String response = webTarget.request(MediaType.APPLICATION_JSON)
            .get(String.class);
            //System.out.println(response);
            return response;
    }
    
    public String  getCursos() throws ClientErrorException {
        webTarget = client.target(BASE_URI).path("{page}")
                    .resolveTemplate("page", "server.php")
                    .queryParam("wstoken", "d81504f29684a90768a7aa24810ea0d3")
                    .queryParam("moodlewsrestformat", "json")
                    .queryParam("wsfunction", "core_course_get_courses_by_field")
                    .queryParam("field", "category")
                    .queryParam("value", "1");
        String response = webTarget.request(MediaType.APPLICATION_JSON)
            .get(String.class);
            //System.out.println(response);
            return response;
    }
    
    public String getCalificacionesPorCursoId(int courseid) throws ClientErrorException {
        webTarget = client.target(BASE_URI).path("{page}")
                    .resolveTemplate("page", "server.php")
                    .queryParam("wstoken", "d81504f29684a90768a7aa24810ea0d3")
                    .queryParam("moodlewsrestformat", "json")
                    .queryParam("wsfunction", "gradereport_user_get_grade_items")
                    .queryParam("courseid", courseid);
        String response = webTarget.request(MediaType.APPLICATION_JSON)
            .get(String.class);
            //System.out.println(response);
            
            return response;
    }
    
    
    public void close() {
        client.close();
    }

}
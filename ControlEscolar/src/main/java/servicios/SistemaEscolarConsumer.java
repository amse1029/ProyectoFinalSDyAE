/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package servicios;

/**
 *
 * @author DELL
 */

import java.io.IOException;
import java.net.HttpURLConnection;
import jakarta.ws.rs.ClientErrorException;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.WebTarget;
import jakarta.ws.rs.core.MediaType;
import java.net.URL;

public class SistemaEscolarConsumer {
    private WebTarget webTarget;
    private Client client;
    public static final String BASE_URI = "..."; //se debe agreagar la api para acceder a control escolar

    public SistemaEscolarConsumer() {
        client = jakarta.ws.rs.client.ClientBuilder.newClient();
        webTarget= client.target(BASE_URI);
    }

    public void enviarCalificacion(Object requestEntity) throws ClientErrorException, IOException {
        System.out.println("gucci gang");
        webTarget.request(jakarta.ws.rs.core.MediaType.APPLICATION_JSON).post(jakarta.ws.rs.client.Entity.entity(requestEntity, jakarta.ws.rs.core.MediaType.APPLICATION_JSON));
                System.out.println(webTarget.request(jakarta.ws.rs.core.MediaType.APPLICATION_JSON).post(jakarta.ws.rs.client.Entity.entity(requestEntity, jakarta.ws.rs.core.MediaType.APPLICATION_JSON)).getStatus());

        System.out.println("prueba pasada");
    }
    
    
    public void close() {
        client.close();
    }

}

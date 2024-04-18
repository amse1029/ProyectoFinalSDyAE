/**
 * Clase IConexionBD.java creada el 29/03/2023.
 */
package equipo.distribuidos.interfaces;

import javax.persistence.EntityManager;

/**
 *
 * @author MoodleTeam
 */
public interface IConexionBD {

    /**
     * Método para obtener el EntityManager de la conexión.
     *
     * @return EntityManager de la conexión.
     */
    public EntityManager getEM();
}

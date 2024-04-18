/**
 * ConexionBD.java creada el 31/03/2023.
 */
package equipo.distribuidos.conexion;


import equipo.distribuidos.interfaces.IConexionBD;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

/**
 *
 * @author MoodleTeam
 */
public class ConexionBD implements IConexionBD {

    /**
     * Atributo que representa el entityManager.
     */
    private EntityManager entityManager;
    /**
     * Atributo que representa el nombre de la persistencia.
     */
    private String nombrePersistencia;

    /**
     * Método constructor que crea el entityManager de la conexión.
     *
     * @param nombrePersistencia Nombre de la persistencia.
     */
    public ConexionBD(String nombrePersistencia) {
        this.nombrePersistencia = nombrePersistencia;
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory(nombrePersistencia);
        entityManager = entityManagerFactory.createEntityManager();
    }

    /**
     * Método para obtener el entityManager de la conexión.
     *
     * @return EntityManager.
     */
    public EntityManager getEM() {
        return entityManager;
    }
}

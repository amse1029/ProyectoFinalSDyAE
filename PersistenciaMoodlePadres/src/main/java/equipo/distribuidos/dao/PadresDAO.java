/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package equipo.distribuidos.dao;
import equipo.distribuidos.conexion.ConexionBD;
import equipo.distribuidos.interfaces.IConexionBD;
import equipo.distribuidos.interfaces.IPadresDAO;
import equipo.distribuidos.objetonegociomoodlepadres.Alumno;
import equipo.distribuidos.objetonegociomoodlepadres.Padre;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceException;
import javax.persistence.TypedQuery;
import javax.swing.JOptionPane;

/**
 *
 * @author alexasoto
 */
public class PadresDAO implements IPadresDAO {

    IConexionBD conexion = new ConexionBD("moodlePadres");
    EntityManager em = conexion.getEM();
    
    @Override
    public Padre consultaPadre(Long id) {
        try {
            //Busca el id en la clase Cliente
            return em.find(Padre.class, id);
        } catch (PersistenceException ex) {
            JOptionPane.showMessageDialog(null, "Error al consultar al padre");
            return null;
        }
    }

    @Override
    public List<Padre> consultarLista() {
        try {
            TypedQuery<Padre> query = em.createQuery("SELECT p FROM Padre p", Padre.class);
        return query.getResultList();
        } catch (PersistenceException ex) {
            JOptionPane.showMessageDialog(null, "No hay padres registrados");
            em.getTransaction().rollback();
        }
        return null;
    }

    @Override
    public List<Alumno> consultarListaAlumnos(Padre padre) {
        TypedQuery<Alumno> query = em.createQuery("SELECT a FROM Alumno a WHERE a.padre = :padre", Alumno.class);
        query.setParameter("padre", padre);
        return query.getResultList();
    }
    
    public List<Alumno> consultarListaAlumnos(Long idPadre) {
        TypedQuery<Alumno> query = em.createQuery("SELECT a FROM Alumno a WHERE a.padre.id = :idPadre", Alumno.class);
        query.setParameter("idPadre", idPadre);
        return query.getResultList();
    }
    
}

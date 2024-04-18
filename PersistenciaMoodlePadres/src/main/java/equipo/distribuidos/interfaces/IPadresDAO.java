package equipo.distribuidos.interfaces;

import equipo.distribuidos.objetonegociomoodlepadres.Alumno;
import equipo.distribuidos.objetonegociomoodlepadres.Padre;
import java.util.List;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */

/**
 *
 * @author alexasoto
 */
public interface IPadresDAO {
    public Padre consultaPadre(Long id);
    public List<Padre> consultarLista();
    public List<Alumno> consultarListaAlumnos(Padre padre);
    public List<Alumno> consultarListaAlumnos(Long idPadre);
}

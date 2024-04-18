/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package equipo.distribuidos.objetonegociomoodlepadres;

import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author COMPUTOCKS
 */
@Entity
@Table(name = "Curso")
public class Curso implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_moodle", nullable = false)
    private Long id_moodle;

    @Column(name = "id_maestro", nullable = false)
    private Long id_maestro;

    @Column(name = "nombreCurso", nullable = false, length = 100)
    private String nombreCurso;

    @Column(name = "nombreMaestro", nullable = false, length = 100)
    private String nombreMaestro;
    
       
   @ManyToMany(mappedBy = "cursos")
    private List<Alumno> alumnos;

    public Curso() {
    }

    public Curso(Long id_moodle, Long id_maestro, String nombreCurso, String nombreMaestro, List<Alumno> cursosAlumno) {
        this.id_moodle = id_moodle;
        this.id_maestro = id_maestro;
        this.nombreCurso = nombreCurso;
        this.nombreMaestro = nombreMaestro;
        this.alumnos = cursosAlumno;
    }

    public Curso(Long id, Long id_moodle, Long id_maestro, String nombreCurso, String nombreMaestro, List<Alumno> cursosAlumno) {
        this.id = id;
        this.id_moodle = id_moodle;
        this.id_maestro = id_maestro;
        this.nombreCurso = nombreCurso;
        this.nombreMaestro = nombreMaestro;
        this.alumnos = cursosAlumno;
    }
    

    public Long getId() {
        return id;
    }

    public List<Alumno> getCursosAlumno() {
        return alumnos;
    }

    public void setCursosAlumno(List<Alumno> cursosAlumno) {
        this.alumnos = cursosAlumno;
    }
    
    

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId_moodle() {
        return id_moodle;
    }

    public void setId_moodle(Long id_moodle) {
        this.id_moodle = id_moodle;
    }

    public Long getId_maestro() {
        return id_maestro;
    }

    public void setId_maestro(Long id_maestro) {
        this.id_maestro = id_maestro;
    }

    public String getNombreCurso() {
        return nombreCurso;
    }

    public void setNombreCurso(String nombreCurso) {
        this.nombreCurso = nombreCurso;
    }

    public String getNombreMaestro() {
        return nombreMaestro;
    }

    public void setNombreMaestro(String nombreMaestro) {
        this.nombreMaestro = nombreMaestro;
    }

    @Override
    public String toString() {
        return "Curso{" + "id=" + id + ", id_moodle=" + id_moodle + ", id_maestro=" + id_maestro + ", nombreCurso=" + nombreCurso + ", nombreMaestro=" + nombreMaestro + ", alumnos=" + alumnos + '}';
    }
    
    

}

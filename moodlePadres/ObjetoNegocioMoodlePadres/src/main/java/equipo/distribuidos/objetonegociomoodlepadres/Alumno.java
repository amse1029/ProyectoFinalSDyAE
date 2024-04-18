/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package equipo.distribuidos.objetonegociomoodlepadres;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author COMPUTOCKS
 */
@Entity
@Table(name = "Alumno")
public class Alumno implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "password", nullable = false, length = 100)
    private String password;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "id_moodle", nullable = false)
    private Long id_moodle;

    @ManyToMany
    @JoinTable(
        name = "alumno_curso",
        joinColumns = @JoinColumn(name = "alumno_id"),
        inverseJoinColumns = @JoinColumn(name = "curso_id")
    )
    private List<Curso> cursos;

    @ManyToOne
    @JoinColumn(name = "padre_id")
    private Padre padre;

    public Alumno() {
    }

    public Alumno(Long id, String email, String password, String nombre, Long id_moodle, List<Curso> alumnoCursos, Padre padre) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.nombre = nombre;
        this.id_moodle = id_moodle;
        this.cursos = alumnoCursos;
        this.padre = padre;
    }

    public Alumno(String email, String password, String nombre, Long id_moodle, List<Curso> alumnoCursos, Padre padre) {
        this.email = email;
        this.password = password;
        this.nombre = nombre;
        this.id_moodle = id_moodle;
        this.cursos = alumnoCursos;
        this.padre = padre;
    }

    
    public Padre getPadre() {
        return padre;
    }

    public void setPadre(Padre padre) {
        this.padre = padre;
    }

    public List<Curso> getAlumnoCursos() {
        return cursos;
    }

    public void setAlumnoCursos(List<Curso> alumnoCursos) {
        this.cursos = alumnoCursos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Long getId_moodle() {
        return id_moodle;
    }

    public void setId_moodle(Long id_moodle) {
        this.id_moodle = id_moodle;
    }

    @Override
    public String toString() {
        return "Alumno{" + "id=" + id + ", email=" + email + ", password=" + password + ", nombre=" + nombre + ", id_moodle=" + id_moodle + ", cursos=" + cursos + ", padre=" + padre + '}';
    }

}

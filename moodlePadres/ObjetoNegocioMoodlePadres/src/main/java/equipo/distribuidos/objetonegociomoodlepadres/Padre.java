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
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author COMPUTOCKS
 */
@Entity
@Table(name = "Padre")
public class Padre implements Serializable {

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

    @OneToMany(mappedBy = "Padre", cascade = CascadeType.ALL)
    private List<Alumno> alumnos;

    public Padre() {
    }

    public Padre(Long id, String email, String password, String nombre, List<Alumno> alumnoC) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.nombre = nombre;
        this.alumnos = alumnoC;
    }

    public Padre(String email, String password, String nombre, List<Alumno> alumnoC) {
        this.email = email;
        this.password = password;
        this.nombre = nombre;
        this.alumnos = alumnoC;
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

    public List<Alumno> getAlumnoC() {
        return alumnos;
    }

    public void setAlumnoC(List<Alumno> alumnoC) {
        this.alumnos = alumnoC;
    }

    @Override
    public String toString() {
        return "Padre{" + "id=" + id + ", email=" + email + ", password=" + password + ", nombre=" + nombre + ", alumnos=" + alumnos + '}';
    }
    
    
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.prueba_1_ce;

import Negocio.FabricaFachada;
import Negocio.FachadaNegocio;

/**
 *
 * @author DELL
 */
public class Prueba_1_CE {

    public static void main(String[] args) {
        System.out.println("Hola esta es la prueba de control escolar");
        //obtener fachada negocio
        FachadaNegocio fachadaNegocio = FabricaFachada.getFachadaNegocio();

    }
}

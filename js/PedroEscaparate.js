console.log("estoy en PedroEscaparate.js");
let products = []
import {mostrarProductos} from './cargaProductos.js';
//import { setupNavLinks  } from 'js/nicolasFiltrado.js';
//import { filterProducts } from 'js//nicolasFiltrado.js';
 

document.addEventListener("DOMContentLoaded", () => {
    console.log("estoy en PedroEscaparate.js");
    fetch("json/productos.json")  // Cargar el archivo JSON
        .then(response => response.json())  // Convertir a objeto JS
        .then(productos => mostrarProductos(productos))  // Procesar datos
        .catch(error => console.error("Error al cargar productos:", error));

        //setupNavLinks();
});


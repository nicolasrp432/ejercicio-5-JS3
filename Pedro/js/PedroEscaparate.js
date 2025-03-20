let products = []
import {mostrarProductos} from '/Pedro/js/cargaProductos.js';
import { setupNavLinks  } from '/Pedro/js/nicolasFiltrado.js';
import { filterProducts } from '/Pedro/js//nicolasFiltrado.js';


document.addEventListener("DOMContentLoaded", () => {
    fetch("/Pedro/json/productos.json")  // Cargar el archivo JSON
        .then(response => response.json())  // Convertir a objeto JS
        .then(productos => mostrarProductos(productos))  // Procesar datos
        .catch(error => console.error("Error al cargar productos:", error));

        setupNavLinks();
});


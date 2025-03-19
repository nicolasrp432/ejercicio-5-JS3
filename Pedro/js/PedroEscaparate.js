let products = []
import {mostrarProductos} from '/Pedro/js/cargaProductos.js';

document.addEventListener("DOMContentLoaded", () => {
    console.error("estoy en cargaProductos.js");
    fetch("/Pedro/json/productos.json")  // Cargar el archivo JSON
        .then(response => response.json())  // Convertir a objeto JS
        .then(productos => mostrarProductos(productos))  // Procesar datos
        .catch(error => console.error("Error al cargar productos:", error));
});


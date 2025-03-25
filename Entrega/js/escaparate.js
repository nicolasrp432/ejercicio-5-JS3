export let productos = []
import {mostrarProductos, generarMenu} from './cargaProductos.js';
import { setupNavLinks  } from './Filtrado.js';

document.addEventListener("DOMContentLoaded", () => {
    fetch("./json/productos.json")  // Cargar el archivo JSON desde la carpeta raíz
        .then(response => response.json())  // Convertir a objeto JS
        .then(data => {
            productos.length = 0;  // Vaciar el array sin cambiar la referencia
            productos.push(...data);  // Asignar los datos a la variable productos
            generarMenu(productos);  // Procesar datos
            mostrarProductos(productos);  // Procesar datos
            setupNavLinks();
        })
        .catch(error => console.error("Error al cargar productos:", error));  
});
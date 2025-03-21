export let productos = []
import {mostrarProductos, generarMenu} from '/Entrega/js/cargaProductos.js';
import { setupNavLinks  } from '/Entrega/js/nicolasFiltrado.js';

document.addEventListener("DOMContentLoaded", () => {
    console.log("estoy en PedroEscaparate.js");
    fetch("/Entrega/json/productos.json")  // Cargar el archivo JSON desde la carpeta raíz
        .then(response => response.json())  // Convertir a objeto JS
        .then(data => {
            productos.length = 0;  // Vaciar el array sin cambiar la referencia
            productos.push(...data);  // Asignar los datos a la variable productos
            //console.log("Productos cargados:", productos);  // Verificar los datos cargados
            generarMenu(productos);  // Procesar datos
            mostrarProductos(productos);  // Procesar datos
            setupNavLinks();
            //console.log("Después de mostrarProductos:", productos);  // Verificar que productos mantiene su valor
        })
        .catch(error => console.error("Error al cargar productos:", error));  
});
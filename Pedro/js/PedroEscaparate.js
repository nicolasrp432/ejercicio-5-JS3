export let productos = []
import {mostrarProductos} from '/Pedro/js/cargaProductos.js';
import { setupNavLinks  } from '/Pedro/js/nicolasFiltrado.js';


/*
document.addEventListener("DOMContentLoaded", () => {
    fetch("/Pedro/json/productos.json")  // Cargar el archivo JSON
        .then(response => response.json())  // Convertir a objeto JS
        .then(productos => mostrarProductos(productos))  // Procesar datos
        .catch(error => console.error("Error al cargar productos:", error));

        setupNavLinks();

        if (productos.length === 0) {
            //console.log("El array productos está vacío.");
            //return;
        } else {
            //console.log("El array productos tiene " + productos.length + " elementos.");
        }
});
*/
document.addEventListener("DOMContentLoaded", () => {
    fetch("/Pedro/json/productos.json")  // Cargar el archivo JSON
        .then(response => response.json())  // Convertir a objeto JS
        .then(data => {
            productos.length = 0;  // Vaciar el array sin cambiar la referencia
            productos.push(...data);  // Asignar los datos a la variable productos
            //console.log("Productos cargados:", productos);  // Verificar los datos cargados
            mostrarProductos(productos);  // Procesar datos
            //console.log("Después de mostrarProductos:", productos);  // Verificar que productos mantiene su valor
        })
        .catch(error => console.error("Error al cargar productos:", error));


        


    setupNavLinks();

    
});
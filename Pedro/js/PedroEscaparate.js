export let productos = []
import {mostrarProductos} from '/Pedro/js/cargaProductos.js';
import {generarMenu} from '/Pedro/js/cargaProductos.js';
import { setupNavLinks  } from '/Pedro/js/nicolasFiltrado.js';
import { obtenerJsonCompleto } from './bbddFunciones.js';


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
    /*
    fetch("/Pedro/json/productos.json")  // Cargar el archivo JSON
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
    Este codigo comentado es la carga original del JSON original, el codigo 
    de debajo es la carga desde la BBDD de Firebase*/
        obtenerJsonCompleto()
        .then((jsonString) => {
    
            if (jsonString) {
        
              try {
        
                productos = JSON.parse(jsonString); // Convierte la cadena JSON a un objeto
        
                // Ahora 'productos' debería ser un array de objetos
                generarMenu(productos);
                setupNavLinks();
                mostrarProductos(productos); // Llama a tu función mostrarProductos
        
              } catch (error) {
        
                console.error("Error al analizar la cadena JSON:", error);
        
              }
        
            } else {
        
              console.log("No se pudo obtener el JSON de la colección.");
        

            }
    
        });
      
  
  
      
  
      
  });
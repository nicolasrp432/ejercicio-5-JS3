export let productos = []
import {mostrarProductos, generarMenu} from './cargaProductos.js';
import { setupNavLinks  } from './Filtrado.js';
import { obtenerJsonCompleto } from './bbddFunciones.js';

/* Codigo de cuando se cargaba desde el JSON
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
*/

document.addEventListener("DOMContentLoaded", () => {
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
              console.error("No se pudo obtener el JSON de la colección.");       

            }    
        });
  });
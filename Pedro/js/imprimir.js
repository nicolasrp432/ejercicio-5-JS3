
import { carrito } from './vistaCarrito.js';
import { actualizarStockComprados } from './vistaCarrito.js';

document.getElementById('btn-imprimir').addEventListener('click', function () {
         // Abre el cuadro de diálogo de impresión
        console.log("Imprimiendo carrito:", carrito);
        if (carrito.items.length > 0) {
            alert('¡Gracias por tu compra!');
            actualizarStockComprados();
            window.print();
            console.log("Imprimiendo carrito:", carrito);
            carrito.items = [];
            console.log("Imprimiendo llamar a guardarCarrito:");
            carrito.guardarCarrito();
            console.log("Imprimiendo llamar a mostrarCarrito:");
            mostrarCarrito();
        }
    });





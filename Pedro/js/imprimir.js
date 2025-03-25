
import { carrito } from './vistaCarrito.js';
import { actualizarStockComprados } from './vistaCarrito.js';

document.getElementById('btn-imprimir').addEventListener('click', function () {
        window.print(); // Abre el cuadro de diálogo de impresión
        console.log("Imprimiendo carrito:", carrito);
        if (carrito.items.length > 0) {
            actualizarStockComprados();
            alert('¡Gracias por tu compra!');
            carrito.items = [];
            carrito.guardarCarrito();
            mostrarCarrito();
        }
    });





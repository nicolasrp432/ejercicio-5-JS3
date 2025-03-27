import { carrito } from './vistaCarrito.js';
import { actualizarStockComprados } from './vistaCarrito.js';
import { mostrarCarrito } from './vistaCarrito.js';

document.getElementById('btn-imprimir').addEventListener('click', async function () {
         // Abre el cuadro de diálogo de impresión
        if (carrito.items.length > 0) {
            alert('¡Gracias por tu compra! - Aquí tienes tu factura de compra.');
            // Esperar a que actualizarStockComprados termine
            try {
                await actualizarStockComprados();
                console.log("Stock actualizado correctamente.");
            } catch (error) {
                console.error("Error al actualizar el stock:", error);
            }
            window.print();
            carrito.items = [];
            carrito.guardarCarrito();
            mostrarCarrito();
            
        }
    });
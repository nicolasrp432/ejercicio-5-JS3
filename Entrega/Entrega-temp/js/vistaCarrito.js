import { updateStockBBDD } from './bbddFunciones.js';
import { Carrito } from './Carrito.js';
import { mostrarItem } from './itemCarrito.js';

export const carrito = new Carrito();
carrito.cargarCarrito();

export function mostrarCarrito() {
    const contenedor = document.getElementById('items-carrito');
    contenedor.innerHTML = '';    
    carrito.items.forEach(item => {
        const itemHTML = mostrarItem(item);
        contenedor.innerHTML += itemHTML;
    });

    document.getElementById('total-carrito').textContent = 
        carrito.obtenerTotal().toFixed(2) + '€';
}

export async function actualizarStockComprados() {
    /* Vamos a intentar actualizar el stock en la BBDD  */
    carrito.items.forEach(async item => {                    
            try {
                await updateStockBBDD(item.producto.id, item.producto.stock - item.cantidad);
              } catch (error) {
                console.error("Failed to update stock:", error);
            
              }
            
        });
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();

    document.getElementById('items-carrito').addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-eliminar')) {
            const productoId = parseInt(e.target.dataset.id);
            const cantidad = parseInt(e.target.parentElement.querySelector('.cantidad-input').value);
            carrito.eliminarCantidadProducto(productoId, cantidad);
            mostrarCarrito();
        }
    });

    /* Este boton ya no existe, este proceso pasa al boton Imprimir Recibo
    document.getElementById('btn-finalizar').addEventListener('click', () => {
        if (carrito.items.length > 0) {
            alert('¡Gracias por tu compra!');
            carrito.items = [];
            carrito.guardarCarrito();
            mostrarCarrito();
        }
    });*/
});
import { updateStockBBDD } from './bbddFunciones.js';
import { Carrito } from './Carrito.js';
import { mostrarItem } from './itemCarrito.js';

export const carrito = new Carrito();
carrito.cargarCarrito();

function mostrarCarrito() {
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
                console.log("Updating stock for item:", item);
                await updateStockBBDD(item.producto.id, item.producto.stock - item.cantidad);
                //console.log("Stock updated successfully!");
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
            carrito.eliminarProducto(productoId);
            mostrarCarrito();
        }
    });

});
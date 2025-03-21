import { Carrito } from './Carrito.js';
import { mostrarItem } from './itemCarrito.js';

const carrito = new Carrito();
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

document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();

    document.getElementById('items-carrito').addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-eliminar')) {
            const productoId = parseInt(e.target.dataset.id);
            carrito.eliminarProducto(productoId);
            mostrarCarrito();
        }
    });

    document.getElementById('btn-finalizar').addEventListener('click', () => {
        if (carrito.items.length > 0) {
            alert('¡Gracias por tu compra!');
            carrito.items = [];
            carrito.guardarCarrito();
            mostrarCarrito();
        }
    });
});
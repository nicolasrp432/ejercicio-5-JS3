import { Carrito } from './Carrito.js';

const carrito = new Carrito();
carrito.cargarCarrito();

function mostrarCarrito() {
    const contenedor = document.getElementById('items-carrito');
    contenedor.innerHTML = '';
    
    carrito.items.forEach(item => {
        const itemHTML = `
            <div class="item-carrito">
                <img src="/Pedro/img/imgProductos/${item.producto.imagen}" alt="${item.producto.nombre}">
                <div class="item-detalles">
                    <h3>${item.producto.nombre}</h3>
                    <p>Precio: ${item.producto.precio.toFixed(2)}€</p>
                    <p>Cantidad: ${item.cantidad}</p>
                    <p>Subtotal: ${(item.producto.precio * item.cantidad).toFixed(2)}€</p>
                    <button class="btn-eliminar" data-id="${item.producto.id}">Eliminar</button>
                </div>
            </div>
        `;
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
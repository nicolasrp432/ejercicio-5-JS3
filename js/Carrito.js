export class Carrito {
    constructor() {
        this.items = [];
    }

    agregarProducto(producto, cantidad = 1) {
        const itemExistente = this.items.find(item => item.producto.id === producto.id);
        
        if (itemExistente) {
            itemExistente.cantidad += cantidad;
        } else {
            this.items.push({ producto, cantidad });
        }
        this.guardarCarrito();
        this.actualizarBadge();
    }

    eliminarProducto(productoId) {
        this.items = this.items.filter(item => item.producto.id !== productoId);
        this.guardarCarrito();
        //this.actualizarBadge();
    }

    obtenerTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.producto.precio * item.cantidad);
        }, 0);
    }

    guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(this.items));
    }

    cargarCarrito() {
        const carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
            this.items = JSON.parse(carritoGuardado);
        }
    }

    actualizarBadge() {
        const badge = document.getElementById('carrito-badge');
        const totalItems = this.items.reduce((total, item) => total + item.cantidad, 0);
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'block' : 'none';
    }
}
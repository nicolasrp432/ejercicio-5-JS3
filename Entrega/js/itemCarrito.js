export function mostrarItem(item) {
    const itemHTML = `
            <div class="item-carrito">
                <img src="/Pedro/img/imgProductos/${item.producto.imagen}" alt="${item.producto.nombre}">
                <div class="item-detalles">
                    <div class="detalles-principales">
                        <h3>${item.producto.nombre}</h3>
                        <p>Precio: ${item.producto.precio.toFixed(2)}€</p>
                        <p>Cantidad: ${item.cantidad}</p>
                        <p>Subtotal: ${(item.producto.precio * item.cantidad).toFixed(2)}€</p>
                        <div class="product-actions">
                            <input type="number" min="1" max="${item.cantidad}" value="1" class="cantidad-input">
                            <button class="btn-eliminar" data-id="${item.producto.id}">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    return itemHTML;
}
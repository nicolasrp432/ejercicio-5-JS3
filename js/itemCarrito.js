export function mostrarItem(item) {
    const itemHTML = `
            <div class="item-carrito">
                <img src="./img/imgProductos/${item.producto.imagen}" alt="${item.producto.nombre}">
                <div class="item-detalles">
                    <div class="detalles-principales">
                        <h3>${item.producto.nombre}</h3>
                        <p>Precio: ${item.producto.precio.toFixed(2)}€</p>
                        <p>Cantidad: ${item.cantidad}</p>
                        <p>Subtotal: ${(item.producto.precio * item.cantidad).toFixed(2)}€</p>
                        <button class="btn-eliminar" data-id="${item.producto.id}">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
    return itemHTML;
}


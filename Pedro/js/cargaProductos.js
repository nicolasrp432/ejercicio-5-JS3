/*let products = []

document.addEventListener("DOMContentLoaded", () => {
    console.error("estoy en cargaProductos.js");
    fetch("/Pedro/json/productos.json")  // Cargar el archivo JSON
        .then(response => response.json())  // Convertir a objeto JS
        .then(productos => mostrarProductos(productos))  // Procesar datos
        .catch(error => console.error("Error al cargar productos:", error));
});
*/
export function mostrarProductos(productos) {
    const contenedor = document.getElementById("productosJSON");
    productos.forEach(producto => {
        // Crear el HTML de cada producto
        const productoHTML = `
            <article class="product-card">
                <figure>
                    <img src="/Pedro/img/imgProductos/${producto.imagen}" alt="${producto.nombre}">
                </figure>
                <h2>${producto.nombre}</h2>
                <p class="description">${producto.descripcion}</p>
                <p class="price">Precio: <strong>${producto.precio.toFixed(2)}€</strong></p>
                <p class="stock">Stock: <strong>${producto.stock}</strong></p>
            </article>
        `;

        // Insertar el producto en el contenedor
        contenedor.innerHTML += productoHTML;
    });
}

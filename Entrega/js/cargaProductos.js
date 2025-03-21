//let products = []

// document.addEventListener("DOMContentLoaded", () => {
//     console.error("estoy en cargaProductos.js");
//     fetch("/Entrega/json/productos.json")  // Ruta actualizada
//         .then(response => response.json())
//         .then(productos => mostrarProductos(productos))
//         .catch(error => console.error("Error al cargar productos:", error));
// });

export function mostrarProductos(productos) {
    const contenedor = document.getElementById("productosJSON");
    contenedor.innerHTML = "";
    productos.forEach(producto => {
        const productoHTML = `
            <article class="product-card">
                <figure>
                    <img src="/Entrega/img/imgProductos/${producto.imagen}" alt="${producto.nombre}">
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

export function generarMenu(productos) {
    const categorias = {};

    // Agrupar productos por categorías y subcategorías
    productos.forEach(producto => {
        if (!categorias[producto.categoria]) {
            categorias[producto.categoria] = new Set();
        }
        // Dividir la subcategoría en palabras y añadir cada palabra como una subcategoría
        const subcategorias = producto.subcategoria.split(' ');
        subcategorias.forEach(subcategoria => {
            categorias[producto.categoria].add(subcategoria);
        });
    });

    // Crear el HTML del menú
    const nav = document.getElementById('nav');
    const ul = document.createElement('ul');

    for (const categoria in categorias) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = categoria;
        a.dataset.category = categoria;
        li.appendChild(a);

        const subUl = document.createElement('ul');
        subUl.classList.add('subcategoria');

        categorias[categoria].forEach(subcategoria => {
            if (subcategoria) {
                const subLi = document.createElement('li');
                const subA = document.createElement('a');
                subA.href = '#';
                subA.textContent = subcategoria;
                subA.dataset.category = subcategoria;
                subLi.appendChild(subA);
                subUl.appendChild(subLi);
            }
        });

        li.appendChild(subUl);
        ul.appendChild(li);
    }

    nav.appendChild(ul);
}
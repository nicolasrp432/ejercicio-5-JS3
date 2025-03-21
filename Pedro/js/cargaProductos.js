import { Carrito } from './Carrito.js';

const carrito = new Carrito();
carrito.cargarCarrito();

export function mostrarProductos(productos) {
    const contenedor = document.getElementById("productosJSON");
    contenedor.innerHTML = '';
    productos.forEach(producto => {
        const productoHTML = `
            <article class="product-card">
                <figure>
                    <img src="/Pedro/img/imgProductos/${producto.imagen}" alt="${producto.nombre}">
                </figure>
                <h2>${producto.nombre}</h2>
                <p class="description">${producto.descripcion}</p>
                <p class="price">Precio: <strong>${producto.precio.toFixed(2)}€</strong></p>
                <p class="stock">Stock: <strong>${producto.stock}</strong></p>
                <div class="product-actions">
                    <input type="number" min="1" max="${producto.stock}" value="1" class="cantidad-input">
                    <button class="btn-comprar" data-id="${producto.id}">
                        Añadir al carrito
                    </button>
                </div>
            </article>
        `;

        contenedor.innerHTML += productoHTML;
    });

    // Añadir eventos a los botones de compra
    document.querySelectorAll('.btn-comprar').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const productoId = parseInt(e.target.dataset.id);
            const cantidad = parseInt(e.target.parentElement.querySelector('.cantidad-input').value);
            const producto = productos.find(p => p.id === productoId);
            
            if (producto && cantidad > 0 && cantidad <= producto.stock) {
                carrito.agregarProducto(producto, cantidad);
                mostrarMensaje('Producto añadido al carrito');
            }
        });
    });
    carrito.actualizarBadge();
}

function mostrarMensaje(mensaje) {
    const mensajeElement = document.createElement('div');
    mensajeElement.className = 'mensaje-flotante';
    mensajeElement.textContent = mensaje;
    document.body.appendChild(mensajeElement);

    setTimeout(() => {
        mensajeElement.remove();
    }, 2000);
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

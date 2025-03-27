import { Carrito } from './Carrito.js';

const carrito = new Carrito();
carrito.cargarCarrito();

const UNSPLASH_ACCESS_KEY = 'TU_API_KEY_AQUI'; // Reemplaza con tu API key

async function obtenerImagenAleatoria(query) {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&client_id=${VRRXLbCWvoI6bNUtcamWooOIZy3_BC3TsC9od1TDiUc}`);
        if (!response.ok) throw new Error('Error en la respuesta de Unsplash');
        
        const data = await response.json();
        return data.urls.small;
    } catch (error) {
        console.error('Error al obtener imagen:', error);
        return 'img/imgProductos/default.jpg'; // Asegúrate de tener una imagen por defecto
    }
}

export async function mostrarProductos(productos) {
    const contenedor = document.getElementById("productosJSON");
    contenedor.innerHTML = '';
    
    for (const producto of productos) {
        let imagenSrc = producto.imagen ? 
            `img/imgProductos/${producto.imagen}` : 
            await obtenerImagenAleatoria(producto.nombre);

        const productoHTML = `
            <article class="product-card">
                <figure>
                    <img src="${imagenSrc}" alt="${producto.nombre}">
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
        
    }
    // Añadir eventos a los botones de compra
    document.querySelectorAll('.btn-comprar').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const productoId = parseInt(e.target.dataset.id);
            const cantidad = parseInt(e.target.parentElement.querySelector('.cantidad-input').value);
            const producto = productos.find(p => p.id == productoId);
            
            if (producto && cantidad > 0 && cantidad <= producto.stock) {
                carrito.agregarProducto(producto, cantidad);
                mostrarMensaje('Producto añadido al carrito');
                actualizarMiniCarrito(); // Añadir esta línea
            }
        });
    });
    carrito.actualizarBadge();
    actualizarMiniCarrito(); // Añadir esta línea
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

function actualizarMiniCarrito() {
    const contenedor = document.getElementById('carrito-items-miniatura');
    const total = document.getElementById('carrito-miniatura-total');
    
    if (!contenedor) return;
    
    if (carrito.items.length === 0) {
        contenedor.innerHTML = '<div class="carrito-vacio">El carrito está vacío</div>';
        total.textContent = '0.00€';
        return;
    }

    contenedor.innerHTML = '';
    carrito.items.forEach(item => {
        contenedor.innerHTML += `
            <div class="carrito-item">
                <img src="img/imgProductos/${item.producto.imagen}" alt="${item.producto.nombre}">
                <div class="carrito-item-info">
                    <p class="carrito-item-nombre">${item.producto.nombre}</p>
                    <p class="carrito-item-precio">${item.cantidad}x ${item.producto.precio.toFixed(2)}€</p>
                </div>
            </div>
        `;
    });
    
    total.textContent = carrito.obtenerTotal().toFixed(2) + '€';
}

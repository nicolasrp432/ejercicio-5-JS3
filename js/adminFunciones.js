const db = firebase.firestore();
const productosRef = db.collection("productos");

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();

    document.getElementById("btnAgregar").addEventListener("click", () => {
        agregarProducto();
    });
});

async function cargarProductos() {
    const tablaBody = document.getElementById("tablaProductos").querySelector("tbody");
    tablaBody.innerHTML = ""; // Limpiar la tabla

    try {
        const snapshot = await productosRef.get();
        snapshot.forEach(doc => {
            const producto = doc.data();
            const fila = `
                <tr data-id="${doc.id}">
                    <!-- Ocultar la columna ID -->
                    <td style="display: none;" contenteditable="true">${producto.id}</td>
                    <td contenteditable="true">${producto.nombre}</td>
                    <td contenteditable="true">${producto.descripcion}</td>
                    <td contenteditable="true">${producto.imagen}</td>
                    <td contenteditable="true">${producto.precio}</td>
                    <td contenteditable="true">${producto.stock}</td>
                    <td contenteditable="true">${producto.categoria}</td>
                    <td contenteditable="true">${producto.subcategoria}</td>
                    <td>
                        <button class="btnGuardar">Guardar</button>
                        <button class="btnEliminar">Eliminar</button>
                    </td>
                </tr>
            `;
            tablaBody.innerHTML += fila;
        });

        // Agregar eventos a los botones
        document.querySelectorAll(".btnGuardar").forEach(btn => {
            btn.addEventListener("click", guardarProducto);
        });

        document.querySelectorAll(".btnEliminar").forEach(btn => {
            btn.addEventListener("click", eliminarProducto);
        });
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

async function guardarProducto(e) {
    const fila = e.target.closest("tr");
    const idDoc = fila.dataset.id;

    const productoActualizado = {
        id: fila.children[0].textContent.trim(),
        nombre: fila.children[1].textContent.trim(),
        descripcion: fila.children[2].textContent.trim(),
        imagen: fila.children[3].textContent.trim(),
        precio: parseFloat(fila.children[4].textContent.trim()),
        stock: parseInt(fila.children[5].textContent.trim()),
        categoria: fila.children[6].textContent.trim(),
        subcategoria: fila.children[7].textContent.trim(),
    };

    // Validar que el ID sea numérico
    if (!/^\d+$/.test(productoActualizado.id)) {
        alert("El ID debe contener solo números.");
        return;
    }

    try {
        if (productoActualizado.id !== idDoc) {
            // Si la ID cambió, eliminar el documento antiguo y crear uno nuevo
            await productosRef.doc(idDoc).delete();
            await productosRef.doc(productoActualizado.id).set(productoActualizado);
            fila.dataset.id = productoActualizado.id; // Actualizar el atributo data-id
        } else {
            // Si la ID no cambió, simplemente actualizar el documento
            await productosRef.doc(idDoc).update(productoActualizado);
        }
        alert("Producto actualizado correctamente");
    } catch (error) {
        console.error("Error al actualizar producto:", error);
    }
}

async function eliminarProducto(e) {
    const fila = e.target.closest("tr");
    const idDoc = fila.dataset.id;

    try {
        await productosRef.doc(idDoc).delete();
        fila.remove();
        alert("Producto eliminado correctamente");
    } catch (error) {
        console.error("Error al eliminar producto:", error);
    }
}

async function agregarProducto() {
    const nuevoProducto = {
        id: Math.floor(Math.random() * 1000000000).toString(), // Generar un ID numérico aleatorio
        nombre: "Nuevo Producto",
        descripcion: "Descripción del producto",
        imagen: "ruta/imagen.jpg",
        precio: 0,
        stock: 0,
        categoria: "Categoría",
        subcategoria: "Subcategoría",
    };

    try {
        await productosRef.doc(nuevoProducto.id).set(nuevoProducto);
        alert("Producto agregado correctamente");
        cargarProductos(); // Recargar la tabla
    } catch (error) {
        console.error("Error al agregar producto:", error);
    }
}

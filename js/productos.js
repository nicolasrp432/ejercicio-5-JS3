/* Comentario para sincronizar la rama :(( */
document.addEventListener("DOMContentLoaded", function() {
    fetch("productos.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("productos").innerHTML = data;
        })
        .catch(error => console.error("Error cargando el HTML de productos:", error));
});
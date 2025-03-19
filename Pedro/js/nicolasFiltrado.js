// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar todos los productos al cargar la página
    displayProducts(products);
    
    // Configurar los eventos de los filtros
    setupFilterEvents();
    
    // Configurar el evento de cierre del modal
    setupModalClose();
});

// Función para mostrar los productos
function displayProducts(productsToShow) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    
    if (productsToShow.length === 0) {
        productsContainer.innerHTML = '<div class="no-products">No se encontraron productos que coincidan con los criterios de búsqueda.</div>';
        return;
    }
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('article');
        productCard.className = 'product-card';
        productCard.dataset.id = product.id;
        
        let stockClass = '';
        let stockText = '';
        
        if (product.stock === 0) {
            stockClass = 'out';
            stockText = 'Agotado';
        } else if (product.stock < 5) {
            stockClass = 'low';
            stockText = `Quedan ${product.stock}`;
        } else {
            stockText = 'Disponible';
        }
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-description">${product.description}</div>
                <div class="product-meta">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <span class="product-stock ${stockClass}">${stockText}</span>
                </div>
            </div>
        `;
        
        productCard.addEventListener('click', () => openModal(product));
        productsContainer.appendChild(productCard);
    });
}

// Función para formatear el precio
function formatPrice(price) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}

// Función para abrir el modal con detalles del producto
function openModal(product) {
    const modal = document.getElementById('productModal');
    const modalImage = document.getElementById('modal-image');
    const modalName = document.getElementById('modal-name');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
    const modalStock = document.getElementById('modal-stock');
    
    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalName.textContent = product.name;
    modalDescription.textContent = product.description;
    modalPrice.textContent = formatPrice(product.price);
    
    let stockClass = '';
    let stockText = '';
    
    if (product.stock === 0) {
        stockClass = 'out';
        stockText = 'Agotado';
    } else if (product.stock < 5) {
        stockClass = 'low';
        stockText = `Quedan ${product.stock}`;
    } else {
        stockText = 'Disponible';
    }
    
    modalStock.className = `product-stock ${stockClass}`;
    modalStock.textContent = stockText;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Evitar scroll en el fondo
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll
}

// Configurar el evento de cierre del modal
function setupModalClose() {
    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', closeModal);
    
    // Cerrar el modal al hacer clic fuera del contenido
    const modal = document.getElementById('productModal');
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Cerrar el modal con la tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}

// Configurar los eventos de los filtros
function setupFilterEvents() {
    const searchInput = document.getElementById('search');
    const categorySelect = document.getElementById('category');
    const priceMinInput = document.getElementById('price-min');
    const priceMaxInput = document.getElementById('price-max');
    const stockSelect = document.getElementById('stock');
    
    // Crear un array de todos los elementos de filtro
    const filterElements = [searchInput, categorySelect, priceMinInput, priceMaxInput, stockSelect];
    
    // Añadir eventos de cambio a todos los elementos de filtro
    filterElements.forEach(element => {
        element.addEventListener('input', filterProducts);
        element.addEventListener('change', filterProducts);
    });
}

// Función para filtrar productos
function filterProducts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const category = document.getElementById('category').value;
    const priceMin = parseFloat(document.getElementById('price-min').value) || 0;
    const priceMax = parseFloat(document.getElementById('price-max').value) || Infinity;
    const stockFilter = document.getElementById('stock').value;
    
    const filteredProducts = products.filter(product => {
        // Filtro por término de búsqueda
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                            product.description.toLowerCase().includes(searchTerm);
        
        // Filtro por categoría
        const matchesCategory = category === '' || product.category === category;
        
        // Filtro por precio
        const matchesPrice = product.price >= priceMin && product.price <= priceMax;
        
        // Filtro por stock
        let matchesStock = true;
        if (stockFilter === 'in-stock') {
            matchesStock = product.stock >= 5;
        } else if (stockFilter === 'low-stock') {
            matchesStock = product.stock > 0 && product.stock < 5;
        } else if (stockFilter === 'out-of-stock') {
            matchesStock = product.stock === 0;
        }
        
        return matchesSearch && matchesCategory && matchesPrice && matchesStock;
    });
    
    displayProducts(filteredProducts);
}

function filterProducts(busqueda= "") {
    //const searchTerm = document.getElementById('search').value.toLowerCase();
    //const category = document.getElementById('category').value;
    //const priceMin = parseFloat(document.getElementById('price-min').value) || 0;
    //const priceMax = parseFloat(document.getElementById('price-max').value) || Infinity;
    //const stockFilter = document.getElementById('stock').value;
    
    const filteredProducts = products.filter(product => {
        // Filtro por término de búsqueda
        //const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
        //                    product.description.toLowerCase().includes(searchTerm);
        
        // Filtro por categoría
        const matchesCategory = category === '' || product.categoria === busqueda;
        
        // Filtro por precio
        //const matchesPrice = product.price >= priceMin && product.price <= priceMax;
        
        // Filtro por stock
        /*
        let matchesStock = true;
        if (stockFilter === 'in-stock') {
            matchesStock = product.stock >= 5;
        } else if (stockFilter === 'low-stock') {
            matchesStock = product.stock > 0 && product.stock < 5;
        } else if (stockFilter === 'out-of-stock') {
            matchesStock = product.stock === 0;
        }
        
        return matchesSearch && matchesCategory && matchesPrice && matchesStock;
        */
        return matchesCategory;
    });
    
    mostrarProductos(filteredProducts);
}

// Configurar los eventos de los enlaces del nav
function setupNavLinks() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const category = link.dataset.category;
            filterProducts(category);
        });
    });
}
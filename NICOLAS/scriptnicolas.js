// Datos de productos para la tienda JS3
const products = [
    // Categoría: Ordenadores
    {
        id: 1,
        name: "MacBook Pro 14 pulgadas",
        description: "Portátil Apple con chip M3 Pro, 16GB de RAM unificada, 512GB SSD y pantalla Liquid Retina XDR.",
        image: "/api/placeholder/400/300",
        price: 1999.99,
        stock: 12,
        category: "ordenadores"
    },
    {
        id: 2,
        name: "HP Pavilion Gaming",
        description: "Portátil gaming con procesador Intel Core i7, 16GB RAM, 1TB SSD, NVIDIA RTX 3060 y pantalla de 15.6 pulgadas 144Hz.",
        image: "/api/placeholder/400/300",
        price: 1299.99,
        stock: 8,
        category: "ordenadores"
    },
    {
        id: 3,
        name: "ASUS ROG Strix G16",
        description: "Portátil gaming con Intel Core i9, 32GB RAM, 2TB SSD, NVIDIA RTX 4080 y pantalla de 16 pulgadas 240Hz.",
        image: "/api/placeholder/400/300",
        price: 2499.99,
        stock: 3,
        category: "ordenadores"
    },
    {
        id: 4,
        name: "Lenovo ThinkPad X1 Carbon",
        description: "Ultrabook empresarial con Intel Core i7, 16GB RAM, 1TB SSD y pantalla de 14 pulgadas WQUXGA.",
        image: "/api/placeholder/400/300",
        price: 1799.99,
        stock: 6,
        category: "ordenadores"
    },
    
    // Categoría: Smartphones
    {
        id: 5,
        name: "iPhone 15 Pro Max",
        description: "Smartphone Apple con chip A17 Pro, cámara ProRAW de 48MP, pantalla Super Retina XDR de 6.7 pulgadas y hasta 1TB de almacenamiento.",
        image: "/api/placeholder/400/300",
        price: 1299.99,
        stock: 15,
        category: "smartphones"
    },
    {
        id: 6,
        name: "Samsung Galaxy S24 Ultra",
        description: "Smartphone Android con Snapdragon 8 Gen 3, cámara de 200MP, S Pen incluido, pantalla Dynamic AMOLED 2X de 6.8 pulgadas.",
        image: "/api/placeholder/400/300",
        price: 1399.99,
        stock: 10,
        category: "smartphones"
    },
    {
        id: 7,
        name: "Google Pixel 8 Pro",
        description: "Smartphone con Google Tensor G3, cámara con procesamiento de IA, pantalla OLED de 6.7 pulgadas y 7 años de actualizaciones.",
        image: "/api/placeholder/400/300",
        price: 999.99,
        stock: 4,
        category: "smartphones"
    },
    {
        id: 8,
        name: "Xiaomi 14 Ultra",
        description: "Smartphone con Snapdragon 8 Gen 3, cámara Leica de 1 pulgada, pantalla AMOLED de 6.7 pulgadas y carga rápida de 120W.",
        image: "/api/placeholder/400/300",
        price: 1199.99,
        stock: 0,
        category: "smartphones"
    },
    
    // Categoría: Consolas
    {
        id: 9,
        name: "PlayStation 5 Pro",
        description: "Consola de videojuegos Sony con ray tracing mejorado, 2TB SSD, GPU más potente y soporte para 8K.",
        image: "/api/placeholder/400/300",
        price: 699.99,
        stock: 2,
        category: "consolas"
    },
    {
        id: 10,
        name: "Xbox Series X",
        description: "Consola de videojuegos Microsoft con 12 teraflops de potencia, 1TB SSD, Quick Resume y Game Pass Ultimate.",
        image: "/api/placeholder/400/300",
        price: 499.99,
        stock: 5,
        category: "consolas"
    },
    {
        id: 11,
        name: "Nintendo Switch OLED",
        description: "Consola híbrida con pantalla OLED de 7 pulgadas, 64GB de almacenamiento y soporte para juegos en portátil y TV.",
        image: "/api/placeholder/400/300",
        price: 349.99,
        stock: 7,
        category: "consolas"
    },
    {
        id: 12,
        name: "Steam Deck",
        description: "Consola portátil con AMD APU, 16GB RAM, SSD de 512GB y compatible con miles de juegos de PC.",
        image: "/api/placeholder/400/300",
        price: 649.99,
        stock: 0,
        category: "consolas"
    }
];

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
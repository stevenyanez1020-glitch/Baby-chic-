// Carrito de compras
let cart = [];
let cartCount = 0;

// Elementos del DOM
const cartCountElement = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartIcon = document.querySelector('.cart-icon');

// Función para actualizar el contador del carrito
function updateCartCount() {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = cartCount;
}

// Función para añadir producto al carrito
function addToCart(productName, price) {
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }

    updateCartCount();
    showNotification(`${productName} añadido al carrito`);
}

// Función para mostrar notificación
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4cc9f0;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1001;
        transition: transform 0.3s ease;
        transform: translateX(0);
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remover notificación después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Event listeners para botones de añadir al carrito
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.getAttribute('data-product');
        const price = parseInt(this.getAttribute('data-price'));
        addToCart(productName, price);
    });
});

// Event listener para el ícono del carrito
cartIcon.addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
    } else {
        let cartSummary = 'Productos en tu carrito:\n\n';
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            cartSummary += `${item.name} x${item.quantity} - $${itemTotal.toLocaleString()}\n`;
            total += itemTotal;
        });

        cartSummary += `\nTotal: $${total.toLocaleString()}`;
        alert(cartSummary);
    }
});

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto de scroll en navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

// CTA button functionality
document.querySelector('.cta-button').addEventListener('click', function() {
    document.querySelector('#productos').scrollIntoView({
        behavior: 'smooth'
    });
});
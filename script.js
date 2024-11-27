const cartCount = document.getElementById('cart-count');
const cartIcon = document.querySelector('.cart-icon');
const cartItems = [];

// Lógica para agregar productos al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.dataset.name;
        const productPrice = parseFloat(productCard.dataset.price);
        const productImage = productCard.querySelector('img');

        // Añadir producto al carrito
        cartItems.push({ name: productName, price: productPrice });
        cartCount.textContent = cartItems.length;

        // Animación de vuelo al carrito
        flyToCart(productImage, cartIcon);
    });
});

// Función para animar el vuelo de la imagen al carrito
function flyToCart(imageElement, targetElement) {
    // Clonar la imagen del producto
    const clonedImage = imageElement.cloneNode(true);
    const rect = imageElement.getBoundingClientRect();

    // Estilo inicial del clon
    clonedImage.style.position = 'fixed';
    clonedImage.style.top = `${rect.top}px`;
    clonedImage.style.left = `${rect.left}px`;
    clonedImage.style.width = `${rect.width}px`;
    clonedImage.style.height = `${rect.height}px`;
    clonedImage.classList.add('fly-to-cart');

    // Añadir el clon al body
    document.body.appendChild(clonedImage);

    // Obtener la posición del ícono del carrito
    const targetRect = targetElement.getBoundingClientRect();

    // Animar hacia el carrito
    setTimeout(() => {
        clonedImage.style.transform = `translate(${targetRect.left - rect.left}px, ${targetRect.top - rect.top}px) scale(0.5)`;
        clonedImage.style.opacity = '0';
    }, 50);

    // Eliminar el clon después de la animación
    clonedImage.addEventListener('transitionend', () => {
        clonedImage.remove();
    });
}

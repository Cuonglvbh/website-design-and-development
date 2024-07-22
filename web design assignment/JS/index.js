document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const product = this.parentElement;
            const productId = product.getAttribute('data-id');
            const productName = product.querySelector('h2').innerText;
            const productPrice = parseFloat(product.getAttribute('data-price'));

            // Get existing cart from localStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if product already exists in cart
            const existingProductIndex = cart.findIndex(item => item.id === productId);
            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            // Save updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Notify user
            alert(`${productName} has been added to your cart.`);
        });
    });
});

// script.js

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });

    // Close the menu if user clicks outside of it
    document.addEventListener('click', function(event) {
        if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
            navLinks.classList.remove('show');
        }
    });
});

// script.js
document.querySelectorAll('.toggle-description').forEach(button => {
    button.addEventListener('click', () => {
        const descriptionContent = button.previousElementSibling; // Assuming the button is right after the description content
        const isExpanded = descriptionContent.classList.contains('expanded');
        
        if (isExpanded) {
            descriptionContent.classList.remove('expanded');
            button.textContent = 'Show More';
        } else {
            descriptionContent.classList.add('expanded');
            button.textContent = 'Show Less';
        }
    });
});

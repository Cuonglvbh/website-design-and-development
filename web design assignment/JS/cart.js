document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout');

    function updateCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        cartItemsContainer.innerHTML = '';

        let totalPrice = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <h2>${item.name}</h2>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Total: $${itemTotal.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="decrease" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase" data-id="${item.id}">+</button>
                </div>
                <button class="remove" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });

        totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
    }

    updateCart();

    cartItemsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove')) {
            const itemId = event.target.getAttribute('data-id');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart = cart.filter(item => item.id !== itemId);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        }
    });

    cartItemsContainer.addEventListener('click', function (event) {
        const button = event.target;
        if (button.classList.contains('increase') || button.classList.contains('decrease')) {
            const itemId = button.getAttribute('data-id');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const itemIndex = cart.findIndex(item => item.id === itemId);
            if (itemIndex > -1) {
                if (button.classList.contains('increase')) {
                    cart[itemIndex].quantity += 1;
                } else if (button.classList.contains('decrease') && cart[itemIndex].quantity > 1) {
                    cart[itemIndex].quantity -= 1;
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            }
        }
    });

    checkoutButton.addEventListener('click', function () {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if (!loggedInUser) {
            alert('You need to log in to proceed to checkout.');
            window.location.href = 'login.html';  // Redirect to login page
            return;
        }

        // Simulate payment process
        const paymentSuccessful = simulatePayment();
        if (paymentSuccessful) {
            alert('Payment successful! Thank you for your purchase.');
            localStorage.removeItem('cart');  // Clear the cart
            updateCart();  // Update the cart display
        } else {
            alert('Payment failed. Please try again.');
        }
    });

    function simulatePayment() {
        // Simulate a payment process. In real-world scenarios, integrate with a payment gateway.
        return true;  // Simulate successful payment
    }
});

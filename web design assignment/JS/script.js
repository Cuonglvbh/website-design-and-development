function getProducts() {
    return [
        { id: 1, name: 'Product 1', description: 'Description 1', price: 10 },
        { id: 2, name: 'Product 2', description: 'Description 2', price: 20 },
        // Add more products here
    ];
}

function addToCart(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart`);
}

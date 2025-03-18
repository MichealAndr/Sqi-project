

// Fetch products from the API
fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((data) => {
        const display = document.getElementById('display');

        data.forEach((product) => {
            const { id, image, title, category, price } = product;

            // Display each product
            display.innerHTML += `
                <div class="cards">
                    <img src="${image}" alt="${title}" width="80px">
                    <div class="details">
                        <p>${title}</p>
                        <p>${category}</p>
                        <h3>$${price}<i class="bi bi-heart"></i></h3>
                    </div>
                <button class="cartBtn" data-id="${id}" data-title="${title}" data-price="${price}" data-image="${image}">Add to Cart</button>
                </div>
            `;
        });

        // Add event listeners to all "Add to Cart" buttons
        const addToCartButtons = document.querySelectorAll('.cartBtn');
        addToCartButtons.forEach((button) => {
            button.addEventListener('click', addToCart);
        });
    })
    .catch((error) => {
        console.error('Error fetching products:', error);
    });

// Function to add an item to the cart
function addToCart(event) {
    const product = {
        id: event.target.dataset.id,
        title: event.target.dataset.title,
        price: parseFloat(event.target.dataset.price),
        image: event.target.dataset.image,
        quantity: 1, // Default quantity
    };

    // Check if the item already exists in the cart
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item exists
    } else {
        cartItems.push(product); // Add new item to the cart
    }

    updateCartDisplay(); // Update the cart display
    saveCartToLocalStorage(); // Save the updated cart to localStorage
}

// Function to calculate the total price of the cart
function calculateTotalPrice() {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
}

// Function to update the cart display
function updateCartDisplay() {
    const cart = document.getElementById('cart');
    cart.innerHTML = ''; // Clear the cart display

    cartItems.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div>
                <p>${item.title}</p>
                <p>$${item.price}</p>
            </div>
            <div>
                <button onclick="decreaseQuantity('${item.id}')">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity('${item.id}')">+</button>
                <button onclick="removeItem('${item.id}')">Remove</button>
            </div>
        `;

        cart.appendChild(cartItem);
    });

    // Display the total price
    const totalPrice = calculateTotalPrice();
    const totalPriceElement = document.createElement('div');
    totalPriceElement.classList.add('total-price');
    totalPriceElement.innerHTML = `<h3>Total: $${totalPrice}</h3>`;
    cart.appendChild(totalPriceElement);
}

// Function to increase the quantity of an item
function increaseQuantity(id) {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
        item.quantity += 1;
        updateCartDisplay();
        saveCartToLocalStorage(); // Save the updated cart to localStorage
    }
}

// Function to decrease the quantity of an item
function decreaseQuantity(id) {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        updateCartDisplay();
        saveCartToLocalStorage(); // Save the updated cart to localStorage
    } else {
        removeItem(id); // Remove the item if quantity is 1
    }
}

// Function to remove an item from the cart
function removeItem(id) {
    cartItems = cartItems.filter((item) => item.id !== id);
    updateCartDisplay();
    saveCartToLocalStorage(); // Save the updated cart to localStorage
}

// Load cart items from localStorage when the page loads
//loadCartFromLocalStorage();


// ------------------------------CartQualtity--------------------------------------


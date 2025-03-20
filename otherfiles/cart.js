let carticon = document.getElementById("carticon");
const cart = document.getElementById('cart-box');
const cartClose = document.getElementById('cart-close');
const order = document.getElementById('order');
const cartIcon2 = document.getElementById('cartIcon2');
const cartTotalDisplay = document.getElementById('cartDisplay');

console.log(cartClose, carticon, cartClose, cartIcon2,order);


carticon.addEventListener("click", () => cart.classList.add('active'));
cartIcon2.addEventListener("click", () => cart.classList.add('active'));
order.addEventListener("click", () => cart.classList.add('active'));
cartClose.addEventListener("click", () => cart.classList.remove('active'));


//add----------- to ---------cart------------ display

let totalItems = 0;

let CartQualtity = document.getElementById('cartQuatity');

function  removeItem(){
    alert('hello')
    
    totalItems-=1;
    CartQualtity.innerHTML = totalItems;
   
}

//--------------------- ADD TO CART FUNCTION-------------------------

let cartItems = []; // Array to store cart items

// Load cart items from localStorage when the page loads
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCartDisplay(); // Update the cart display with saved items
    }
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}


/// Function to add an item to the cart
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
            <div class="items_details">
                <img src="${item.image}" alt="${item.title}" width="100px">
                <p>${item.title}</p>
                <p>$${item.price}</p>
            </div>
            <div class="priceBox">
               <div class="increase">
                 <button onclick="decreaseQuantity('${item.id}')"><i class="bi bi-dash"></i></button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity('${item.id}')"><i class="bi bi-plus-lg"></i></button>
               </div>
                <button onclick="removeItem('${item.id}')" class="remove">
                <i class="bi bi-trash3"></i>
                <span>Remove</span>
                </button>
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

    totalItems+= 1;
    CartQualtity.innerHTML = totalItems;
}

// Function to decrease the quantity of an item
function decreaseQuantity(id) {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity  > 1) {
        item.quantity -= 1;
        totalItems-= 1;
        updateCartDisplay();
        saveCartToLocalStorage(); // Save the updated cart to localStorage
    } else {
        removeItem(id); // Remove the item if quantity is 1
    }

    if(item.quantity && totalItems <= 1){
        totalItems = '';
        CartQualtity.innerHTML = totalItems;
    }
}

// Function to remove an item from the cart
function removeItem(id) {
    cartItems = cartItems.filter((item) => item.id !== id);
    totalItems -=1;
    CartQualtity.innerHTML = totalItems;
    updateCartDisplay();
    saveCartToLocalStorage(); // Save the updated cart to localStorage
}

// Load cart items from localStorage when the page loads
loadCartFromLocalStorage();
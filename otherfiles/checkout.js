// // Firebase configuration (same as your main app)
// // Import the necessary Firebase modules
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
// import { 
//     getFirestore, 
//     collection, 
//     doc, 
//     getDoc, 
//     setDoc, 
//     addDoc 
// } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
// import { 
//     getAuth, 
//     onAuthStateChanged 
// } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// // Firebase configuration (same as your main app)
// const firebaseConfig = {
//     apiKey: "AIzaSyAL2s6PP_WPykchAKQaYr3oWGBfTNc3iAw",
//     authDomain: "shopping-mail-b45a2.firebaseapp.com",
//     projectId: "shopping-mail-b45a2",
//     storageBucket: "shopping-mail-b45a2.firebasestorage.app",
//     messagingSenderId: "136423139432",
//     appId: "1:136423139432:web:b638d23fd53619bbd8b3dd"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// // ... rest of your checkout.js code remains the same ...
// // DOM Elements
// const cartItemsContainer = document.getElementById('cartItems');
// const subtotalElement = document.getElementById('subtotal');
// const shippingElement = document.getElementById('shipping');
// const totalElement = document.getElementById('total');
// const checkoutForm = document.getElementById('checkoutForm');
// const successModal = document.getElementById('successModal');
// const closeModal = document.querySelector('.close');
// const orderIdElement = document.getElementById('orderId');
// const cartQuantityElement = document.getElementById('cartQuantity');

// // Global variables
// let cartItems = [];
// let subtotal = 0;
// const shippingCost = 5.99;

// // Initialize the checkout page
// document.addEventListener('DOMContentLoaded', () => {
//     // Check authentication state
//     onAuthStateChanged(auth, (user) => {
//         if (!user) {
//             window.location.href = 'signin.html';
//         } else {
//             loadCartItems();
//         }
//     });

//     // Setup modal close button
//     closeModal.addEventListener('click', () => {
//         successModal.style.display = 'none';
//     });

//     // Handle form submission
//     checkoutForm.addEventListener('submit', handleCheckout);
// });

// // Load cart items from Firestore
// async function loadCartItems() {
//     const userCartRef = doc(db, 'cart', auth.currentUser.uid);
    
//     try {
//         const cartDoc = await getDoc(userCartRef);
        
//         if (cartDoc.exists()) {
//             cartItems = cartDoc.data().items || [];
//             displayCartItems();
//             calculateTotals();
//             updateCartQuantity();
//         } else {
//             cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
//         }
//     } catch (error) {
//         console.error('Error loading cart:', error);
//         cartItemsContainer.innerHTML = '<p>Error loading your cart. Please try again.</p>';
//     }
// }

// // Display cart items in the order summary
// function displayCartItems() {
//     if (cartItems.length === 0) {
//         cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
//         return;
//     }

//     cartItemsContainer.innerHTML = '';
    
//     cartItems.forEach(item => {
//         const itemElement = document.createElement('div');
//         itemElement.className = 'cart-item';
//         itemElement.innerHTML = `
//             <img src="${item.image}" alt="${item.title}">
//             <div class="cart-item-details">
//                 <h3>${item.title}</h3>
//                 <p>Quantity: ${item.quantity}</p>
//                 <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
//             </div>
//         `;
//         cartItemsContainer.appendChild(itemElement);
//     });
// }

// // Calculate and update order totals
// function calculateTotals() {
//     subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//     const total = subtotal + shippingCost;
    
//     subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
//     shippingElement.textContent = `$${shippingCost.toFixed(2)}`;
//     totalElement.textContent = `$${total.toFixed(2)}`;
// }

// // Update cart quantity badge
// function updateCartQuantity() {
//     const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
//     cartQuantityElement.textContent = totalQuantity;
//     cartQuantityElement.style.display = totalQuantity > 0 ? 'block' : 'none';
// }

// // Handle checkout form submission
// async function handleCheckout(event) {
//     event.preventDefault();
    
//     // Get form values
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const address = document.getElementById('address').value;
//     const paymentMethod = 'card'; // In a real app, you'd get this from the form
    
//     // Create order object
//     const order = {
//         userId: auth.currentUser.uid,
//         customerInfo: { name, email, address },
//         items: cartItems,
//         subtotal,
//         shipping: shippingCost,
//         total: subtotal + shippingCost,
//         paymentMethod,
//         status: 'processing',
//         createdAt: new Date().toISOString()
//     };
    
//     try {
//         // Save order to Firestore
//         const ordersCollection = collection(db, 'orders');
//         const docRef = await addDoc(ordersCollection, order);
        
//         // Clear the cart
//         const userCartRef = doc(db, 'cart', auth.currentUser.uid);
//         await setDoc(userCartRef, { items: [] });
        
//         // Show success modal
//         orderIdElement.textContent = docRef.id;
//         successModal.style.display = 'block';
        
//     } catch (error) {
//         console.error('Error processing order:', error);
//         alert('There was an error processing your order. Please try again.');
//     }
// }


// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { 
    getFirestore, collection, doc, getDoc, setDoc, addDoc 
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { 
    getAuth, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAL2s6PP_WPykchAKQaYr3oWGBfTNc3iAw",
    authDomain: "shopping-mail-b45a2.firebaseapp.com",
    projectId: "shopping-mail-b45a2",
    storageBucket: "shopping-mail-b45a2.firebasestorage.app",
    messagingSenderId: "136423139432",
    appId: "1:136423139432:web:b638d23fd53619bbd8b3dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements with null checks
function getElementOrThrow(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element with ID '${id}' not found`);
    }
    return element;
}

let cartItemsContainer, subtotalElement, shippingElement, totalElement, checkoutForm;
let successModal, closeModal, orderIdElement, cartQuantityElement;

try {
    cartItemsContainer = getElementOrThrow('cartItems');
    subtotalElement = getElementOrThrow('subtotal');
    shippingElement = getElementOrThrow('shipping');
    totalElement = getElementOrThrow('total');
    checkoutForm = getElementOrThrow('checkoutForm');
    successModal = getElementOrThrow('successModal');
    closeModal = document.querySelector('.close');
    orderIdElement = getElementOrThrow('orderId');
    cartQuantityElement = getElementOrThrow('cartQuantity');
} catch (error) {
    console.error('DOM Element Error:', error.message);
    // Handle missing elements gracefully
}

// Global variables
let cartItems = [];
let subtotal = 0;
const shippingCost = 5.99;

// Initialize the checkout page
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication state
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = 'signin.html';
        } else if (cartItemsContainer) { // Only proceed if elements exist
            loadCartItems();
        }
    });

    // Setup modal close button if it exists
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            if (successModal) successModal.style.display = 'none';
        });
    }

    // Handle form submission if form exists
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
});

// Load cart items from Firestore
async function loadCartItems() {
    if (!auth.currentUser || !cartItemsContainer) return;
    
    const userCartRef = doc(db, 'cart', auth.currentUser.uid);
    
    try {
        const cartDoc = await getDoc(userCartRef);
        
        if (cartDoc.exists()) {
            cartItems = cartDoc.data().items || [];
            displayCartItems();
            calculateTotals();
            updateCartQuantity();
        } else if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        }
    } catch (error) {
        console.error('Error loading cart:', error);
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '<p>Error loading your cart. Please try again.</p>';
        }
    }
}

// Display cart items in the order summary
function displayCartItems() {
    if (!cartItemsContainer || !cartItems) return;

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cartItemsContainer.innerHTML = '';
    
    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <h3>${item.title}</h3>
                <p>Quantity: ${item.quantity}</p>
                <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}

// Calculate and update order totals
function calculateTotals() {
    if (!subtotalElement || !shippingElement || !totalElement) return;
    
    subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + shippingCost;
    
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = `$${shippingCost.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

// Update cart quantity badge
function updateCartQuantity() {
    if (!cartQuantityElement || !cartItems) return;

    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartQuantityElement.textContent = totalQuantity;
    cartQuantityElement.style.display = totalQuantity > 0 ? 'block' : 'none';
}

// Handle checkout form submission
async function handleCheckout(event) {
    event.preventDefault();
    
    if (!checkoutForm || !successModal || !orderIdElement) return;
    
    // Get form values
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const address = document.getElementById('address')?.value;
    const paymentMethod = 'card';

    if (!name || !email || !address) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Create order object
    const order = {
        userId: auth.currentUser.uid,
        customerInfo: { name, email, address },
        items: cartItems,
        subtotal,
        shipping: shippingCost,
        total: subtotal + shippingCost,
        paymentMethod,
        status: 'processing',
        createdAt: new Date().toISOString()
    };
    
    try {
        // Save order to Firestore
        const ordersCollection = collection(db, 'orders');
        const docRef = await addDoc(ordersCollection, order);
        
        // Clear the cart
        const userCartRef = doc(db, 'cart', auth.currentUser.uid);
        await setDoc(userCartRef, { items: [] });
        
        // Show success modal
        orderIdElement.textContent = docRef.id;
        successModal.style.display = 'block';
        
    } catch (error) {
        console.error('Error processing order:', error);
        alert('There was an error processing your order. Please try again.');
    }
}
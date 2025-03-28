// 1. Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { 
    getFirestore, collection, doc, 
    getDoc, setDoc, updateDoc 
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { 
    getAuth, onAuthStateChanged, 
    signInWithEmailAndPassword, signOut 
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// // 2. Configure Firebase with your project settings
// const firebaseConfig = {
//     apiKey: "AIzaSyAL2s6PP_WPykchAKQaYr3oWGBfTNc3iAw",
//     authDomain: "shopping-mail-b45a2.firebaseapp.com",
//     projectId: "shopping-mail-b45a2",
//     storageBucket: "shopping-mail-b45a2.firebasestorage.app",
//     messagingSenderId: "136423139432",
//     appId: "1:136423139432:web:b638d23fd53619bbd8b3dd"
// };

// // 3. Initialize Firebase services
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// // 4. Create a reference to the 'cart' collection
// const cartCollection = collection(db, "cart");






// // 5. Get the current user's cart reference
// function getUserCartRef() {
//     const user = auth.currentUser;
//     if (!user) {
//         console.error("No user is signed in.");
//         return null;
//     }
//     // Each user's cart is stored as a document with their UID as the ID
//     return doc(cartCollection, user.uid);
// }

// // 6. Update the cart quantity display
// function updateCartQuantity(totalQuantity) {
//     const cartQuantityElement = document.getElementById('cartQuantity');
//     if (cartQuantityElement) {
//         cartQuantityElement.textContent = totalQuantity;
//         cartQuantityElement.style.display = totalQuantity > 0 ? 'block' : 'none';
//     }
// }



// // 7. Wait for the DOM to load before running our code
// document.addEventListener('DOMContentLoaded', () => {
//     // 8. Load products from the API and display them
//     loadProducts();
    
//     // 9. Set up authentication state listener
//     setupAuthListener();
    
//     // 10. Set up sign-in/sign-out button handlers
//     setupAuthButtons();
// });

// // 11. Function to load and display products
// async function loadProducts() {
//     try {
//         const response = await fetch('https://fakestoreapi.com/products');
//         const products = await response.json();
//         const display = document.getElementById('display');
        
//         products.forEach(product => {
//             display.innerHTML += createProductCard(product);
//         });
        
//         // Add event listeners to all "Add to Cart" buttons
//         document.querySelectorAll('.cartBtn').forEach(button => {
//             button.addEventListener('click', handleAddToCart);
//         });
//     } catch (error) {
//         console.error('Error loading products:', error);
//     }
// }

// // 12. Create HTML for a product card
// function createProductCard(product) {
//     return `
//         <div class="cards">
//             <img src="${product.image}" alt="${product.title}" width="80px">
//             <div class="details">
//                 <p>${product.title}</p>
//                 <p>${product.category}</p>
//                 <h3>$${product.price}<i class="bi bi-heart"></i></h3>
//             </div>
//             <button class="cartBtn" id="addToCart"
//                 data-id="${product.id}" 
//                 data-title="${product.title}" 
//                 data-price="${product.price}" 
//                 data-image="${product.image}">
//                 Add to Cart
//             </button>
//         </div>
//     `;
// }

// // 13. Handle "Add to Cart" button clicks
// function handleAddToCart(event) {
//     const button = event.currentTarget;
//     const product = {
//         id: button.dataset.id,
//         title: button.dataset.title,
//         price: parseFloat(button.dataset.price),
//         image: button.dataset.image
//     };
    
//     if (auth.currentUser) {
//         addToCart(product);
//     } else {
//         alert("Please sign in to add items to your cart.");
//     }
// }



 
//  let cartQuantity = document.getElementById('totalQuantity');
//  console.log(cartQuantity);
 


// // 14. Add item to cart or update quantity if already exists
// async function addToCart(product) {
//     const userCartRef = getUserCartRef();
//     if (!userCartRef) return;
    
//     try {
//         const cartDoc = await getDoc(userCartRef);
//         let items = [];
//         let totalQuantity = 0;
//         console.log(totalQuantity);
        
        
//         if (cartDoc.exists()) {
//             items = [...cartDoc.data().items];
//             const existingItem = items.find(item => item.id === product.id);
            
//             if (existingItem) {
//                 existingItem.quantity += 1;
//             } else {
//                 items.push({ ...product, quantity: 1 });
//             }
//         } else {
//             items.push({ ...product, quantity: 1 });
//         }
        
//         // Calculate total quantity for the badge
//         totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
        
//         // Update the cart in Firestore
//         await setDoc(userCartRef, { items }, { merge: true });
        
//         // Update the UI
//         updateCartQuantity(totalQuantity);
        
//         updateCartDisplay();
//         console.log(totalQuantity);
//         cartQuantity.innerHTML = totalQuantity;
        
        
//     } catch (error) {
//         console.error("Error adding to cart:", error);
//     }
// }



// // 15. Update the cart display
// async function updateCartDisplay() {
//     const cartElement = document.getElementById('cart');
//     if (!cartElement) return;
    
//     const userCartRef = getUserCartRef();
//     if (!userCartRef) return;
    
//     try {
//         const cartDoc = await getDoc(userCartRef);
        
//         if (!cartDoc.exists()) {
//             cartElement.innerHTML = '<p>Your cart is empty.</p>';
//             updateCartQuantity(0);
//             return;
//         }
        
//         const cartData = cartDoc.data();
//         let totalPrice = 0;
//         let totalQuantity = 0;
        
//         cartElement.innerHTML = '';
        
//         cartData.items.forEach(item => {
//             totalPrice += item.price * item.quantity;
//             totalQuantity += item.quantity;
            
//             cartElement.appendChild(createCartItemElement(item));
//         });
        
//         // Update the cart quantity badge
//         updateCartQuantity(totalQuantity);
        
//         // Add total price display
//         const totalElement = document.createElement('div');
//         totalElement.className = 'cart-total';
//         totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
//         cartElement.appendChild(totalElement);
        
//     } catch (error) {
//         console.error("Error updating cart:", error);
//     }
// }

// // 16. Create HTML for a cart item
// function createCartItemElement(item) {
//     const itemElement = document.createElement('div');
//     itemElement.className = 'cart-item';
//     itemElement.innerHTML = `
//         <img src="${item.image}" alt="${item.title}">
//         <div class="cartDetails">
//             <p>${item.title}</p>
//             <p>$${item.price}</p>
//         </div>
//         <div class="cartBtn">
//             <button class="decrease btn" data-id="${item.id}">-</button>
//             <span>${item.quantity}</span>
//             <button class="increase btn" data-id="${item.id}">+</button>
//             <button class="remove" data-id="${item.id}">Remove</button>
//         </div>
//     `;
    
//     // Add event listeners
//     itemElement.querySelector('.decrease').addEventListener('click', () => adjustQuantity(item.id, -1));
//     itemElement.querySelector('.increase').addEventListener('click', () => adjustQuantity(item.id, 1));
//     itemElement.querySelector('.remove').addEventListener('click', () => removeItem(item.id));
    
//     return itemElement;
// }




// // 17. Adjust item quantity (increase or decrease)
// async function adjustQuantity(itemId, change) {
//     const userCartRef = getUserCartRef();
//     if (!userCartRef) return;
    
//     try {
//         const cartDoc = await getDoc(userCartRef);
//         if (!cartDoc.exists()) return;
        
//         let items = [...cartDoc.data().items];
//         const itemIndex = items.findIndex(item => item.id === itemId);
        
//         if (itemIndex === -1) return;
        
//         if (change === -1 && items[itemIndex].quantity <= 1) {
//             // Remove item if decreasing below 1
//             items.splice(itemIndex, 1);
//         } else {
//             // Update quantity
//             items[itemIndex].quantity += change;
//         }
        
//         // Update Firestore
//         await setDoc(userCartRef, { items }, { merge: true });
        
//         // Update UI
//         updateCartDisplay();
        
//     } catch (error) {
//         console.error("Error adjusting quantity:", error);
//     }
// }

// //  Remove item from cart completely
// async function removeItem(itemId) {
//     const userCartRef = getUserCartRef();
//     if (!userCartRef) return;
    
//     try {
//         const cartDoc = await getDoc(userCartRef);
//         if (!cartDoc.exists()) return;
        
//         const items = cartDoc.data().items.filter(item => item.id !== itemId);
        
//         // Update Firestore
//         await setDoc(userCartRef, { items }, { merge: true });
        
//         // Update UI
//         updateCartDisplay();
        
//     } catch (error) {
//         console.error("Error removing item:", error);
//     }
// }




// // 19. Set up authentication state listener
// function setupAuthListener() {
//     onAuthStateChanged(auth, (user) => {
//         const signInButton = document.getElementById('signInButton');
//         const signOutButton = document.getElementById('signOutButton');
//         const cart = document.getElementById('cart');
        
//         if (user) {
//             // User is signed in
//             console.log("User signed in:", user.email);
//             if (signOutButton) signOutButton.style.display = 'block';
//             if (signInButton) signInButton.style.display = 'none';
//             updateCartDisplay();
//         } else {
//             // User is signed out
//             console.log("No user signed in.");
//             if (signOutButton) signOutButton.style.display = 'none';
//             if (signInButton) signInButton.style.display = 'block';
//             if (cart) cart.innerHTML = '<p>Please sign in to view your cart.</p>';
//         }
//     });
// }

// // 20. Set up authentication button handlers
// function setupAuthButtons() {
//     const signInButton = document.getElementById('signInButton');
//     const signOutButton = document.getElementById('signOutButton');
    
//     if (signInButton) {
//         signInButton.addEventListener('click', handleSignIn);
//     }
    
//     if (signOutButton) {
//         signOutButton.addEventListener('click', signOutUser);
//     }
// }

// // 21. Handle sign in
// async function handleSignIn() {
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
    
//     try {
//         await signInWithEmailAndPassword(auth, email, password);
//         console.log("Signed in successfully");
//     } catch (error) {
//         console.error("Sign in error:", error.message);
//         alert("Sign in failed: " + error.message);
//     }
// }

// // 22. Handle sign out
// async function signOutUser() {
//     try {
//         await signOut(auth);
//         console.log("Signed out successfully");
//         setTimeout(() => {
//             window.location.href = "../Signin.html";
//         }, 2000);
//     } catch (error) {
//         console.error("Sign out error:", error.message);
//     }
// }

// // Temporary debug code
// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM fully loaded');
//     const debugElement = document.getElementById('cartItems');
//     console.log('cartItems element:', debugElement);
//     console.log('order-summary section:', document.querySelector('.order-summary'));
// });

// const homePage = document.getElementById('Home');
// homePage.addEventListener('click', ()=>{
//     setTimeout(() => {
//          window.location.href = "./landing.html";
//       }, 2000); 
// });






// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";

// Firebase Configuration and Initialization
const firebaseConfig = {
    apiKey: "AIzaSyAL2s6PP_WPykchAKQaYr3oWGBfTNc3iAw",
    authDomain: "shopping-mail-b45a2.firebaseapp.com",
    projectId: "shopping-mail-b45a2",
    storageBucket: "shopping-mail-b45a2.appspot.com",
    messagingSenderId: "136423139432",
    appId: "1:136423139432:web:b638d23fd53619bbd8b3dd"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const cartCollection = collection(db, "cart");

// DOM Elements
const elements = {
    cartQuantity: document.getElementById('totalQuantity'),
    display: document.getElementById('display'),
    cart: document.getElementById('cart'),
    signInButton: document.getElementById('signInButton'),
    signOutButton: document.getElementById('signOutButton'),
    homePage: document.getElementById('Home')
};



// Utility Functions
const utils = {
    showElement: (element, show) => {
        if (element) element.style.display = show ? 'block' : 'none';
    },
    createElement: (tag, className, content) => {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (content) el.textContent = content;
        return el;
    }
};

// Cart Management
const cartManager = {
    getUserCartRef: () => {
        const user = auth.currentUser;
        return user ? doc(cartCollection, user.uid) : null;
    },

    updateCartQuantity: (quantity) => {
        if (elements.cartQuantity) {
            elements.cartQuantity.textContent = quantity;
            utils.showElement(elements.cartQuantity, quantity > 0);
        }
    },

    addToCart: async (product) => {
        const userCartRef = cartManager.getUserCartRef();
        if (!userCartRef) return;

        try {
            const cartDoc = await getDoc(userCartRef);
            let items = cartDoc.exists() ? [...cartDoc.data().items] : [];
            
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                items.push({ ...product, quantity: 1 });
            }

            const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
            await setDoc(userCartRef, { items }, { merge: true });
            
            cartManager.updateCartQuantity(totalQuantity);
            cartManager.updateCartDisplay();
        } catch (error) {
            console.error("Cart update error:", error);
            alert("Failed to update cart. Please try again.");
        }
    },

    updateCartDisplay: async () => {
        if (!elements.cart) return;
        
        const userCartRef = cartManager.getUserCartRef();
        if (!userCartRef) {
            elements.cart.innerHTML = '<p>Please sign in to view your cart.</p>';
            return;
        }

        try {
            const cartDoc = await getDoc(userCartRef);
            
            if (!cartDoc.exists()) {
                elements.cart.innerHTML = '<p>Your cart is empty.</p>';
                cartManager.updateCartQuantity(0);
                return;
            }

            const cartData = cartDoc.data();
            let totalPrice = 0;
            let totalQuantity = 0;

            elements.cart.innerHTML = '';
            
            cartData.items.forEach(item => {
                totalPrice += item.price * item.quantity;
                totalQuantity += item.quantity;
                elements.cart.appendChild(cartManager.createCartItemElement(item));
            });

            const totalElement = utils.createElement('div', 'cart-total', `Total: $${totalPrice.toFixed(2)}`);
            elements.cart.appendChild(totalElement);
            cartManager.updateCartQuantity(totalQuantity);
            console.log(totalQuantity);
            

        } catch (error) {
            console.error("Cart display error:", error);
        }
    },

    createCartItemElement: (item) => {
        const itemElement = utils.createElement('div', 'cart-item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cartDetails">
                <p>${item.title}</p>
                <p>$${item.price}</p>
            </div>
            <div class="cartBtn">
                <button class="decrease btn" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="increase btn" data-id="${item.id}">+</button>
                <button class="remove" data-id="${item.id}">Remove</button>
            </div>
        `;

        itemElement.querySelector('.decrease').addEventListener('click', () => cartManager.adjustQuantity(item.id, -1));
        itemElement.querySelector('.increase').addEventListener('click', () => cartManager.adjustQuantity(item.id, 1));
        itemElement.querySelector('.remove').addEventListener('click', () => cartManager.removeItem(item.id));

        return itemElement;
    },

    adjustQuantity: async (itemId, change) => {
        const userCartRef = cartManager.getUserCartRef();
        if (!userCartRef) return;

        try {
            const cartDoc = await getDoc(userCartRef);
            if (!cartDoc.exists()) return;

            let items = [...cartDoc.data().items];
            const itemIndex = items.findIndex(item => item.id === itemId);

            if (itemIndex === -1) return;

            if (change === -1 && items[itemIndex].quantity <= 1) {
                items.splice(itemIndex, 1);
            } else {
                items[itemIndex].quantity += change;
            }

            await setDoc(userCartRef, { items }, { merge: true });
            cartManager.updateCartDisplay();
        } catch (error) {
            console.error("Quantity adjustment error:", error);
        }
    },

    removeItem: async (itemId) => {
        const userCartRef = cartManager.getUserCartRef();
        if (!userCartRef) return;

        try {
            const cartDoc = await getDoc(userCartRef);
            if (!cartDoc.exists()) return;

            const items = cartDoc.data().items.filter(item => item.id !== itemId);
            await setDoc(userCartRef, { items }, { merge: true });
            cartManager.updateCartDisplay();
        } catch (error) {
            console.error("Item removal error:", error);
        }
    }
};

// Product Management
const productManager = {
    loadProducts: async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const products = await response.json();
            
            products.forEach(product => {
                elements.display.innerHTML += productManager.createProductCard(product);
            });

            document.querySelectorAll('.cartBtn').forEach(button => {
                button.addEventListener('click', productManager.handleAddToCart);
            });
        } catch (error) {
            console.error('Product loading error:', error);
        }
    },

    createProductCard: (product) => {
        return `
            <div class="cards">
                <img src="${product.image}" alt="${product.title}" width="80px">
                <div class="details">
                    <p>${product.title}</p>
                    <p>${product.category}</p>
                    <h3>$${product.price}<i class="bi bi-heart"></i></h3>
                </div>
                <button class="cartBtn" id="addToCart"
                    data-id="${product.id}" 
                    data-title="${product.title}" 
                    data-price="${product.price}" 
                    data-image="${product.image}">
                    Add to Cart
                </button>
            </div>
        `;
    },

    handleAddToCart: (event) => {
        const button = event.currentTarget;
        const product = {
            id: button.dataset.id,
            title: button.dataset.title,
            price: parseFloat(button.dataset.price),
            image: button.dataset.image
        };
        
        auth.currentUser 
            ? cartManager.addToCart(product)
            : alert("Please sign in to add items to your cart.");
    }
};

// Authentication Management
const authManager = {
    setupAuthListener: () => {
        onAuthStateChanged(auth, (user) => {
            utils.showElement(elements.signOutButton, !!user);
            utils.showElement(elements.signInButton, !user);
            cartManager.updateCartDisplay();
        });
    },

    setupAuthButtons: () => {
        if (elements.signInButton) {
            elements.signInButton.addEventListener('click', authManager.handleSignIn);
        }
        
        if (elements.signOutButton) {
            elements.signOutButton.addEventListener('click', authManager.signOutUser);
        }
    },

    handleSignIn: async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            alert(`Sign in failed: ${error.message}`);
        }
    },

    signOutUser: async () => {
        try {
            await signOut(auth);
            setTimeout(() => {
                window.location.href = "../Signin.html";
            }, 2000);
        } catch (error) {
            console.error("Sign out error:", error);
        }
    }
};

// Navigation
const navigation = {
    setupNavigation: () => {
        if (elements.homePage) {
            elements.homePage.addEventListener('click', () => {
                setTimeout(() => {
                    window.location.href = "./landing.html";
                }, 2000);
            });
        }
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    productManager.loadProducts();
    authManager.setupAuthListener();
    authManager.setupAuthButtons();
    navigation.setupNavigation();
});




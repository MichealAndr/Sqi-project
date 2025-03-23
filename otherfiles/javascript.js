// // Import the necessary Firebase modules
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
// import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc, query, where, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
// import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// // Firebase configuration
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

// // Reference to the Firestore collection for the cart
// const cartCollection = collection(db, "cart");

// // Function to get the current user's cart reference
// function getUserCartRef() {
//     const user = auth.currentUser;
//     if (!user) {
//         console.error("No user is signed in.");
//         return null;
//     }
//     return doc(cartCollection, user.uid); // Use user's UID as the document ID
// }

// // Wait for the DOM to load
// document.addEventListener('DOMContentLoaded', () => {
//     // Fetch and display products from the API
//     fetch('https://fakestoreapi.com/products')
//         .then((res) => res.json())
//         .then((data) => {
//             const display = document.getElementById('display');

//             data.forEach((product) => {
//                 const { id, image, title, category, price } = product;

//                 // Display each product
//                 display.innerHTML += `
//                     <div class="cards">
//                         <img src="${image}" alt="${title}" width="80px">
//                         <div class="details">
//                             <p>${title}</p>
//                             <p>${category}</p>
//                             <h3>$${price}<i class="bi bi-heart"></i></h3>
//                         </div>
//                         <button class="cartBtn" data-id="${id}" data-title="${title}" data-price="${price}" data-image="${image}">Add to Cart</button>
//                     </div>
//                 `;
//             });

//             // Add event listeners to "Add to Cart" buttons
//             document.querySelectorAll('.cartBtn').forEach(button => {
//                 button.addEventListener('click', () => {
//                     const id = button.dataset.id;
//                     const title = button.dataset.title;
//                     const price = parseFloat(button.dataset.price);
//                     const image = button.dataset.image;

//                     if (auth.currentUser) {
//                         addToCart(id, title, price, image);
//                     } else {
//                         // Show alert if no user is signed in
//                         alert("No user is signed in. Please sign in to add items to your cart.");
//                     }
//                 });
//             });
//         })
//         .catch((error) => {
//             console.error('Error fetching products:', error);
//         });

//     // Listen for authentication state changes
//     onAuthStateChanged(auth, (user) => {
//         const signInButton = document.getElementById('signInButton');
//         const signOutButton = document.getElementById('signOutButton');
//         const cart = document.getElementById('cart');

//         if (user) {
//             // User is signed in
//             console.log("User is signed in:", user.email);
//             if (signOutButton) signOutButton.style.display = 'block';
//             if (signInButton) signInButton.style.display = 'none';
//             updateCartDisplay(); // Update the cart display
//         } else {
//             // User is signed out
//             console.log("No user is signed in.");
//             if (signOutButton) signOutButton.style.display = 'none';
//             if (signInButton) signInButton.style.display = 'block';
//             if (cart) cart.innerHTML = '<p>Please sign in to view your cart.</p>';
//         }
//     });

//     // Add event listeners for sign-in and sign-out buttons
//     const signInButton = document.getElementById('signInButton');
//     const signOutButton = document.getElementById('signOutButton');

//     if (signInButton) {
//         signInButton.addEventListener('click', () => {
//             const email = document.getElementById('email').value;
//             const password = document.getElementById('password').value;
//             signIn(email, password);
//         });
//     }

//     if (signOutButton) {
//         signOutButton.addEventListener('click', () => {
//             signOutUser();
//         });
//     }
// });

// // Function to add an item to the cart
// async function addToCart(id, title, price, image) {
//     const userCartRef = getUserCartRef();
//     if (!userCartRef) return;

//     const product = {
//         id: id,
//         title: title,
//         price: price,
//         image: image,
//         quantity: 1,
//     };

//     try {
//         const cartDoc = await getDoc(userCartRef);
//         if (cartDoc.exists()) {
//             // Cart exists, update it
//             const cartData = cartDoc.data();
//             const existingItem = cartData.items.find((item) => item.id === id);

//             if (existingItem) {
//                 // Update quantity if item exists
//                 existingItem.quantity += 1;
//             } else {
//                 // Add new item to the cart
//                 cartData.items.push(product);
//             }

//             await updateDoc(userCartRef, {
//                 items: cartData.items,
//             });
//         } else {
//             // Create a new cart
//             await setDoc(userCartRef, {
//                 items: [product],
//             });
//         }

//         updateCartDisplay();
//     } catch (error) {
//         console.error("Error adding to cart:", error);
//     }
// }

// // Function to update the cart display
// async function updateCartDisplay() {
//     const cart = document.getElementById('cart');
//     if (!cart) return;

//     cart.innerHTML = '';

//     const userCartRef = getUserCartRef();
//     if (!userCartRef) return;

//     try {
//         const cartDoc = await getDoc(userCartRef);
//         if (!cartDoc.exists()) {
//             cart.innerHTML = '<p>Your cart is empty.</p>';
//             return;
//         }

//         const cartData = cartDoc.data();
//         let totalPrice = 0;

//         cartData.items.forEach((item) => {
//             const cartItem = document.createElement('div');
//             cartItem.classList.add('cart-item');

//             cartItem.innerHTML = `
//                 <img src="${item.image}" alt="${item.title}">
//                 <div class="cartDetails">
//                     <p>${item.title}</p>
//                     <p>$${item.price}</p>
//                 </div>
//                 <div class="cartBtn">
//                     <button class="decrease btn" data-id="${item.id}" data-quantity="${item.quantity}">-</button>
//                     <span>${item.quantity}</span>
//                     <button class="increase btn" data-id="${item.id}" data-quantity="${item.quantity}">+</button>
//                     <button class="remove" data-id="${item.id}">Remove</button>
//                 </div>
//             `;

//             cart.appendChild(cartItem);
//             totalPrice += item.price * item.quantity;
//         });

//         // Add total price display
//         const totalPriceElement = document.createElement('div');
//         totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
//         cart.appendChild(totalPriceElement);

//         // Add event listeners for quantity buttons
//         cart.querySelectorAll('.decrease').forEach(button => {
//             button.addEventListener('click', () => decreaseQuantity(button.dataset.id));
//         });

//         cart.querySelectorAll('.increase').forEach(button => {
//             button.addEventListener('click', () => increaseQuantity(button.dataset.id));
//         });

//         cart.querySelectorAll('.remove').forEach(button => {
//             button.addEventListener('click', () => removeItem(button.dataset.id));
//         });

//     } catch (error) {
//         console.error("Error updating cart display:", error);
//     }
// }

// // Function to decrease the quantity of an item
// async function decreaseQuantity(itemId) {
//     const userCartRef = getUserCartRef();
//     if (!userCartRef) return;

//     try {
//         const cartDoc = await getDoc(userCartRef);
//         const cartData = cartDoc.data();
//         const itemIndex = cartData.items.findIndex((item) => item.id === itemId);

//         if (itemIndex !== -1) {
//             if (cartData.items[itemIndex].quantity > 1) {
//                 cartData.items[itemIndex].quantity -= 1;
//             } else {
//                 cartData.items.splice(itemIndex, 1); // Remove item if quantity is 1
//             }

//             await updateDoc(userCartRef, {
//                 items: cartData.items,
//             });
//             updateCartDisplay();
//         }
//     } catch (error) {
//         console.error("Error decreasing quantity:", error);
//     }
// }

// // Function to increase the quantity of an item
// async function increaseQuantity(itemId) {
//     const userCartRef = getUserCartRef();
//     if (!userCartRef) return;

//     try {
//         const cartDoc = await getDoc(userCartRef);
//         const cartData = cartDoc.data();
//         const itemIndex = cartData.items.findIndex((item) => item.id === itemId);

//         if (itemIndex !== -1) {
//             cartData.items[itemIndex].quantity += 1;
//             await updateDoc(userCartRef, {
//                 items: cartData.items,
//             });
//             updateCartDisplay();
//         }
//     } catch (error) {
//         console.error("Error increasing quantity:", error);
//     }
// }

// // Function to remove an item from the cart
// async function removeItem(itemId) {
//     const userCartRef = getUserCartRef();
//     if (!userCartRef) return;

//     try {
//         const cartDoc = await getDoc(userCartRef);
//         const cartData = cartDoc.data();
//         const updatedItems = cartData.items.filter((item) => item.id !== itemId);

//         await updateDoc(userCartRef, {
//             items: updatedItems,
//         });
//         updateCartDisplay();
//     } catch (error) {
//         console.error("Error removing item:", error);
//     }
// }

// // Function to handle user sign-in
// async function signIn(email, password) {
//     try {
//         await signInWithEmailAndPassword(auth, email, password);
//         console.log("User signed in successfully.");
//     } catch (error) {
//         console.error("Error signing in:", error.message);
//     }
// }

// // Function to handle user sign-out
// async function signOutUser() {
//     try {
//         await signOut(auth);
//         console.log("User signed out successfully.");
//     } catch (error) {
//         console.error("Error signing out:", error.message);
//     }
// }


// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc, query, where, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

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

// Reference to the Firestore collection for the cart
const cartCollection = collection(db, "cart");

// Function to get the current user's cart reference
function getUserCartRef() {
    const user = auth.currentUser;
    if (!user) {
        console.error("No user is signed in.");
        return null;
    }
    return doc(cartCollection, user.uid); // Use user's UID as the document ID
}

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display products from the API
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

            // Add event listeners to "Add to Cart" buttons
            document.querySelectorAll('.cartBtn').forEach(button => {
                button.addEventListener('click', () => {
                    const id = button.dataset.id;
                    const title = button.dataset.title;
                    const price = parseFloat(button.dataset.price);
                    const image = button.dataset.image;

                    if (auth.currentUser) {
                        addToCart(id, title, price, image);
                    } else {
                        // Show alert if no user is signed in
                        alert("No user is signed in. Please sign in to add items to your cart.");
                    }
                });
            });
        })
        .catch((error) => {
            console.error('Error fetching products:', error);
        });

    // Listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
        const signInButton = document.getElementById('signInButton');
        const signOutButton = document.getElementById('signOutButton');
        const cart = document.getElementById('cart');

        if (user) {
            // User is signed in
            console.log("User is signed in:", user.email);
            if (signOutButton) signOutButton.style.display = 'block'; // Show Sign Out button
            if (signInButton) signInButton.style.display = 'none'; // Hide Sign In button
            updateCartDisplay(); // Update the cart display
        } else {
            // User is signed out
            console.log("No user is signed in.");
            if (signOutButton) signOutButton.style.display = 'none'; // Hide Sign Out button
            if (signInButton) signInButton.style.display = 'block'; // Show Sign In button
            if (cart) cart.innerHTML = '<p>Please sign in to view your cart.</p>'; // Update cart message
        }
    });

    // Add event listeners for sign-in and sign-out buttons
    const signInButton = document.getElementById('signInButton');
    const signOutButton = document.getElementById('signOutButton');

    if (signInButton) {
        signInButton.addEventListener('click', () => {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            signIn(email, password);
        });
    }

    if (signOutButton) {
        signOutButton.addEventListener('click', signOutUser);
    }
});

// Function to add an item to the cart
async function addToCart(id, title, price, image) {
    const userCartRef = getUserCartRef();
    if (!userCartRef) return;

    const product = {
        id: id,
        title: title,
        price: price,
        image: image,
        quantity: 1,
    };

    try {
        const cartDoc = await getDoc(userCartRef);
        if (cartDoc.exists()) {
            // Cart exists, update it
            const cartData = cartDoc.data();
            const existingItem = cartData.items.find((item) => item.id === id);

            if (existingItem) {
                // Update quantity if item exists
                existingItem.quantity += 1;
            } else {
                // Add new item to the cart
                cartData.items.push(product);
            }

            await updateDoc(userCartRef, {
                items: cartData.items,
            });
        } else {
            // Create a new cart
            await setDoc(userCartRef, {
                items: [product],
            });
        }

        updateCartDisplay();
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
}

// Function to update the cart display
async function updateCartDisplay() {
    const cart = document.getElementById('cart');
    if (!cart) return;

    cart.innerHTML = '';

    const userCartRef = getUserCartRef();
    if (!userCartRef) return;

    try {
        const cartDoc = await getDoc(userCartRef);
        if (!cartDoc.exists()) {
            cart.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        const cartData = cartDoc.data();
        let totalPrice = 0;

        cartData.items.forEach((item) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cartDetails">
                    <p>${item.title}</p>
                    <p>$${item.price}</p>
                </div>
                <div class="cartBtn">
                    <button class="decrease btn" data-id="${item.id}" data-quantity="${item.quantity}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase btn" data-id="${item.id}" data-quantity="${item.quantity}">+</button>
                    <button class="remove" data-id="${item.id}">Remove</button>
                </div>
            `;

            cart.appendChild(cartItem);
            totalPrice += item.price * item.quantity;
        });

        // Add total price display
        const totalPriceElement = document.createElement('div');
        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
        cart.appendChild(totalPriceElement);

        // Add event listeners for quantity buttons
        cart.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', () => decreaseQuantity(button.dataset.id));
        });

        cart.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', () => increaseQuantity(button.dataset.id));
        });

        cart.querySelectorAll('.remove').forEach(button => {
            button.addEventListener('click', () => removeItem(button.dataset.id));
        });

    } catch (error) {
        console.error("Error updating cart display:", error);
    }
}

// Function to decrease the quantity of an item
async function decreaseQuantity(itemId) {
    const userCartRef = getUserCartRef();
    if (!userCartRef) return;

    try {
        const cartDoc = await getDoc(userCartRef);
        const cartData = cartDoc.data();
        const itemIndex = cartData.items.findIndex((item) => item.id === itemId);

        if (itemIndex !== -1) {
            if (cartData.items[itemIndex].quantity > 1) {
                cartData.items[itemIndex].quantity -= 1;
            } else {
                cartData.items.splice(itemIndex, 1); // Remove item if quantity is 1
            }

            await updateDoc(userCartRef, {
                items: cartData.items,
            });
            updateCartDisplay();
        }
    } catch (error) {
        console.error("Error decreasing quantity:", error);
    }
}

// Function to increase the quantity of an item
async function increaseQuantity(itemId) {
    const userCartRef = getUserCartRef();
    if (!userCartRef) return;

    try {
        const cartDoc = await getDoc(userCartRef);
        const cartData = cartDoc.data();
        const itemIndex = cartData.items.findIndex((item) => item.id === itemId);

        if (itemIndex !== -1) {
            cartData.items[itemIndex].quantity += 1;
            await updateDoc(userCartRef, {
                items: cartData.items,
            });
            updateCartDisplay();
        }
    } catch (error) {
        console.error("Error increasing quantity:", error);
    }
}

// Function to remove an item from the cart
async function removeItem(itemId) {
    const userCartRef = getUserCartRef();
    if (!userCartRef) return;

    try {
        const cartDoc = await getDoc(userCartRef);
        const cartData = cartDoc.data();
        const updatedItems = cartData.items.filter((item) => item.id !== itemId);

        await updateDoc(userCartRef, {
            items: updatedItems,
        });
        updateCartDisplay();
    } catch (error) {
        console.error("Error removing item:", error);
    }
}

// Function to handle user sign-in
async function signIn(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in successfully.");
    } catch (error) {
        console.error("Error signing in:", error.message);
    }
}

// Function to handle user sign-out
async function signOutUser() {
    try {
        await signOut(auth);
        console.log("User signed out successfully.");

        setTimeout(() => {
           window.location.href="../Signin.html";
          }, 2000); // Redire
           
    } catch (error) {
        console.error("Error signing out:", error.message);
    }
}
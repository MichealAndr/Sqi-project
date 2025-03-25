

// // // Fetch products from the API
// // fetch('https://fakestoreapi.com/products')
// //     .then((res) => res.json())
// //     .then((data) => {
// //         const display = document.getElementById('display');

// //         data.forEach((product) => {
// //             const { id, image, title, category, price } = product;

// //             // Display each product
// //             display.innerHTML += `
// //                 <div class="cards">
// //                     <img src="${image}" alt="${title}" width="80px">
// //                     <div class="details">
// //                         <p>${title}</p>
// //                         <p>${category}</p>
// //                         <h3>$${price}<i class="bi bi-heart"></i></h3>
// //                     </div>
// //                 <button class="cartBtn" id="cartDisplay" onclick="increaseQuantity()" data-id="${id}" data-title="${title}" data-price="${price}" data-image="${image}">Add to Cart</button>
// //                 </div>
// //             `;
// //         });

       

// //         // Add event listeners to all "Add to Cart" buttons
// //         const addToCartButtons = document.querySelectorAll('.cartBtn');
// //         addToCartButtons.forEach((button) => {
// //             button.addEventListener('click', addToCart);
// //         });
// //     })
// //     .catch((error) => {
// //         console.error('Error fetching products:', error);
// //     });

// // // Function to add an item to the cart
// // function addToCart(event) {
// //     const product = {
// //         id: event.target.dataset.id,
// //         title: event.target.dataset.title,
// //         price: parseFloat(event.target.dataset.price),
// //         image: event.target.dataset.image,
// //         quantity: 1, // Default quantity
// //     };

// //     // Check if the item already exists in the cart
// //     const existingItem = cartItems.find((item) => item.id === product.id);
// //     if (existingItem) {
// //         existingItem.quantity += 1; // Increase quantity if item exists
// //     } else {
// //         cartItems.push(product); // Add new item to the cart
// //     }

// //     updateCartDisplay(); // Update the cart display
// //     saveCartToLocalStorage(); // Save the updated cart to localStorage
// // }

// // // Function to calculate the total price of the cart
// // function calculateTotalPrice() {
// //     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
// // }

// // // Function to update the cart display
// // function updateCartDisplay() {
// //     const cart = document.getElementById('cart');
// //     cart.innerHTML = ''; // Clear the cart display

// //     cartItems.forEach((item) => {
// //         const cartItem = document.createElement('div');
// //         cartItem.classList.add('cart-item');

// //         cartItem.innerHTML = `
// //             <img src="${item.image}" alt="${item.title}">
// //             <div>
// //                 <p>${item.title}</p>
// //                 <p>$${item.price}</p>
// //             </div>
// //             <div>
// //                 <button onclick="decreaseQuantity('${item.id}')">-</button>
// //                 <span>${item.quantity}</span>
// //                 <button onclick="increaseQuantity('${item.id}')">+</button>
// //                 <button onclick="removeItem('${item.id}')">Remove</button>
// //             </div>
// //         `;

// //         cart.appendChild(cartItem);
// //     });

//     // Display the total price
//     const totalPrice = calculateTotalPrice();
//     const totalPriceElement = document.createElement('div');
//     totalPriceElement.classList.add('total-price');
//     totalPriceElement.innerHTML = `<h3>Total: $${totalPrice}</h3>`;
//     cart.appendChild(totalPriceElement);
// }

// // Function to increase the quantity of an item
// function increaseQuantity(id) {
//     const item = cartItems.find((item) => item.id === id);
//     if (item) {
//         item.quantity += 1;
//         updateCartDisplay();
//         saveCartToLocalStorage(); // Save the updated cart to localStorage
//     }
// }

// // Function to decrease the quantity of an item
// function decreaseQuantity(id) {
//     const item = cartItems.find((item) => item.id === id);
//     if (item && item.quantity > 1) {
//         item.quantity -= 1;
//         updateCartDisplay();
//         saveCartToLocalStorage(); // Save the updated cart to localStorage
//     } else {
//         removeItem(id); // Remove the item if quantity is 1
//     }
// }

// // Function to remove an item from the cart
// function removeItem(id) {
//     cartItems = cartItems.filter((item) => item.id !== id);
//     updateCartDisplay();
//     saveCartToLocalStorage(); // Save the updated cart to localStorage
// }








// // Load cart items from localStorage when the page loads
// //loadCartFromLocalStorage();




//         // Your Firebase configuration
// //         const firebaseConfig = {
// //             apiKey: "YOUR_API_KEY",
// //             authDomain: "YOUR_AUTH_DOMAIN",
// //             projectId: "YOUR_PROJECT_ID",
// //             storageBucket: "YOUR_STORAGE_BUCKET",
// //             messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
// //             appId: "YOUR_APP_ID"
// //         };

// //         import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";

// //         // Initialize Firebase
// //         // Initialize Firebase
// //       const app = firebase.initializeApp(firebaseConfig);
// //       const auth = firebase.auth();
// //       const db = firebase.firestore();

// // console.log("Firebase initialized:", app); // Check if Firebase is initialized

// //         let currentUser = null;
// //         let cartItems = [];
// //         let CartQualtity = document.getElementById('cartQuatity');

// //         // Listen for authentication state changes
// //         auth.onAuthStateChanged((user) => {
// //             if (user) {
// //                 currentUser = user;
// //                 console.log("User logged in:", user.uid);
// //                 loadCartFromFirestore(user.uid); // Load user's cart
// //             } else {
// //                 currentUser = null;
// //                 console.log("User logged out");
// //                 cartItems = []; // Clear cart data
// //                 updateCartDisplay(); // Update cart display
// //             }
// //         });

// //         // Function to load cart data from Firestore
// //         async function loadCartFromFirestore(userId) {
// //             const cartRef = db.collection("users").doc(userId).collection("cart");
// //             const snapshot = await cartRef.get();
// //             cartItems = snapshot.docs.map((doc) => doc.data());
// //             updateCartDisplay(); // Update cart display
// //         }

// //         // Function to add an item to the cart
// //         async function addToCart(event) {
// //             if (!currentUser) {
// //                 alert("Please log in to add items to your cart.");
// //                 return;
// //             }

// //             const product = {
// //                 id: event.target.dataset.id,
// //                 title: event.target.dataset.title,
// //                 price: parseFloat(event.target.dataset.price),
// //                 image: event.target.dataset.image,
// //                 quantity: 1, // Default quantity
// //             };

// //             // Check if the item already exists in the cart
// //             const existingItem = cartItems.find((item) => item.id === product.id);
// //             if (existingItem) {
// //                 existingItem.quantity += 1; // Increase quantity if item exists
// //             } else {
// //                 cartItems.push(product); // Add new item to the cart
// //             }

// //             // Save cart to Firestore
// //             const cartRef = db.collection("users").doc(currentUser.uid).collection("cart");
// //             await cartRef.doc(product.id).set(product);

// //             updateCartDisplay(); // Update cart display
// //             showNotification(`${product.title} added to cart successfully!`);
// //         }

// //         // Function to update the cart display
// //         function updateCartDisplay() {
// //             const cart = document.getElementById('cart');
// //             cart.innerHTML = ''; // Clear the cart display

// //             cartItems.forEach((item) => {
// //                 const cartItem = document.createElement('div');
// //                 cartItem.classList.add('cart-item');

// //                 cartItem.innerHTML = `
// //                     <img src="${item.image}" alt="${item.title}">
// //                     <div>
// //                         <p>${item.title}</p>
// //                         <p>$${item.price}</p>
// //                     </div>
// //                     <div>
// //                         <button onclick="decreaseQuantity('${item.id}')">-</button>
// //                         <span>${item.quantity}</span>
// //                         <button onclick="increaseQuantity('${item.id}')">+</button>
// //                         <button onclick="removeItem('${item.id}')">Remove</button>
// //                     </div>
// //                 `;

// //                 cart.appendChild(cartItem);
// //             });

// //             // Display the total price
// //             const totalPrice = calculateTotalPrice();
// //             const totalPriceElement = document.createElement('div');
// //             totalPriceElement.classList.add('total-price');
// //             totalPriceElement.innerHTML = `<h3>Total: $${totalPrice}</h3>`;
// //             cart.appendChild(totalPriceElement);
// //         }

// //         // Function to calculate the total price of the cart
// //         function calculateTotalPrice() {
// //             return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
// //         }

// //         // Function to show a notification
// //         function showNotification(message) {
// //             const notification = document.createElement("div");
// //             notification.textContent = message;
// //             notification.style.position = "fixed";
// //             notification.style.top = "15%";
// //             notification.style.right = "0";
// //             notification.style.width = "100%";
// //             notification.style.textAlign = "center";
// //             notification.style.backgroundColor = "lightgreen";
// //             notification.style.color = "#fff";
// //             notification.style.padding = "10px";
// //             notification.style.borderRadius = "5px";
// //             notification.style.zIndex = "1000"; // Ensure it's on top of other elements

// //             document.body.appendChild(notification);

// //             // Remove the notification after 3 seconds
// //             setTimeout(() => {
// //                 notification.remove();
// //             }, 3000);
// //         }
    





// Add this at the top with other DOM element references
let cartQuantityElement = document.getElementById('cartQuantity');

// Modified addToCart function
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
        let totalQuantity = 0;

        if (cartDoc.exists()) {
            const cartData = cartDoc.data();
            const existingItem = cartData.items.find((item) => item.id === id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartData.items.push(product);
            }

            // Calculate total quantity
            totalQuantity = cartData.items.reduce((sum, item) => sum + item.quantity, 0);
            
            await updateDoc(userCartRef, {
                items: cartData.items,
            });
        } else {
            totalQuantity = 1;
            await setDoc(userCartRef, {
                items: [product],
            });
        }

        // Update cart quantity display
        if (cartQuantityElement) {
            cartQuantityElement.textContent = totalQuantity;
            cartQuantityElement.style.display = 'block';
        }

        updateCartDisplay();
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
}

// Update the updateCartDisplay function to also update the cart quantity
async function updateCartDisplay() {
    const cart = document.getElementById('cart');
    if (!cart) return;

    const userCartRef = getUserCartRef();
    if (!userCartRef) return;

    try {
        const cartDoc = await getDoc(userCartRef);
        if (!cartDoc.exists()) {
            cart.innerHTML = '<p>Your cart is empty.</p>';
            if (cartQuantityElement) {
                cartQuantityElement.textContent = '0';
            }
            return;
        }

        const cartData = cartDoc.data();
        let totalPrice = 0;
        let totalQuantity = 0;

        cart.innerHTML = '';

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
            totalQuantity += item.quantity;
        });

        // Update cart quantity display
        if (cartQuantityElement) {
            cartQuantityElement.textContent = totalQuantity;
            cartQuantityElement.style.display = totalQuantity > 0 ? 'block' : 'none';
        }

        // Add total price display
        const totalPriceElement = document.createElement('div');
        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
        cart.appendChild(totalPriceElement);

        // Add event listeners
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

// Update quantity adjustment functions to also update the cart quantity
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
                cartData.items.splice(itemIndex, 1);
            }

            await updateDoc(userCartRef, {
                items: cartData.items,
            });
            
            // Update cart quantity display
            const totalQuantity = cartData.items.reduce((sum, item) => sum + item.quantity, 0);
            if (cartQuantityElement) {
                cartQuantityElement.textContent = totalQuantity;
                cartQuantityElement.style.display = totalQuantity > 0 ? 'block' : 'none';
            }
            
            updateCartDisplay();
        }
    } catch (error) {
        console.error("Error decreasing quantity:", error);
    }
}

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
            
            // Update cart quantity display
            const totalQuantity = cartData.items.reduce((sum, item) => sum + item.quantity, 0);
            if (cartQuantityElement) {
                cartQuantityElement.textContent = totalQuantity;
                cartQuantityElement.style.display = 'block';
            }
            
            updateCartDisplay();
        }
    } catch (error) {
        console.error("Error increasing quantity:", error);
    }
}

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
        
        // Update cart quantity display
        const totalQuantity = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        if (cartQuantityElement) {
            cartQuantityElement.textContent = totalQuantity;
            cartQuantityElement.style.display = totalQuantity > 0 ? 'block' : 'none';
        }
        
        updateCartDisplay();
    } catch (error) {
        console.error("Error removing item:", error);
    }
}
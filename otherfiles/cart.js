const carticon = document.getElementById("carticon");
const cart = document.getElementById('cart-box');
const cartClose = document.getElementById('cart-close');
const order = document.getElementById('order');
const cartIcon2 = document.getElementById('cartIcon2');
const cartTotalDisplay = document.getElementById('cartDisplay');
const CartQualtity = document.getElementById('cartQuatity');

console.log(cartClose, carticon, cartClose, cartIcon2, order);

// Event listeners for cart interactions
carticon.addEventListener("click", () => cart.classList.add('active'));
cartIcon2.addEventListener("click", () => cart.classList.add('active'));
order.addEventListener("click", () => cart.classList.add('active'));
cartClose.addEventListener("click", () => cart.classList.remove('active'));






const checkout = document.getElementById('checkOut');
console.log(checkout);

const Home = document.getElementById('Home');
console.log(checkout);

checkout.addEventListener('click', () =>{
     // Redirect to another page after successful login
     setTimeout(() => {
        window.location.href = "../otherfiles/checkout.html"; // Change to your desired URL
      }, 2000); 
});

  Home.addEventListener('click', () =>{
     // Redirect to another page after successful login
     setTimeout(() => {
        window.location.href = "./landing.html"; // Change to your desired URL
      }, 2000); 
});

// //Import the necessary Firebase modules
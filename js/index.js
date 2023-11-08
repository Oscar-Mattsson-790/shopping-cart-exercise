//Variables to use
let shoppingCart = [];
let products = document.querySelectorAll(".card .button");

// Function to check if product is already in the cart
function isProductInCart(product) {
  return shoppingCart.includes(product);
}

// Event listeners for 'Add to cart' buttons
for (let i = 0; i < products.length; i++) {
  products[i].addEventListener("click", function (event) {
    let product = event.target.closest(".card").getAttribute("data-product");

    if (!isProductInCart(product)) {
      shoppingCart.push(product);
      updateCart();
    } else {
      alert("This book is already added tp the card.");
    }
  });
}

// Function to update the cart display
function updateCart() {
  document.getElementById("productsInCart").innerHTML = shoppingCart.length;
  listProductsInCart();
}

// Function to list products in the cart and add a "Remove" button
function listProductsInCart() {
  let cartProducts = "";
  for (let i = 0; i < shoppingCart.length; i++) {
    cartProducts += `<li>
      <span class="product-title">Title: </span>${shoppingCart[i]}
      <button class="remove-button" data-index="${i}">Remove product</button> 
    </li>`; // Fixed missing opening quote for class and added quotes around ${i}
  }
  document.getElementById("products").innerHTML = cartProducts;
  addRemoveButtonListeners();
}

// Add event listeners to the "Remove" buttons after the list update
function addRemoveButtonListeners() {
  let removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      let index = parseInt(event.target.getAttribute("data-index"));
      shoppingCart.splice(index, 1); // Remove the item from the cart
      updateCart(); // Update the cart display
    });
  });
}

// Toggle cart visibility
document.getElementById("open-cart").addEventListener("click", function () {
  document.getElementById("cart").classList.toggle("hide");
});

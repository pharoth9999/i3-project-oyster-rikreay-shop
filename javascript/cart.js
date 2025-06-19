// cart.js

// ✅ Add to Cart (used on index.html)
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += product.quantity;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount(); // updates the navbar count if needed
}

// ✅ Render Cart (used on cart.html)
function renderCart() {
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.querySelector(".cart-content");
  if (!cartContainer) return;

  let total = 0;

  cartData.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const productRow = document.createElement("div");
    productRow.className =
      "flex justify-between md:items-center px-4 cart-item cart-box";
    productRow.innerHTML = `
      <div class="flex flex-col items-start md:flex-row md:items-center gap-5 w-1/2">
        <img src="${item.img}" alt="" class="w-20 h-20 bg-white rounded" />
        <div class="flex flex-col gap-1 poppins-medium">
          <p class="text-sm">${item.name}</p>
          <p class="text-sm">$${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div class="w-1/4 flex flex-col items-center gap-1">
        <div class="flex items-center px-2 border border-white">
          <button onclick="changeQuantity(${index}, -1)" class="text-xl hover:text-gray-400 cursor-pointer mb-1">-</button>
          <span class="poppins-medium text-md px-6">${item.quantity}</span>
          <button onclick="changeQuantity(${index}, 1)" class="text-xl hover:text-gray-400 cursor-pointer mb-1">+</button>
        </div>
        <button onclick="removeItem(${index})" class="remove-btn text-xs text-white hover:underline mt-1 poppins-regular">Remove</button>
      </div>
      <div class="w-1/4 text-right poppins-semibold">
        <h2 class="text-sm">$${subtotal.toFixed(2)}</h2>
      </div>
    `;
    cartContainer.insertBefore(productRow, cartContainer.querySelector("hr"));
  });

  // Update total summary
  const totalText = document.querySelector(".cart-summary-total");
  if (totalText) {
    totalText.innerText = `$${total.toFixed(2)}`;
  }
}

function changeQuantity(index, amount) {
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  if (cartData[index].quantity + amount <= 0) return;

  cartData[index].quantity += amount;
  localStorage.setItem("cart", JSON.stringify(cartData));
  location.reload();
}

function removeItem(index) {
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  cartData.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartData));
  location.reload();
}

// Run renderCart automatically on cart.html
window.addEventListener("DOMContentLoaded", renderCart);

function updateCartCount() {
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cartData.reduce((acc, item) => acc + item.quantity, 0);

  const cartCountElem = document.getElementById("cart-count");
  if (cartCountElem) {
    cartCountElem.textContent = count;
    cartCountElem.style.display = count > 0 ? "flex" : "none";
  }
}

// Call on page load
window.addEventListener("DOMContentLoaded", updateCartCount);

// Also update count after adding item
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  // Optional: redirect to cart page
  // window.location.href = "cart.html";
}


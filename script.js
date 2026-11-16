
let cart = [];
let selectedCategory = "All";

// ADD TO CART
function addToCart(productName, price) {
    cart.push({
        name: productName,
        price: price
    });

    updateCart();
    alert(productName + " added to your cart!");
}

// UPDATE CART
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    cartCount.textContent = cart.length;

    if (cart.length === 0) {
        cartItems.innerHTML = "Your cart is empty.";
        cartTotal.textContent = "Total: PKR 0";
        return;
    }

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>PKR ${item.price.toLocaleString("en-PK")}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        </div>
    `).join("");

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    cartTotal.textContent =
        "Total: PKR " + total.toLocaleString("en-PK");
}

// REMOVE FROM CART
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// SEARCH AND FILTER PRODUCTS
function filterProducts() {
    const searchInput = document
        .getElementById("product-search")
        .value.toLowerCase()
        .trim();

    const products = document.querySelectorAll(".product");

    let visibleCount = 0;

    products.forEach(product => {
        const name = product.querySelector("h3").textContent.toLowerCase();
        const category = product.dataset.category;

        const matchesSearch = name.includes(searchInput);

        const matchesCategory =
            selectedCategory === "All" ||
            category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            product.style.display = "";
            visibleCount++;
        } else {
            product.style.display = "none";
        }
    });

    let message = document.getElementById("no-products");

    if (!message) {
        message = document.createElement("p");
        message.id = "no-products";
        message.className = "no-products";
        message.textContent = "No flowers found. Try another search!";

        document.querySelector(".product-container").appendChild(message);
    }

    message.style.display = visibleCount === 0 ? "block" : "none";
}

// FILTER BUTTONS
document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", function() {
        selectedCategory = this.dataset.filter;

        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        filterProducts();
    });
});

// CATEGORY CIRCLES
document.querySelectorAll(".category-card").forEach(category => {
    category.addEventListener("click", function() {
        selectedCategory = this.dataset.filter;

        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.toggle(
                "active",
                btn.dataset.filter === selectedCategory
            );
        });

        filterProducts();
    });
});

// SEARCH INPUT
document.getElementById("product-search")
    .addEventListener("input", filterProducts);

// CONTACT FORM
function sendMessage(event) {
    event.preventDefault();

    alert("Thank you for contacting Flower Haven!");

    event.target.reset();
}

// NEWSLETTER
function subscribeNewsletter(event) {
    event.preventDefault();

    alert("Thank you for joining Flower Haven!");

    event.target.reset();
}

// INITIAL CART DISPLAY
updateCart();

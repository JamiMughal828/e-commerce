// ========================================
// SHOP EASE - E-COMMERCE JAVASCRIPT
// ========================================


// ========================================
// PRODUCTS DATA
// ========================================

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 5999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 7499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 3,
        name: "Classic T-Shirt",
        category: "fashion",
        price: 2499,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 4,
        name: "Denim Jacket",
        category: "fashion",
        price: 4999,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 5,
        name: "Running Shoes",
        category: "shoes",
        price: 6999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 6,
        name: "White Sneakers",
        category: "shoes",
        price: 5999,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 7,
        name: "Leather Backpack",
        category: "accessories",
        price: 3999,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 8,
        name: "Premium Sunglasses",
        category: "accessories",
        price: 2999,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
    }

];


// ========================================
// CART
// ========================================

let cart = [];


// ========================================
// DISPLAY PRODUCTS
// ========================================

function displayProducts(productList) {

    const productsGrid = document.getElementById("productsGrid");

    productsGrid.innerHTML = "";

    if (productList.length === 0) {

        productsGrid.innerHTML = `
            <div class="no-products">
                <div class="no-product-icon">🔍</div>
                <h3>No Products Found</h3>
                <p>Try another search or category.</p>
            </div>
        `;

        return;
    }


    productList.forEach((product, index) => {

        const productCard = document.createElement("div");

        productCard.className = "product-card";

        productCard.style.animationDelay = `${index * 0.08}s`;


        productCard.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <span class="product-badge">
                    NEW
                </span>

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <div class="product-bottom">

                    <strong>
                        Rs. ${product.price.toLocaleString()}
                    </strong>

                    <button
                        class="add-cart-btn"
                        onclick="addToCart(${product.id}, this)"
                    >
                        🛒 Add
                    </button>

                </div>

            </div>

        `;


        productsGrid.appendChild(productCard);

    });

}


// ========================================
// ADD TO CART
// ========================================

function addToCart(productId, button) {

    const product = products.find(
        product => product.id === productId
    );


    if (!product) {
        return;
    }


    const existingProduct = cart.find(
        item => item.id === productId
    );


    // Button Animation
    if (button) {

        button.classList.add("clicked");

        setTimeout(() => {
            button.classList.remove("clicked");
        }, 400);

    }


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    // Update cart
    updateCart();


    // Toast
    showToast(
        `${product.name} added to cart ✓`
    );


    // Cart Bounce Animation
    animateCartButton();

}


// ========================================
// CART BUTTON ANIMATION
// ========================================

function animateCartButton() {

    const cartButton =
        document.querySelector(".cart-btn");


    if (!cartButton) {
        return;
    }


    cartButton.classList.remove("cart-animation");


    // Force browser reflow
    void cartButton.offsetWidth;


    cartButton.classList.add("cart-animation");


    setTimeout(() => {

        cartButton.classList.remove(
            "cart-animation"
        );

    }, 600);

}


// ========================================
// UPDATE CART
// ========================================

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");


    // Total Quantity
    const totalItems = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    cartCount.textContent = totalItems;


    // Cart Count Animation
    cartCount.classList.remove("count-animation");

    void cartCount.offsetWidth;

    cartCount.classList.add("count-animation");


    // Empty Cart
    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add some products to your cart.
                </p>

            </div>

        `;


        calculateTotal();

        return;
    }


    // Cart Items
    cartItems.innerHTML = "";


    cart.forEach((item, index) => {

        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.style.animationDelay =
            `${index * 0.08}s`;


        cartItem.innerHTML = `

            <div class="cart-product">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div>

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        Rs. ${item.price.toLocaleString()}
                    </p>

                </div>

            </div>


            <div class="quantity-control">

                <button
                    onclick="changeQuantity(${item.id}, -1)"
                >
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(${item.id}, 1)"
                >
                    +
                </button>

            </div>


            <strong class="item-total">

                Rs.
                ${(item.price * item.quantity)
                    .toLocaleString()}

            </strong>


            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})"
                title="Remove"
            >
                ✕
            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    calculateTotal();

}


// ========================================
// CHANGE QUANTITY
// ========================================

function changeQuantity(productId, amount) {

    const product =
        cart.find(item => item.id === productId);


    if (!product) {
        return;
    }


    product.quantity += amount;


    // Quantity animation
    animateQuantity();


    if (product.quantity <= 0) {

        cart = cart.filter(
            item => item.id !== productId
        );

        showToast("Product removed from cart");

    }


    updateCart();

}


// ========================================
// QUANTITY ANIMATION
// ========================================

function animateQuantity() {

    const quantityNumbers =
        document.querySelectorAll(
            ".quantity-control span"
        );


    quantityNumbers.forEach(number => {

        number.classList.remove(
            "quantity-animation"
        );

        void number.offsetWidth;

        number.classList.add(
            "quantity-animation"
        );

    });

}


// ========================================
// REMOVE PRODUCT
// ========================================

function removeFromCart(productId) {

    const cartItem =
        event?.target?.closest(".cart-item");


    if (cartItem) {

        cartItem.classList.add(
            "remove-animation"
        );

    }


    setTimeout(() => {

        cart = cart.filter(
            item => item.id !== productId
        );


        updateCart();


        showToast(
            "Product removed from cart"
        );

    }, 350);

}


// ========================================
// CALCULATE TOTAL
// ========================================

function calculateTotal() {

    const subtotalElement =
        document.getElementById("subtotal");

    const shippingElement =
        document.getElementById("shipping");

    const totalElement =
        document.getElementById("total");


    let subtotal = 0;


    cart.forEach(item => {

        subtotal +=
            item.price * item.quantity;

    });


    let shipping = 0;


    if (subtotal > 0) {

        shipping = 250;

    }


    const total =
        subtotal + shipping;


    // Animate price update
    animatePrice(subtotalElement);

    animatePrice(shippingElement);

    animatePrice(totalElement);


    subtotalElement.textContent =
        `Rs. ${subtotal.toLocaleString()}`;


    shippingElement.textContent =
        `Rs. ${shipping.toLocaleString()}`;


    totalElement.textContent =
        `Rs. ${total.toLocaleString()}`;

}


// ========================================
// PRICE ANIMATION
// ========================================

function animatePrice(element) {

    if (!element) {
        return;
    }


    element.classList.remove(
        "price-animation"
    );


    void element.offsetWidth;


    element.classList.add(
        "price-animation"
    );

}


// ========================================
// SEARCH PRODUCTS
// ========================================

function searchProducts() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();


    const filteredProducts =
        products.filter(product => {

            return (

                product.name
                    .toLowerCase()
                    .includes(searchValue)

                ||

                product.category
                    .toLowerCase()
                    .includes(searchValue)

            );

        });


    displayProducts(
        filteredProducts
    );


    // Search animation
    const grid =
        document.getElementById(
            "productsGrid"
        );


    grid.classList.remove(
        "products-refresh"
    );


    void grid.offsetWidth;


    grid.classList.add(
        "products-refresh"
    );

}


// ========================================
// FILTER PRODUCTS
// ========================================

function filterProducts(
    category,
    button
) {

    // Remove active class
    document
        .querySelectorAll(".filter")
        .forEach(btn => {

            btn.classList.remove(
                "active"
            );

        });


    // Add active class
    if (button) {

        button.classList.add(
            "active"
        );


        button.classList.add(
            "filter-click"
        );


        setTimeout(() => {

            button.classList.remove(
                "filter-click"
            );

        }, 300);

    }


    const searchInput =
        document.getElementById(
            "searchInput"
        );


    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();


    let filteredProducts = products;


    // Category Filter
    if (category !== "all") {

        filteredProducts =
            filteredProducts.filter(
                product =>
                    product.category === category
            );

    }


    // Search Filter
    if (searchValue !== "") {

        filteredProducts =
            filteredProducts.filter(
                product =>
                    product.name
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    product.category
                        .toLowerCase()
                        .includes(searchValue)
            );

    }


    displayProducts(
        filteredProducts
    );

}


// ========================================
// MOBILE MENU
// ========================================

function toggleMenu() {

    const navMenu =
        document.getElementById(
            "navMenu"
        );


    navMenu.classList.toggle(
        "active"
    );


    const menuButton =
        document.querySelector(
            ".menu-btn"
        );


    if (
        navMenu.classList.contains(
            "active"
        )
    ) {

        menuButton.textContent = "✕";

    } else {

        menuButton.textContent = "☰";

    }

}


// ========================================
// CLOSE MOBILE MENU
// ========================================

document
    .querySelectorAll("#navMenu a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                const navMenu =
                    document.getElementById(
                        "navMenu"
                    );


                navMenu.classList.remove(
                    "active"
                );


                const menuButton =
                    document.querySelector(
                        ".menu-btn"
                    );


                menuButton.textContent =
                    "☰";

            }
        );

    });


// ========================================
// SCROLL TO CART
// ========================================

function scrollToCart() {

    const cartSection =
        document.getElementById("cart");


    cartSection.scrollIntoView({

        behavior: "smooth"

    });


    cartSection.classList.remove(
        "section-highlight"
    );


    setTimeout(() => {

        cartSection.classList.add(
            "section-highlight"
        );

    }, 500);


    setTimeout(() => {

        cartSection.classList.remove(
            "section-highlight"
        );

    }, 1500);

}


// ========================================
// CHECKOUT
// ========================================

function checkout() {

    if (cart.length === 0) {

        showToast(
            "Your cart is empty!"
        );

        return;

    }


    const checkoutButton =
        document.querySelector(
            ".checkout-btn"
        );


    checkoutButton.classList.add(
        "checkout-animation"
    );


    setTimeout(() => {

        checkoutButton.classList.remove(
            "checkout-animation"
        );

    }, 700);


    showToast(
        "Checkout started successfully ✓"
    );


    // Demo checkout
    setTimeout(() => {

        alert(
            "Thank you for shopping with ShopEase! 🛍️\n\nYour order is ready for checkout."
        );

    }, 500);

}


// ========================================
// CONTACT FORM
// ========================================

function sendMessage(event) {

    event.preventDefault();


    const form =
        event.target;


    const button =
        form.querySelector(
            "button"
        );


    // Button animation
    button.classList.add(
        "send-animation"
    );


    setTimeout(() => {

        button.classList.remove(
            "send-animation"
        );

    }, 600);


    showToast(
        "Message sent successfully ✓"
    );


    // Form success animation
    form.classList.add(
        "form-success"
    );


    setTimeout(() => {

        form.classList.remove(
            "form-success"
        );


        form.reset();

    }, 1000);

}


// ========================================
// TOAST MESSAGE
// ========================================

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.textContent =
        message;


    toast.classList.remove(
        "show"
    );


    void toast.offsetWidth;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer = setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 2500);

}


// ========================================
// SCROLL REVEAL ANIMATION
// ========================================

function revealOnScroll() {

    const elements =
        document.querySelectorAll(
            ".section-heading, .contact-info, .contact-form, .cart-summary"
        );


    elements.forEach(element => {

        const elementTop =
            element.getBoundingClientRect().top;


        const windowHeight =
            window.innerHeight;


        if (
            elementTop <
            windowHeight - 100
        ) {

            element.classList.add(
                "scroll-visible"
            );

        }

    });

}


// Run when scrolling
window.addEventListener(
    "scroll",
    revealOnScroll
);


// Run on page load
window.addEventListener(
    "load",
    revealOnScroll
);


// ========================================
// SMOOTH NAVIGATION
// ========================================

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            function(event) {

                const targetId =
                    this.getAttribute(
                        "href"
                    );


                if (
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({

                        behavior: "smooth"

                    });

                }

            }
        );

    });


// ========================================
// BUTTON CLICK EFFECT
// ========================================

document.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest(
                "button"
            );


        if (!button) {
            return;
        }


        button.classList.remove(
            "button-click"
        );


        void button.offsetWidth;


        button.classList.add(
            "button-click"
        );


        setTimeout(() => {

            button.classList.remove(
                "button-click"
            );

        }, 250);

    }
);


// ========================================
// PRODUCT IMAGE ERROR HANDLER
// ========================================

document.addEventListener(
    "error",
    function(event) {

        if (
            event.target.tagName === "IMG"
        ) {

            event.target.src =
                "https://via.placeholder.com/600x500?text=Product";

        }

    },
    true
);


// ========================================
// INITIALIZE WEBSITE
// ========================================

displayProducts(products);

updateCart();

revealOnScroll();


// ========================================
// PAGE LOAD ANIMATION
// ========================================

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);
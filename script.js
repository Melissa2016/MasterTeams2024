// Global variables for cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.getElementById("cart-count");

// Update cart count in the cart icon
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Add item to cart with size
function addToCart(name, price, size) {
    cart.push({ name, price: parseFloat(price), size });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${name} (Size: ${size}) has been added to your cart!`);
}

// Load cart items into the cart page
function loadCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    if (!cartItems) return; // Exit if not on the cart page

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <span>${item.name} (Size: ${item.size})</span>
            <span>$${item.price.toFixed(2)}</span>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price;
    });

    totalPrice.textContent = `$${total.toFixed(2)}`;

    // Attach remove functionality
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
            updateCartCount();
        });
    });
}

// Load checkout items and show total
function loadCheckout() {
    const checkoutItems = document.getElementById("checkout-items");
    const checkoutTotalPrice = document.getElementById("checkout-total-price");

    checkoutItems.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        const checkoutItem = document.createElement("div");
        checkoutItem.className = "checkout-item";
        checkoutItem.innerHTML = `
            <span>${item.name} (Size: ${item.size})</span>
            <span>$${item.price.toFixed(2)}</span>
        `;
        checkoutItems.appendChild(checkoutItem);
        total += item.price;
    });

    checkoutTotalPrice.textContent = `$${total.toFixed(2)}`;

    // Set hidden fields for order details and total price
    const orderDetails = cart.map(item => `${item.name} (Size: ${item.size}) - $${item.price.toFixed(2)}`).join("\n");
    document.getElementById("order-details").value = orderDetails;
    document.getElementById("total-price-input").value = total.toFixed(2);
}

// On the cart page, handle "Checkout" and "Continue Shopping"
function setupCartPage() {
    const continueShopping = document.getElementById("continue-shopping");
    const checkout = document.getElementById("checkout");

    if (continueShopping) {
        continueShopping.addEventListener("click", () => {
            window.location.href = "shop.html";
        });
    }

    if (checkout) {
        checkout.addEventListener("click", () => {
            window.location.href = "checkout.html";
        });
    }
}

// On the checkout page, handle form submission
function setupCheckoutPage() {
    const checkoutForm = document.getElementById("checkout-form");
    const continueShopping = document.getElementById("continue-shopping");
    const confirmationMessage = document.getElementById("confirmation-message");

    if (continueShopping) {
        continueShopping.addEventListener("click", () => {
            window.location.href = "shop.html";
        });
    }

    if (checkoutForm) {
        checkoutForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Get form data
            const name = document.getElementById("name").value;
            const address = document.getElementById("address").value;
            const email = document.getElementById("email").value;

            // Prepare order details
            const orderDetails = cart.map(item => `${item.name} (Size: ${item.size}) - $${item.price.toFixed(2)}`).join("\n");
            const totalPrice = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

            // Send email using web3forms API
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    access_key: "5ee3d9ce-182e-4515-9581-68be29efc36b", // Replace with your access key
                    name: name,
                    email: email, // Ensure the email is sent to the user's provided email address
                    message: `Order Details:\n${orderDetails}\n\nTotal: $${totalPrice}\n\nShipping Address: ${address}`,
                    subject: "Your P.A.R.T.S Order Invoice", // Add a subject for the email
                    from_name: "P.A.R.T.S", // Add a from name for the email
                    reply_to: email // Ensure replies go to the user's email
                })
            });

            const result = await response.json();
            console.log(result); // Debugging: Log the result

            if (result.success) {
                // Display confirmation message
                confirmationMessage.style.display = "block";

                // Clear cart after purchase
                cart = [];
                localStorage.setItem("cart", JSON.stringify(cart));

                // Redirect to shop page after a delay
                setTimeout(() => {
                    window.location.href = "shop.html";
                }, 5000); // Redirect after 5 seconds
            } else {
                alert("Failed to send confirmation email. Please try again.");
            }
        });
    }
}

// On the shop page, handle "Add to Cart" with size selection
function setupShopPage() {
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const name = button.dataset.name;
            const price = button.dataset.price;

            // Get the selected size
            const sizeOptions = button.closest(".shop-card").querySelector(".size-options");
            const selectedSize = sizeOptions.querySelector(".size-btn.active")?.dataset.size;

            if (!selectedSize) {
                alert("Please select a size before adding to cart.");
                return;
            }

            addToCart(name, price, selectedSize);
        });
    });

    // Add event listeners to size buttons
    document.querySelectorAll(".size-btn").forEach(sizeButton => {
        sizeButton.addEventListener("click", (e) => {
            // Remove active class from all size buttons in the same card
            const sizeOptions = e.target.closest(".size-options");
            sizeOptions.querySelectorAll(".size-btn").forEach(btn => btn.classList.remove("active"));

            // Add active class to the clicked size button
            e.target.classList.add("active");
        });
    });
}

// Initialize functionality based on the page
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    if (window.location.pathname.includes("shop.html")) {
        setupShopPage();
    }

    if (window.location.pathname.includes("cart.html")) {
        loadCart();
        setupCartPage();
    }

    if (window.location.pathname.includes("checkout.html")) {
        loadCheckout();
        setupCheckoutPage();
    }
});

// Function to toggle book sets and dynamically load books
function toggleBookSet(setNumber, books) {
    const bookSets = document.getElementById(`book-sets-${setNumber}`);
    const bookContent = document.getElementById(`book-content-${setNumber}`);

    // Clear previous content
    bookContent.innerHTML = "";

    // Create book items dynamically
    books.forEach((book) => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("book-item");

        bookItem.innerHTML = `
            <img src="${book.img}" alt="${book.title}" class="book-cover">
            <h3>${book.title}</h3>

            <!-- PDF Viewer Embed (Initially Hidden) -->
            <div class="pdf-viewer" id="pdf-viewer-${book.title}" style="display:none;">
                <iframe src="${book.pdf}" width="600" height="400" frameborder="0">Your browser does not support PDF viewing.</iframe>
            </div>

            <!-- Download Buttons -->
            <div class="download-buttons">
                <a href="javascript:void(0);" class="btn pdf" onclick="showPDF('${book.pdf}')">
                    <i class="fas fa-file-pdf"></i> View PDF
                </a>
                <a href="${book.ppt}" class="btn ppt" target="_blank">
                    <i class="fas fa-file-powerpoint"></i> Download PPT
                </a>
            </div>
        `;

        bookContent.appendChild(bookItem);
    });

    // Toggle visibility
    bookSets.classList.toggle("hidden");
}

// Function to show the PDF in a new window
function showPDF(pdfFile) {
    // Open the PDF in a new window with fullscreen mode
    window.open(pdfFile, '_blank', 'fullscreen=yes, width=1200, height=800');
}

// Add event listeners and book data for each set
const booksSet1 = [
    { title: "Set 1", img: "assets/Sets/Set1/cover-image set1.png", pdf: "assets/Sets/Set1/Set 1.pdf", ppt: "assets/Sets/Set1/Set 1.pptx" },
];
document.getElementById("set-1-category").addEventListener("click", () => toggleBookSet(1, booksSet1));

const booksSet2 = [
    { title: "Set 2", img: "assets/Sets/Set2/cover-image set2.png", pdf: "assets/Sets/Set2/Set 2.pdf", ppt: "assets/Sets/Set2/Set 2.pptx" },
];
document.getElementById("set-2-category").addEventListener("click", () => toggleBookSet(2, booksSet2));

const booksSet3 = [
    { title: "Set 3", img: "assets/Sets/Set3/Cover Image.png", pdf: "assets/Sets/Set3/Set 3.pdf", ppt: "assets/Sets/Set3/Set 3.pptx" },
];
document.getElementById("set-3-category").addEventListener("click", () => toggleBookSet(3, booksSet3));

const booksSet4 = [
    { title: "Set 4", img: "assets/Sets/Set4/Cover Image.png", pdf: "assets/Sets/Set4/Set 4.pdf", ppt: "assets/Sets/Set4/Set 4.pptx" },
];
document.getElementById("set-4-category").addEventListener("click", () => toggleBookSet(4, booksSet4));

const booksSet5 = [
    { title: "Set 5", img: "assets/Sets/Set5/Cover Image.png", pdf: "assets/Sets/Set5/Set 5.pdf", ppt: "assets/Sets/Set5/Set 5.pptx" },
];
document.getElementById("set-5-category").addEventListener("click", () => toggleBookSet(5, booksSet5));

const booksSet6 = [
    { title: "Set 6", img: "images/book-6a.jpg", pdf: "book-6a.pdf", ppt: "book-6a.ppt" },
];
document.getElementById("set-6-category").addEventListener("click", () => toggleBookSet(6, booksSet6));

const booksSet7 = [
    { title: "Set 7", img: "images/book-7a.jpg", pdf: "book-7a.pdf", ppt: "book-7a.ppt" },
];
document.getElementById("set-7-category").addEventListener("click", () => toggleBookSet(7, booksSet7));

// Form Validation for Name
function validateName() {
    const nameInput = document.getElementById('name');
    const errorMessage = document.getElementById('name-error');
    const regex = /^[A-Za-z\s]+$/;

    if (nameInput.value && !regex.test(nameInput.value)) {
        errorMessage.style.display = 'inline';
    } else {
        errorMessage.style.display = 'none';
    }
}

// Form Validation for Email
function validateEmail() {
    const emailInput = document.getElementById('email');
    const errorMessage = document.getElementById('email-error');
    const regex = /^[a-zA-Z.]+@[a-zA-Z]+\.[a-zA-Z]+$/;

    if (emailInput.value && !regex.test(emailInput.value)) {
        errorMessage.style.display = 'inline';
    } else {
        errorMessage.style.display = 'none';
    }
}

// Contact Form Submission Handling
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Check if all fields are filled
        if (name && email && message) {
            document.getElementById('response-message').innerText =
                `Thank you for contacting us, ${name}! We’ll get back to you soon.`;
            contactForm.reset(); // Reset the form
        } else {
            document.getElementById('response-message').innerText =
                'Please fill out all fields.';
        }
    });
});

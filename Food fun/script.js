// DOM Elements
const header = document.querySelector('.header');
const currentYearElement = document.getElementById('currentYear');
const toggleBtn = document.getElementById('darkModeToggle');
const searchButtonIcon = document.querySelector('.search-button .icon');
const featuresContent = document.querySelector('.features-content'); // Correct selector for the section

const cartSidebar = document.getElementById('cartSidebar');
const closeCartSidebar = document.getElementById('closeCartSidebar');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const checkoutButton = document.getElementById('checkoutButton');

// Array to store cart items
const cartItems = [];

// Header scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Animation on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll('.feature-card, .info-card, .section-header');

  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (elementPosition < screenHeight * 0.9) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
}

// Initial animation check
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Scroll event for animations
window.addEventListener('scroll', animateOnScroll);

// Function to filter menu items
function filterMenuItems() {
  const searchInput = document.getElementById('menuSearch').value.toLowerCase();
  const menuItems = document.querySelectorAll('.menu-item'); // Adjust selector based on your menu item class

  menuItems.forEach(item => {
    const itemText = item.textContent.toLowerCase();
    if (itemText.includes(searchInput)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

function redirectToMenu() {
  window.location.href = "menu.html";
}

toggleBtn.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  const header = document.querySelector('.header');
  header.classList.toggle('dark'); // Add dark mode styling to the header

  // Change the search icon color
  if (document.documentElement.classList.contains('dark')) {
    searchButtonIcon.style.stroke = '#fff'; // Set icon color to white in dark mode
  } else {
    searchButtonIcon.style.stroke = '#000'; // Set icon color to black in light mode
  }

  // Optional: Save user preference in localStorage
  if (document.documentElement.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
    const header = document.querySelector('.header');
    header.classList.add('dark'); // Ensure header is in dark mode on page load
    searchButtonIcon.style.stroke = '#fff'; // Set icon color to white on page load
    if (featuresContent) {
      featuresContent.classList.add('dark'); // Ensure section is in dark mode on page load
    }
  } else {
    searchButtonIcon.style.stroke = '#000'; // Set icon color to black on page load
  }
});



// Function to Add Item to Cart
function addToCart(itemName, itemPrice) {
  const item = { name: itemName, price: parseFloat(itemPrice) };
  cartItems.push(item);
  updateCart();
  openCartSidebar(); // Open the cart sidebar when an item is added
}

// Function to Remove Item from Cart
function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCart();
}

// Function to Update Cart
function updateCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotalElement = document.getElementById('cartTotal');

  // Clear existing cart items
  cartItemsContainer.innerHTML = '';

  // Add updated cart items
  let total = 0;
  cartItems.forEach((item, index) => {
    total += item.price;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <span class="item-name">${item.name}</span>
      <span class="item-price">Rs: ${item.price.toFixed(2)}</span>
      <button class="remove-button" onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  // Update total price
  cartTotalElement.textContent = total.toFixed(2);
}

// Function to Open Cart Sidebar
function openCartSidebar() {
  const cartSidebar = document.getElementById('cartSidebar');
  cartSidebar.classList.add('visible'); // Add the 'visible' class to show the sidebar
}

// Function to Close Cart Sidebar
function closeCartSidebarHandler() {
  const cartSidebar = document.getElementById('cartSidebar');
  cartSidebar.classList.remove('visible'); // Remove the 'visible' class to hide the sidebar
}

// Add Event Listeners for Cart Toggle and Close Buttons
document.addEventListener('DOMContentLoaded', () => {
  const cartToggleButton = document.getElementById('cartToggleButton');
  const closeCartSidebar = document.getElementById('closeCartSidebar');

  if (cartToggleButton) {
    cartToggleButton.addEventListener('click', openCartSidebar);
  } else {
    console.error('Cart Toggle Button not found in the DOM.');
  }

  if (closeCartSidebar) {
    closeCartSidebar.addEventListener('click', closeCartSidebarHandler);
  } else {
    console.error('Close Cart Sidebar button not found in the DOM.');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const checkoutButton = document.getElementById('checkoutButton');

  // Checkout Button Event Listener
  checkoutButton.addEventListener('click', () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    alert('Thank you for your order!');
    cartItems.length = 0; // Clear the cart
    updateCart();
    closeCartSidebarHandler(); // Close the cart sidebar
  });
});





// DOM Elements
const header = document.querySelector('.header');
const currentYearElement = document.getElementById('currentYear');
const toggleBtn = document.getElementById('darkModeToggle');

// --- Dark Mode Functionality ---
function setDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add('dark-mode');
    if (toggleBtn) toggleBtn.innerHTML = '☀️ Light Mode';
    localStorage.setItem('darkMode', 'enabled');
  } else {
    document.body.classList.remove('dark-mode');
    if (toggleBtn) toggleBtn.innerHTML = '🌙 Dark Mode';
    localStorage.setItem('darkMode', 'disabled');
  }
}

function toggleDarkMode() {
  const isDark = document.body.classList.contains('dark-mode');
  setDarkMode(!isDark);
}

// Set initial mode on load
window.addEventListener('DOMContentLoaded', () => {
  const darkPref = localStorage.getItem('darkMode');
  setDarkMode(darkPref === 'enabled');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleDarkMode);
  }
});
const searchButtonIcon = document.querySelector('.search-button .icon');
const featuresContent = document.querySelector('.features-content'); // Correct selector for the section

const cartSidebar = document.getElementById('cartSidebar');
const closeCartSidebar = document.getElementById('closeCartSidebar');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const checkoutButton = document.getElementById('checkoutButton');

// Array to store cart items (persisted per user)
let cartItems = [];

// --- Search Bar Filtering Everywhere ---
function setupSearchBarFiltering() {
  // The header may be loaded dynamically, so wait until it's present
  const observer = new MutationObserver(() => {
    const searchInput = document.getElementById('menuSearch');
    if (searchInput && !searchInput.hasAttribute('data-search-handler')) {
      searchInput.addEventListener('input', filterMenuItems);
      searchInput.setAttribute('data-search-handler', 'true');
    }
  }); // <-- Close the arrow function here
  observer.observe(document.body, { childList: true, subtree: true });
  // Also try to attach immediately in case header is already present
  window.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('menuSearch');
    if (searchInput && !searchInput.hasAttribute('data-search-handler')) {
      searchInput.addEventListener('input', filterMenuItems);
      searchInput.setAttribute('data-search-handler', 'true');
    }
  });
}
setupSearchBarFiltering();

function getCartKey() {
  const userStr = sessionStorage.getItem('currentUser');
  if (!userStr) return null;
  const user = JSON.parse(userStr);
  return `cartItems_${user.email}`;
}

function loadCart() {
  const key = getCartKey();
  if (!key) {
    cartItems = [];
    return;
  }
  const saved = sessionStorage.getItem(key);
  cartItems = saved ? JSON.parse(saved) : [];
}

function saveCart() {
  const key = getCartKey();
  if (!key) return;
  sessionStorage.setItem(key, JSON.stringify(cartItems));
}

// Load cart on page load
window.addEventListener('DOMContentLoaded', loadCart);

// Header scroll effect
window.addEventListener('scroll', () => {
  if (!header) return;
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



function loginbtn(){
  window.location.href = "login.html";
}


  // CART BUTTONS
  const cartButtons = document.querySelectorAll(".icon-button[title='Cart']");
  cartButtons.forEach(btn => btn.addEventListener('click', openCartSidebar));
  if (closeCartSidebar) {
    closeCartSidebar.addEventListener('click', closeCartSidebarHandler);
  }

  // CHECKOUT BUTTON
  if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
      if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
      }
      alert('Thank you for your order!');
      cartItems.length = 0; // Clear the cart
      saveCart();
      updateCart();
      closeCartSidebarHandler(); // Close the cart sidebar
    });
  }

  // ANIMATION ON SCROLL
  animateOnScroll();

  // Display current user profile in header
  displayUserProfile();


// Import Firebase auth functions if script is loaded as a module
let auth, signOut;
try {
  import('./firebase-config.js')
    .then(module => {
      auth = module.auth;
      signOut = module.signOut;
    })
    .catch(error => {
      console.error('Error importing Firebase modules:', error);
    });
} catch (error) {
  console.log('Running in non-module context');
}

// Function to display user profile in header
function displayUserProfile() {
  const header = document.querySelector('.header .header-container');
  if (!header) return;

  // Remove existing user profile if any
  const oldProfile = document.getElementById('userProfileBox');
  if (oldProfile) oldProfile.remove();

  const userStr = sessionStorage.getItem('currentUser');
  if (userStr) {
    const user = JSON.parse(userStr);
    // Create profile box
    const profileBox = document.createElement('div');
    profileBox.id = 'userProfileBox';
    profileBox.className = 'user-profile-box';
    profileBox.innerHTML = `
      <span class="user-avatar">👤</span>
      <span class="user-name">${user.email || user.name || 'User'}</span>
      <button id="logoutBtn" class="logout-btn" title="Logout">Logout</button>
    `;
    // Insert before dark mode toggle if exists, else at end
    const darkToggle = document.getElementById('darkModeToggle');
    if (darkToggle) { 
      header.insertBefore(profileBox, darkToggle);
    } else {
      header.appendChild(profileBox);
    }
    // Logout functionality
    document.getElementById('logoutBtn').onclick = async function() {
      try {
        // Try to sign out with Firebase if available
        if (auth && signOut) {
          await signOut(auth);
        }
        // Remove user-specific cart
        const userStr = sessionStorage.getItem('currentUser');
        if (userStr) {
          const user = JSON.parse(userStr);
          sessionStorage.removeItem(`cartItems_${user.email}`);
        }
        // Clear session storage regardless of Firebase availability
        sessionStorage.removeItem('currentUser');
        window.location.reload();
      } catch (error) {
        console.error('Error during logout:', error);
        // Fallback to traditional logout if Firebase fails
        sessionStorage.removeItem('currentUser');
        window.location.reload();
      }
    };
  }
}


// Function to Add Item to Cart
function addToCart(itemName, itemPrice) {
  // Check if user is logged in
  const currentUser = sessionStorage.getItem('currentUser');
  if (!currentUser) {
    // Not logged in: ask to login
    if (confirm('You must be logged in to add items to cart. Do you want to login now?')) {
      // Redirect to login page
      window.location.href = 'login.html';
    }
    return;
  }
  // User is logged in
  const item = { name: itemName, price: parseFloat(itemPrice) };
  cartItems.push(item);
  saveCart();
  updateCart();
  openCartSidebar(); // Open the cart sidebar when an item is added
}


// Function to Remove Item from Cart
function removeFromCart(index) {
  cartItems.splice(index, 1);
  saveCart();
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

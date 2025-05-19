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
  });
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

document.addEventListener('DOMContentLoaded', () => {
  // DARK MODE THEME LOAD
  // Add smooth transition for theme changes
  document.documentElement.style.transition = 'background-color 0.3s, color 0.3s';
  if (featuresContent) featuresContent.style.transition = 'background-color 0.3s, color 0.3s';
  const headerEl = document.querySelector('.header');
  if (headerEl) headerEl.style.transition = 'background-color 0.3s, color 0.3s';

  // Helper to update UI for theme
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark');
      if (headerEl) headerEl.classList.add('dark');
      if (typeof updateSearchIconsColor === 'function') {
        updateSearchIconsColor('#fff');
      } else if (typeof searchButtonIcon !== 'undefined' && searchButtonIcon) {
        searchButtonIcon.style.stroke = '#fff';
      }
      if (featuresContent) featuresContent.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
      if (headerEl) headerEl.classList.remove('dark');
      if (typeof updateSearchIconsColor === 'function') {
        updateSearchIconsColor('#000');
      } else if (typeof searchButtonIcon !== 'undefined' && searchButtonIcon) {
        searchButtonIcon.style.stroke = '#000';
      }
      if (featuresContent) featuresContent.classList.remove('dark');
    }
    // Update toggle button icon/text if desired
    const toggleBtn = document.getElementById('darkModeToggle');
    if (toggleBtn) {
      toggleBtn.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
  }

  // On load, apply saved theme
  const savedTheme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  applyTheme(savedTheme);

  // DARK MODE TOGGLE
  const toggleBtn = document.getElementById('darkModeToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      const theme = isDark ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
      applyTheme(theme);
    });
  }

  // CART BUTTONS
  const cartButtons = document.querySelectorAll(".icon-button[title='Cart']");
  cartButtons.forEach(btn => btn.addEventListener('click', openCartSidebar));
  const closeCartSidebar = document.getElementById('closeCartSidebar');
  if (closeCartSidebar) {
    closeCartSidebar.addEventListener('click', closeCartSidebarHandler);
  }

  // CHECKOUT BUTTON
  const checkoutButton = document.getElementById('checkoutButton');
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
});

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
    document.getElementById('logoutBtn').onclick = function() {
      // Remove user-specific cart
      const userStr = sessionStorage.getItem('currentUser');
      if (userStr) {
        const user = JSON.parse(userStr);
        sessionStorage.removeItem(`cartItems_${user.email}`);
      }
      sessionStorage.removeItem('currentUser');
      window.location.reload();
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

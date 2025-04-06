// DOM Elements
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.getElementById('mobileMenu');
const header = document.querySelector('.header');
const currentYearElement = document.getElementById('currentYear');
const toggleBtn = document.getElementById('darkModeToggle');
const searchButtonIcon = document.querySelector('.search-button .icon');
const featuresContent = document.querySelector('.features-content'); // Correct selector for the section
const reviewForm = document.getElementById('reviewForm');
const reviewInput = document.getElementById('reviewInput');
const reviewsList = document.getElementById('reviewsList');

// Set current year in footer
currentYearElement.textContent = new Date().getFullYear();

// Toggle mobile menu
mobileMenuButton.addEventListener('click', () => {
  if (mobileMenu.classList.contains('active')) {
    mobileMenu.classList.remove('active');
    mobileMenu.style.display = 'none';
  } else {
    mobileMenu.classList.add('active');
    mobileMenu.style.display = 'flex';
  }
});

// Header scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
  const isClickInsideMenu = mobileMenu.contains(event.target);
  const isClickOnMenuButton = mobileMenuButton.contains(event.target);
  
  if (mobileMenu.classList.contains('active') && !isClickInsideMenu && !isClickOnMenuButton) {
    mobileMenu.classList.remove('active');
    mobileMenu.style.display = 'none';
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
      
      // Close mobile menu after clicking a link
      if (mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileMenu.style.display = 'none';
      }
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

// Customer Reviews Slider
const reviewsSlider = document.querySelector('.reviews-slider');
const reviewCards = document.querySelectorAll('.review-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;

function updateSlider() {
  const offset = -currentIndex * 100; // Calculate the offset for the slider
  reviewsSlider.style.transform = `translateX(${offset}%)`;
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + reviewCards.length) % reviewCards.length; // Loop back to the last card
  updateSlider();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % reviewCards.length; // Loop back to the first card
  updateSlider();
});

// Event Listener for Submitting Reviews
reviewForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form submission

  const reviewText = reviewInput.value.trim(); // Get the review text
  if (reviewText) {
    addReview(reviewText); // Add the review to the list
    reviewInput.value = ''; // Clear the input field
  }
});

// Function to Add a Review
function addReview(text) {
  const reviewCard = document.createElement('div');
  reviewCard.classList.add('review-card');

  reviewCard.innerHTML = `
    <p class="review-text">"${text}"</p>
    <h3 class="review-author">- Anonymous</h3>
  `;

  reviewsList.prepend(reviewCard); // Add the new review to the top of the list
}


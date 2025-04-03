
// DOM Elements
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.getElementById('mobileMenu');
const header = document.querySelector('.header');
const currentYearElement = document.getElementById('currentYear');

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
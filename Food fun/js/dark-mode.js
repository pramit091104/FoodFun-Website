// Dark mode functionality
function initializeDarkMode() {
  const darkPref = localStorage.getItem('darkMode');
  const toggleBtn = document.getElementById('darkModeToggle');
  
  // Apply saved preference if it exists
  if (darkPref === 'enabled') {
    document.body.classList.add('dark-mode');
    if (toggleBtn) toggleBtn.innerHTML = '☀️ Light Mode';
  } else {
    if (toggleBtn) toggleBtn.innerHTML = '🌙 Dark Mode';
  }
  
  // Add click event listener to toggle button
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      const isDark = document.body.classList.contains('dark-mode');
      if (isDark) {
        document.body.classList.remove('dark-mode');
        this.innerHTML = '🌙 Dark Mode';
        localStorage.setItem('darkMode', 'disabled');
      } else {
        document.body.classList.add('dark-mode');
        this.innerHTML = '☀️ Light Mode';
        localStorage.setItem('darkMode', 'enabled');
      }
    });
  }
}

// Run dark mode initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if header is already loaded
  if (document.getElementById('header').innerHTML.trim() !== '') {
    initializeDarkMode();
  } else {
    // If header is being loaded dynamically, wait for it
    const headerObserver = new MutationObserver(function(mutations) {
      if (document.getElementById('darkModeToggle')) {
        initializeDarkMode();
        headerObserver.disconnect();
      }
    });
    
    headerObserver.observe(document.getElementById('header'), {
      childList: true,
      subtree: true
    });
  }
});

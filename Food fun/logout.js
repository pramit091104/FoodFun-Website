// Firebase Authentication logout functionality
import { auth, signOut } from './firebase-config.js';

async function handleLogout() {
  try {
    await signOut(auth);
    // Clear session storage for compatibility with existing code
    sessionStorage.removeItem('currentUser');
    // Redirect to login page
    window.location.href = 'login.html';
  } catch (error) {
    console.error('Error signing out:', error);
    alert('Error signing out. Please try again.');
  }
}

// Export for use in other files
export { handleLogout };

// If this script is included directly in a page with a logout button
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
});

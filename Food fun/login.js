// Firebase Authentication for login
import { auth, signInWithEmailAndPassword, onAuthStateChanged } from './firebase-config.js';

// Check if user is already logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, store basic info in session storage for compatibility
    const userData = {
      name: user.displayName || 'User',
      email: user.email,
      uid: user.uid
    };
    sessionStorage.setItem('currentUser', JSON.stringify(userData));
    
    // Redirect if on login page
    if (window.location.pathname.includes('login.html')) {
      window.location.href = "index.html";
    }
  }
});

document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorMessageDiv = document.getElementById('error-message');
  const loginButton = document.querySelector('button[type="submit"]');
  
  // Basic validation
  if (!email || !password) {
    errorMessageDiv.textContent = "Please fill in all fields.";
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorMessageDiv.textContent = "Please enter a valid email address.";
    return;
  }

  // Disable button and show loading state
  loginButton.disabled = true;
  loginButton.textContent = "Logging in...";
  errorMessageDiv.textContent = "";

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Signed in successfully
    const user = userCredential.user;
    
    // Store user data in session storage for compatibility with existing code
    const userData = {
      name: user.displayName || 'User',
      email: user.email,
      uid: user.uid
    };
    sessionStorage.setItem('currentUser', JSON.stringify(userData));
    
    // Redirect to home page
    window.location.href = "index.html";
  } catch (error) {
    let errorMessage = "An error occurred. Please try again.";
    switch(error.code) {
      case 'auth/user-not-found':
        errorMessage = "No user found with this email.";
        break;
      case 'auth/wrong-password':
        errorMessage = "Incorrect password.";
        break;
      case 'auth/invalid-email':
        errorMessage = "Invalid email format.";
        break;
      case 'auth/too-many-requests':
        errorMessage = "Too many failed attempts. Please try again later.";
        break;
    }
    errorMessageDiv.textContent = errorMessage;
    
    // Reset button
    loginButton.disabled = false;
    loginButton.textContent = "Login";
  }
});

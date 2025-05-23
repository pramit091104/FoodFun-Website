// Firebase Authentication for signup
import { auth, createUserWithEmailAndPassword, updateProfile } from './firebase-config.js';

document.getElementById('signup-btn').addEventListener('click', async function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const errorMessageDiv = document.getElementById('error-message');
    const signupButton = document.getElementById('signup-btn');

    // Basic validation
    if (!name || !email || !password) {
        errorMessageDiv.textContent = "Please fill in all fields.";
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessageDiv.textContent = "Please enter a valid email address.";
        return;
    }

    // Password validation
    if (password.length < 6) {
        errorMessageDiv.textContent = "Password must be at least 6 characters long.";
        return;
    }

    // Disable button and show loading state
    signupButton.disabled = true;
    signupButton.textContent = "Creating account...";
    errorMessageDiv.textContent = "";

    try {
        // Create user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Update user profile with display name
        await updateProfile(user, {
            displayName: name
        });
        
        // Store user data in session storage for compatibility with existing code
        const userData = {
            name: name,
            email: email,
            uid: user.uid
        };
        sessionStorage.setItem('currentUser', JSON.stringify(userData));
        
        // Redirect to home page
        window.location.href = "index.html";
    } catch (error) {
        let errorMessage = "An error occurred. Please try again.";
        switch(error.code) {
            case 'auth/email-already-in-use':
                errorMessage = "Email is already registered.";
                break;
            case 'auth/invalid-email':
                errorMessage = "Invalid email format.";
                break;
            case 'auth/weak-password':
                errorMessage = "Password is too weak. Use at least 6 characters.";
                break;
        }
        errorMessageDiv.textContent = errorMessage;
        
        // Reset button
        signupButton.disabled = false;
        signupButton.textContent = "Sign Up";
    }
});

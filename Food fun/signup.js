// signup logic
document.getElementById('signup-btn').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const errorMessageDiv = document.getElementById('error-message');

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

    const user = {
        name: name,
        email: email,
        password: password
    };

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email is already registered
    const userExists = users.some(u => u.email === email);
    if (userExists) {
        errorMessageDiv.textContent = "Email is already registered.";
        return;
    }

    // Store user in local storage
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    // Store current user in session storage
    sessionStorage.setItem('currentUser', JSON.stringify(user));

    errorMessageDiv.textContent = "";
    window.location.href = "index.html"; // Redirect to home and auto-login
});

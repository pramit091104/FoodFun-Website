//login logic
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessageDiv = document.getElementById('error-message');

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

    // Get users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find user with matching email and password
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Store current user in session storage
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        errorMessageDiv.textContent = "";
        window.location.href = "index.html";
    } else {
        errorMessageDiv.textContent = "Invalid email or password.";
    }
});

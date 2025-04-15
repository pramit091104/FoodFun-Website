
// signup logic
document.getElementById('signup-btn').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const errorMessageDiv = document.getElementById('error-message');

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

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    errorMessageDiv.textContent = "";
    alert("Signup successful! You can now log in.");
    document.getElementById('signupForm').reset();
});

//login logic
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessageDiv = document.getElementById('error-message');

    if (email === "admin@gmail.com" && password === "admin") {
        errorMessageDiv.textContent = "";
        window.location.href = "index.html";
    } else {
        errorMessageDiv.textContent = "Invalid email or password.";
    }
});

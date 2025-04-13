// Default login values for demonstration
let defaultUser = {
    name: "John Doe",
    email: "john@example.com",
    password: "123456"
  };

  function togglePassword(fieldId) {
    let field = document.getElementById(fieldId);
    if (field.type === "password") {
      field.type = "text";
    } else {
      field.type = "password";
    }
  }

  function register() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    if (!name || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    defaultUser = { name, email, password };
    alert("Registration successful! Please login.");
    showLogin();
  }

  function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (email === defaultUser.email && password === defaultUser.password) {
      document.getElementById('registerForm').classList.add('hidden');
      document.getElementById('loginForm').classList.add('hidden');
      document.getElementById('dashboard').style.display = 'block';
      document.getElementById('welcomeMsg').innerText = `Welcome, ${defaultUser.name}`;
    } else {
      document.getElementById('errorMsg').innerText = "Invalid Username or Password";
    }
  }

  function showLogin() {
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('errorMsg').innerText = '';
  }

  function showRegister() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
  }
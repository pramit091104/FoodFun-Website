
        // Initialize Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyCLH00bulf2g5Jb7jvu5wHciW1F8uJmf-Y",
            authDomain: "rklogi-signupform.firebaseapp.com",
            projectId: "rklogi-signupform",
            storageBucket: "rklogi-signupform.firebasestorage.app",
            messagingSenderId: "610982107039",
            appId: "1:610982107039:web:704b1c51e2880cdb378faa"
        };

        firebase.initializeApp(firebaseConfig);

        // Handle sign-up
        document.addEventListener("DOMContentLoaded", function () {
            document.querySelector("form").addEventListener("submit", function (event) {
                event.preventDefault(); // Prevent default form submission
                signUp();
            });
        });

        function signUp() {
            let name = document.getElementById("signup-name").value;
            let email = document.getElementById("signup-email").value;
            let password = document.getElementById("signup-password").value;

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    let user = userCredential.user;

                    // Store name in Firebase Authentication profile
                    return user.updateProfile({
                        displayName: name
                    }).then(() => {
                        alert("Sign-Up Successful! Welcome, " + user.displayName);
                        console.log("User created:", user);

                        // Redirect to login page
                        window.location.href = "login.html";
                    });

                })
                .catch((error) => {
                    alert(error.message);
                    console.error("Error during sign-up:", error);
                });
        }

        function login() {
            let email = document.getElementById("login-email").value;
            let password = document.getElementById("login-password").value;
        
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    let user = userCredential.user;
        
                    // Check if displayName exists
                    if (user.displayName) {
                        alert("Login Successful! Welcome, " + user.displayName);
                    } else {
                        alert("Login Successful! But no name found in profile.");
                    }
        
                    console.log("User logged in:", user);
        
                    // Redirect to dashboard or homepage
                    window.location.href = "index.html"; 
                })
                .catch((error) => {
                    alert(error.message);
                    console.error("Error during login:", error);
                });
        }

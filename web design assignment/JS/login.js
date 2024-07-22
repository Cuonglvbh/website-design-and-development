// login.js

document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    const formTitle = document.getElementById('form-title');
    const toggleForm = document.getElementById('toggle-form');
    const switchToRegister = document.getElementById('switch-to-register');
    
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Function to handle login
    function handleLogin(username, password) {
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            alert('Login successful!');
            localStorage.setItem('loggedIn', username);
            window.location.href = 'index.html'; // Redirect to home page
        } else {
            alert('Invalid username or password');
        }
    }

    // Function to handle registration
    function handleRegister(username, password) {
        if (users.some(user => user.username === username)) {
            alert('Username already exists');
        } else {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful! Please log in.');
            switchToLogin();
        }
    }

    // Switch to registration form
    function switchToRegisterForm() {
        formTitle.textContent = 'Register';
        authForm.innerHTML = `
            <div>
                <label for="username">Username</label>
                <input type="text" id="username" required>
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" id="password" required>
            </div>
            <button type="submit">Register</button>
        `;
        toggleForm.innerHTML = `Already have an account? <a href="#" id="switch-to-login">Login</a>`;
        document.getElementById('switch-to-login').addEventListener('click', switchToLogin);
    }

    // Switch to login form
    function switchToLogin() {
        formTitle.textContent = 'Login';
        authForm.innerHTML = `
            <div>
                <label for="username">Username</label>
                <input type="text" id="username" required>
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" id="password" required>
            </div>
            <button type="submit">Login</button>
        `;
        toggleForm.innerHTML = `Don't have an account? <a href="#" id="switch-to-register">Register</a>`;
        document.getElementById('switch-to-register').addEventListener('click', switchToRegisterForm);
    }

    // Handle form submission
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (formTitle.textContent === 'Login') {
            handleLogin(username, password);
        } else {
            handleRegister(username, password);
        }
    });

    // Initialize form
    switchToLogin();
});

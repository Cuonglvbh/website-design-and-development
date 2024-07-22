// profile.js

document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profile-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const logoutLink = document.getElementById('logout');

    // Check if user is logged in
    const loggedInUser = localStorage.getItem('loggedIn');
    if (!loggedInUser) {
        alert('You must be logged in to view this page.');
        window.location.href = 'login.html'; // Redirect to login page
        return;
    }

    // Load user data from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === loggedInUser);

    if (user) {
        usernameInput.value = user.username;
        emailInput.value = user.email || '';
    }

    // Handle profile form submission
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate inputs
        if (emailInput.value === '') {
            alert('Email is required');
            return;
        }

        // Update user data
        user.email = emailInput.value;
        if (passwordInput.value) {
            user.password = passwordInput.value; // Update password if provided
        }
        localStorage.setItem('users', JSON.stringify(users));

        alert('Profile updated successfully!');
    });

    // Handle logout
    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('loggedIn'); // Clear logged-in status
        window.location.href = 'login.html'; // Redirect to login page
    });
});

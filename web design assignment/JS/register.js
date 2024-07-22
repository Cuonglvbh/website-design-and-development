document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const newUsername = document.getElementById('newUsername').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (newUsername === '' || newPassword === '' || confirmPassword === '') {
                alert('Please fill in all fields');
            } else if (newPassword !== confirmPassword) {
                alert('Passwords do not match');
            } else {
                // Simulate registration
                localStorage.setItem('user', newUsername);
                alert('Registration successful');
                window.location.href = 'login.html';
            }
        });
    }
});

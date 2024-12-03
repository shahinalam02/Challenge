// Sign In related JavaScript code
document.addEventListener('DOMContentLoaded', function() {
    // Password visibility toggle
    document.querySelectorAll('.password-toggle').forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            const passwordInput = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Sign In form submission
    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
        signInForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.querySelector('input[name="remember"]').checked;

            // Add loading state
            const submitButton = this.querySelector('.submit-button');
            submitButton.classList.add('loading');
            submitButton.disabled = true;

            // Simulate API call (replace with actual authentication)
            setTimeout(() => {
                console.log('Sign in attempt:', { email, password, remember });
                
                // TODO: Replace with actual authentication
                if (email && password) {
                    // Successful sign in
                    window.location.href = '/dashboard.html';
                } else {
                    // Show error
                    alert('Invalid email or password');
                    submitButton.classList.remove('loading');
                    submitButton.disabled = false;
                }
            }, 1500);
        });
    }

    // Social sign in handlers
    const googleButton = document.querySelector('.social-button.google');
    const appleButton = document.querySelector('.social-button.apple');

    if (googleButton) {
        googleButton.addEventListener('click', function() {
            // TODO: Implement Google sign in
            console.log('Google sign in clicked');
        });
    }

    if (appleButton) {
        appleButton.addEventListener('click', function() {
            // TODO: Implement Apple sign in
            console.log('Apple sign in clicked');
        });
    }
});

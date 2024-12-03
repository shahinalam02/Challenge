// Sign Up related JavaScript code
document.addEventListener('DOMContentLoaded', function() {
    let userDetails = {
        email: '',
        password: '',
        teamMembers: []
    };

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

    // Form submissions and step navigation
    const forms = {
        detailsForm: document.getElementById('detailsForm'),
        verificationForm: document.getElementById('verificationForm'),
        teamForm: document.getElementById('teamForm')
    };

    function moveToStep(step) {
        // Update steps in left panel
        document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
        document.querySelector(`.step[data-step="${step}"]`).classList.add('active');

        // Update form visibility
        document.querySelectorAll('.signup-step').forEach(s => s.classList.remove('active'));
        document.querySelector(`.signup-step[data-step="${step}"]`).classList.add('active');

        // Update display email if moving to verification step
        if (step === 2) {
            document.getElementById('displayEmail').textContent = userDetails.email;
        }
    }

    // Email validation
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Password validation
    function isValidPassword(password) {
        return password.length >= 8;
    }

    // Details form submission
    if (forms.detailsForm) {
        forms.detailsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            let isValid = true;

            // Validation
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                isValid = false;
            }

            if (!isValidPassword(password)) {
                alert('Password must be at least 8 characters long');
                isValid = false;
            }

            if (isValid) {
                // Add loading state
                const submitButton = this.querySelector('.submit-button');
                submitButton.classList.add('loading');
                submitButton.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    userDetails.email = email;
                    userDetails.password = password;
                    submitButton.classList.remove('loading');
                    submitButton.disabled = false;
                    moveToStep(2);
                }, 1500);
            }
        });
    }

    // Verification code handling
    const codeInputs = document.querySelectorAll('.code-input');
    codeInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value && index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !this.value && index > 0) {
                codeInputs[index - 1].focus();
            }
        });
    });

    // Verification form submission
    if (forms.verificationForm) {
        forms.verificationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const code = Array.from(codeInputs).map(input => input.value).join('');
            
            if (code.length === 6) {
                // Add loading state
                const submitButton = this.querySelector('.submit-button');
                submitButton.classList.add('loading');
                submitButton.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    submitButton.classList.remove('loading');
                    submitButton.disabled = false;
                    moveToStep(3);
                }, 1500);
            } else {
                alert('Please enter the complete verification code');
            }
        });
    }

    // Resend verification code
    const resendButton = document.getElementById('resendCode');
    if (resendButton) {
        resendButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Disable the button
            this.style.opacity = '0.5';
            this.style.pointerEvents = 'none';
            this.textContent = 'Sending...';

            // Simulate API call
            setTimeout(() => {
                this.textContent = 'Code sent!';
                
                // Reset after 3 seconds
                setTimeout(() => {
                    this.style.opacity = '1';
                    this.style.pointerEvents = 'auto';
                    this.textContent = 'Resend';
                }, 3000);
            }, 1500);
        });
    }

    // Team member management
    function addTeamMember(email = '') {
        const teamInvites = document.getElementById('teamInvites');
        const newInvite = document.createElement('div');
        newInvite.className = 'form-group';
        newInvite.innerHTML = `
            <label>Team Member Email</label>
            <div class="team-input">
                <input type="email" name="teamEmail[]" placeholder="Enter email address" value="${email}" required>
                <button type="button" class="remove-member" title="Remove member">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        teamInvites.appendChild(newInvite);

        // Add remove functionality
        const removeButton = newInvite.querySelector('.remove-member');
        if (removeButton) {
            removeButton.addEventListener('click', function() {
                newInvite.remove();
            });
        }
    }

    // Add more team members button
    const addMoreTeamBtn = document.getElementById('addMoreTeam');
    if (addMoreTeamBtn) {
        addMoreTeamBtn.addEventListener('click', function() {
            addTeamMember();
        });
    }

    // Team form submission
    if (forms.teamForm) {
        forms.teamForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emails = Array.from(this.querySelectorAll('input[type="email"]'))
                .map(input => input.value)
                .filter(email => email.trim() !== '');

            // Add loading state
            const submitButton = this.querySelector('.submit-button');
            submitButton.classList.add('loading');
            submitButton.disabled = true;

            // Simulate API call
            setTimeout(() => {
                userDetails.teamMembers = emails;
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
                // Move to welcome step
                moveToStep(4);
            }, 1500);
        });

        // Skip button
        const skipButton = forms.teamForm.querySelector('.skip-button');
        if (skipButton) {
            skipButton.addEventListener('click', function() {
                userDetails.teamMembers = [];
                moveToStep(4);
            });
        }
    }

    // Get Started button and Watch Later button handlers
    const getStartedBtn = document.getElementById('getStarted');
    const watchLaterBtn = document.getElementById('watchLater');
    const videoPlaceholder = document.querySelector('.video-placeholder');

    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // In a real implementation, this would play the video
            // For now, we'll just show a message
            const span = this.querySelector('span');
            const originalText = span.textContent;
            span.textContent = 'Coming soon!';
            setTimeout(() => {
                span.textContent = originalText;
            }, 2000);
        });
    }

    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            // Add loading state
            this.classList.add('loading');
            this.disabled = true;
            
            // Disable watch later button
            if (watchLaterBtn) {
                watchLaterBtn.disabled = true;
            }

            // Simulate final setup
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }

    if (watchLaterBtn) {
        watchLaterBtn.addEventListener('click', function() {
            window.location.href = 'dashboard.html';
        });
    }

    // Social sign up handlers
    const googleButton = document.querySelector('.social-button.google');
    const appleButton = document.querySelector('.social-button.apple');

    if (googleButton) {
        googleButton.addEventListener('click', function() {
            // TODO: Implement Google sign up
            console.log('Google sign up clicked');
        });
    }

    if (appleButton) {
        appleButton.addEventListener('click', function() {
            // TODO: Implement Apple sign up
            console.log('Apple sign up clicked');
        });
    }
});

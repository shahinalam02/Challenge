// Authentication related JavaScript code
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

    function editStep(step) {
        if (step === 1) {
            // Pre-fill the form with saved details
            document.getElementById('email').value = userDetails.email;
            document.getElementById('password').value = userDetails.password;
            if (document.getElementById('confirmPassword')) {
                document.getElementById('confirmPassword').value = userDetails.password;
            }
        } else if (step === 3) {
            // Pre-fill team members
            const teamInvites = document.querySelector('.team-invites');
            teamInvites.innerHTML = '';
            userDetails.teamMembers.forEach(email => {
                addTeamMember(email);
            });
        }
        moveToStep(step);
    }

    // Form validation functions
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePassword(password) {
        return password.length >= 8;
    }

    // Details form validation and submission
    if (forms.detailsForm) {
        forms.detailsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirmPassword');
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            const confirmPasswordError = document.getElementById('confirmPasswordError');
            let isValid = true;

            // Reset errors
            emailError.textContent = '';
            passwordError.textContent = '';
            if (confirmPasswordError) confirmPasswordError.textContent = '';

            // Email validation
            if (!email.value) {
                emailError.textContent = 'Email is required';
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                emailError.textContent = 'Please enter a valid email address';
                isValid = false;
            }

            // Password validation
            if (!password.value) {
                passwordError.textContent = 'Password is required';
                isValid = false;
            } else if (!validatePassword(password.value)) {
                passwordError.textContent = 'Password must be at least 8 characters';
                isValid = false;
            }

            // Confirm password validation (if field exists)
            if (confirmPassword) {
                if (!confirmPassword.value) {
                    confirmPasswordError.textContent = 'Please confirm your password';
                    isValid = false;
                } else if (password.value !== confirmPassword.value) {
                    confirmPasswordError.textContent = 'Passwords do not match';
                    isValid = false;
                }
            }

            if (isValid) {
                userDetails.email = email.value;
                userDetails.password = password.value;
                moveToStep(2);
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

    // Team member management
    function addTeamMember(email = '') {
        const teamInvites = document.querySelector('.team-invites');
        const newIndex = teamInvites.children.length + 1;
        
        const newInvite = document.createElement('div');
        newInvite.className = 'form-group';
        newInvite.innerHTML = `
            <label>Team Member ${newIndex}</label>
            <div class="team-input">
                <input type="email" placeholder="Enter email address" class="team-email" value="${email}">
                <button type="button" class="remove-member" title="Remove member">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        teamInvites.appendChild(newInvite);

        // Add remove functionality
        newInvite.querySelector('.remove-member').addEventListener('click', function() {
            newInvite.remove();
            updateTeamLabels();
        });
    }

    function updateTeamLabels() {
        document.querySelectorAll('.team-invites .form-group').forEach((group, index) => {
            group.querySelector('label').textContent = `Team Member ${index + 1}`;
        });
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
            userDetails.teamMembers = Array.from(document.querySelectorAll('.team-email'))
                .map(input => input.value)
                .filter(email => email.trim() !== '');
            moveToStep(4);
        });
    }

    // Skip team invites
    const skipButton = document.querySelector('.skip-button');
    if (skipButton) {
        skipButton.addEventListener('click', function() {
            userDetails.teamMembers = [];
            moveToStep(4);
        });
    }

    // Verification form submission
    if (forms.verificationForm) {
        forms.verificationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const code = Array.from(codeInputs).map(input => input.value).join('');
            if (code.length === 6) {
                moveToStep(3);
            }
        });
    }

    // Get Started button
    const getStartedBtn = document.getElementById('getStarted');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            window.location.href = 'dashboard.html';
        });
    }

    // Resend verification code
    const resendCodeBtn = document.getElementById('resendCode');
    if (resendCodeBtn) {
        resendCodeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            this.textContent = 'Code resent!';
            setTimeout(() => {
                this.textContent = 'Resend';
            }, 3000);
        });
    }
});

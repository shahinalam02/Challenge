// Make redirectToDashboard function globally accessible
window.redirectToDashboard = function() {
    const button = document.querySelector('.popup-button');
    if (button) {
        button.textContent = 'Redirecting...';
        button.disabled = true;
    }
    
    try {
        setTimeout(() => {
            window.location.href = '../../dashboard/mentor/index.html';
        }, 500);
    } catch (error) {
        console.error('Redirect error:', error);
        window.location.href = '../../dashboard/mentor/index.html';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize form steps
    let currentStep = 1;
    const totalSteps = 3;
    const progressBar = document.querySelector('.progress-bar');
    const submitButton = document.querySelector('button[type="submit"]');
    const expertiseTags = document.querySelectorAll('.expertise-tag');
    
    // Form elements
    const stepForms = {
        step1: document.getElementById('professional-form'),
        step2: document.getElementById('mentorship-form'),
        step3: document.getElementById('verification-form')
    };
    
    const steps = document.querySelectorAll('.step');
    
    // Navigation buttons
    const step1Next = document.getElementById('step1-next');
    const step2Back = document.getElementById('step2-back');
    const step2Next = document.getElementById('step2-next');
    const step3Back = document.getElementById('step3-back');
    
    // Selected skills tracking
    let selectedSkills = new Set();
    
    // Initialize first step
    initializeSteps();
    updateStepIndicators();
    updateProgress(33);
    
    // Initialize steps visibility with transition
    function initializeSteps() {
        document.querySelectorAll('.signup-step').forEach((step, index) => {
            if (index + 1 === currentStep) {
                step.style.display = 'block';
                // Trigger reflow
                step.offsetHeight;
                step.classList.add('active');
            } else {
                step.classList.remove('active');
                step.style.display = 'none';
            }
        });
    }
    
    // Handle expertise tag selection with improved feedback
    expertiseTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const skill = tag.dataset.skill;
            
            if (tag.classList.contains('selected')) {
                tag.classList.remove('selected');
                selectedSkills.delete(skill);
                showNotification(`${skill} removed from your skills`, 'info');
            } else {
                if (selectedSkills.size < 5) {
                    tag.classList.add('selected');
                    selectedSkills.add(skill);
                    showNotification(`${skill} added to your skills`, 'success');
                } else {
                    showNotification('Maximum 5 skills can be selected', 'error');
                    tag.classList.add('shake');
                    setTimeout(() => tag.classList.remove('shake'), 500);
                }
            }
            
            // Update skills validation state
            const skillsGroup = document.querySelector('.expertise-tags').closest('.form-group');
            const errorText = skillsGroup.querySelector('.help-text');
            if (selectedSkills.size > 0) {
                skillsGroup.classList.remove('error');
                if (errorText) {
                    errorText.textContent = `${selectedSkills.size}/5 skills selected`;
                }
            }
        });
    });

    // Enhanced form validation
    function validateField(fieldId, errorMessage, customValidation = null) {
        const field = document.getElementById(fieldId);
        if (!field) return true; // Skip if field doesn't exist in current step
        
        const formGroup = field.closest('.form-group');
        const errorText = formGroup.querySelector('.help-text') || document.createElement('small');
        errorText.className = 'help-text';
        
        let isValid = field.value.trim() !== '';
        if (customValidation) {
            isValid = isValid && customValidation(field.value.trim());
        }
        
        if (!isValid) {
            formGroup.classList.add('error');
            errorText.textContent = errorMessage;
            if (!formGroup.querySelector('.help-text')) {
                formGroup.appendChild(errorText);
            }
            field.focus();
            return false;
        }
        
        formGroup.classList.remove('error');
        if (field.dataset.helpText) {
            errorText.textContent = field.dataset.helpText;
        }
        return true;
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateStep(step) {
        let isValid = true;

        if (step === 1) {
            isValid = validateField('fullName', 'Please enter your full name') && isValid;
            
            isValid = validateField('email', 'Please enter a valid email address', validateEmail) && isValid;
            isValid = validateField('expertise', 'Please select your area of expertise') && isValid;
            isValid = validateField('experience', 'Please select your years of experience') && isValid;

            if (selectedSkills.size === 0) {
                const skillsGroup = document.querySelector('.expertise-tags').closest('.form-group');
                const errorText = skillsGroup.querySelector('.help-text') || document.createElement('small');
                errorText.className = 'help-text';
                skillsGroup.classList.add('error');
                errorText.textContent = 'Please select at least one skill';
                if (!skillsGroup.querySelector('.help-text')) {
                    skillsGroup.appendChild(errorText);
                }
                isValid = false;
            }
        } else if (step === 2) {
            isValid = validateField('bio', 'Please enter your professional bio') && isValid;
            isValid = validateField('mentorshipStyle', 'Please select your mentorship style') && isValid;
            isValid = validateField('availability', 'Please select your weekly availability') && isValid;

            // Check if at least one meeting time is selected
            const meetingTimes = document.querySelectorAll('input[name="meeting_times[]"]:checked');
            const timeGroup = document.querySelector('input[name="meeting_times[]"]').closest('.form-group');
            
            if (meetingTimes.length === 0) {
                timeGroup.classList.add('error');
                const errorText = timeGroup.querySelector('.help-text') || document.createElement('small');
                errorText.className = 'help-text';
                errorText.textContent = 'Please select at least one preferred meeting time';
                if (!timeGroup.querySelector('.help-text')) {
                    timeGroup.appendChild(errorText);
                }
                isValid = false;
            } else {
                timeGroup.classList.remove('error');
                const helpText = timeGroup.querySelector('.help-text');
                if (helpText) {
                    helpText.textContent = `${meetingTimes.length} time slot(s) selected`;
                }
            }
        } else if (step === 3) {
            isValid = validateField('linkedin', 'Please enter your LinkedIn profile URL', (url) => {
                return url.includes('linkedin.com/');
            }) && isValid;
            
            const termsCheckbox = document.getElementById('terms');
            if (termsCheckbox && !termsCheckbox.checked) {
                const formGroup = termsCheckbox.closest('.form-group');
                formGroup.classList.add('error');
                const errorText = formGroup.querySelector('.help-text') || document.createElement('small');
                errorText.className = 'help-text';
                errorText.textContent = 'You must agree to the Terms of Service and Privacy Policy';
                if (!formGroup.querySelector('.help-text')) {
                    formGroup.appendChild(errorText);
                }
                isValid = false;
            }
        }

        if (!isValid) {
            showNotification('Please fill in all required fields correctly', 'error');
        }

        return isValid;
    }

    // Remove error on input with debounce
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    document.querySelectorAll('.form-input').forEach(input => {
        const debouncedValidation = debounce(() => {
            const formGroup = input.closest('.form-group');
            const helpText = formGroup.querySelector('.help-text');
            
            if (input.id === 'email' && input.value.trim()) {
                if (!validateEmail(input.value.trim())) {
                    formGroup.classList.add('error');
                    if (helpText) helpText.textContent = 'Please enter a valid email address';
                    return;
                }
            }
            
            if (input.value.trim()) {
                formGroup.classList.remove('error');
                if (helpText && input.dataset.helpText) {
                    helpText.textContent = input.dataset.helpText;
                }
            }
        }, 300);

        input.addEventListener('input', debouncedValidation);
    });

    // Smooth navigation between steps
    function showNextStep() {
        if (validateStep(currentStep)) {
            const currentStepElement = document.getElementById(`step${currentStep}`);
            const nextStepElement = document.getElementById(`step${currentStep + 1}`);
            
            if (nextStepElement) {
                // Prepare next step
                nextStepElement.style.display = 'block';
                nextStepElement.style.opacity = '0';
                
                // Fade out current step
                currentStepElement.style.opacity = '0';
                
                setTimeout(() => {
                    currentStepElement.classList.remove('active');
                    currentStepElement.style.display = 'none';
                    
                    currentStep++;
                    
                    // Fade in next step
                    nextStepElement.classList.add('active');
                    nextStepElement.style.opacity = '1';
                    
                    updateProgress((currentStep / totalSteps) * 100);
                    updateStepIndicators();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 300);
            }
        }
    }

    function showPreviousStep() {
        if (currentStep > 1) {
            const currentStepElement = document.getElementById(`step${currentStep}`);
            const previousStepElement = document.getElementById(`step${currentStep - 1}`);
            
            // Prepare previous step
            previousStepElement.style.display = 'block';
            previousStepElement.style.opacity = '0';
            
            // Fade out current step
            currentStepElement.style.opacity = '0';
            
            setTimeout(() => {
                currentStepElement.classList.remove('active');
                currentStepElement.style.display = 'none';
                
                currentStep--;
                
                // Fade in previous step
                previousStepElement.classList.add('active');
                previousStepElement.style.opacity = '1';
                
                updateProgress((currentStep / totalSteps) * 100);
                updateStepIndicators();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 300);
        }
    }

    // Update progress bar with animation
    function updateProgress(progress) {
        progressBar.style.setProperty('--progress', `${progress}%`);
    }

    // Update step indicators with active and completed states
    function updateStepIndicators() {
        steps.forEach((step, index) => {
            if (index + 1 === currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else if (index + 1 < currentStep) {
                step.classList.remove('active');
                step.classList.add('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
    }

    // Enhanced notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(notif => notif.remove());
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Create enhanced confetti effect
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        document.body.appendChild(confettiContainer);

        const colors = ['#6172F3', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
        const shapes = ['circle', 'square'];
        const totalConfetti = 150;

        for (let i = 0; i < totalConfetti; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Randomize confetti properties
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const size = Math.random() * 8 + 6; // Random size between 6-14px
            
            confetti.style.backgroundColor = color;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.borderRadius = shape === 'circle' ? '50%' : '2px';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
            confetti.style.animationDelay = `${Math.random() * 0.5}s`;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            confettiContainer.appendChild(confetti);
        }

        // Remove confetti container after animation
        setTimeout(() => {
            confettiContainer.remove();
        }, 6000);
    }

    // Add event listeners for navigation buttons
    if (step1Next) step1Next.addEventListener('click', showNextStep);
    if (step2Back) step2Back.addEventListener('click', showPreviousStep);
    if (step2Next) step2Next.addEventListener('click', showNextStep);
    if (step3Back) step3Back.addEventListener('click', showPreviousStep);

    // Form submission
    if (submitButton) {
        submitButton.addEventListener('click', async (e) => {
            e.preventDefault();
            
            if (validateStep(currentStep)) {
                submitButton.classList.add('loading');
                submitButton.disabled = true;
                
                try {
                    // Simulate form submission (replace with actual API call)
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    // Create popup
                    const popup = document.createElement('div');
                    popup.className = 'popup-overlay';
                    popup.innerHTML = `
                        <div class="popup-content">
                            <div class="popup-icon">
                                <i class="fas fa-check"></i>
                            </div>
                            <h2 class="popup-title">Congratulations!</h2>
                            <p class="popup-message">Your application has been submitted successfully. We'll review your profile and get back to you soon.</p>
                            <button type="button" class="popup-button">Continue to Dashboard</button>
                        </div>
                    `;
                    
                    // Remove any existing popups
                    const existingPopup = document.querySelector('.popup-overlay');
                    if (existingPopup) {
                        existingPopup.remove();
                    }
                    
                    document.body.appendChild(popup);

                    // Handle continue button click
                    const continueButton = popup.querySelector('.popup-button');
                    continueButton.addEventListener('click', function() {
                        // Visual feedback
                        this.textContent = 'Redirecting...';
                        this.disabled = true;

                        // Get the current URL path segments
                        const pathSegments = window.location.pathname.split('/');
                        // Remove the last two segments (current page and its directory)
                        pathSegments.splice(-2);
                        // Add dashboard path
                        pathSegments.push('dashboard', 'mentor');
                        // Create the new path
                        const dashboardPath = pathSegments.join('/');

                        // Redirect to dashboard
                        window.location.href = dashboardPath;
                    });

                    // Show popup with animation
                    requestAnimationFrame(() => {
                        popup.classList.add('show');
                        createConfetti();
                    });

                    // Close on outside click
                    popup.addEventListener('click', (e) => {
                        if (e.target === popup) {
                            popup.classList.remove('show');
                            setTimeout(() => popup.remove(), 300);
                        }
                    });

                } catch (error) {
                    console.error('Form submission error:', error);
                    showNotification('An error occurred. Please try again.', 'error');
                } finally {
                    submitButton.classList.remove('loading');
                    submitButton.disabled = false;
                }
            }
        });
    }
});

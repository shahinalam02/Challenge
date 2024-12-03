document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.create-team-form');
    const steps = document.querySelectorAll('.step');
    const progressDots = document.querySelectorAll('.progress-dot');
    let currentStep = 0;

    // Form sections data
    const formSections = [
        {
            title: "Team details",
            description: "Provide team information",
            icon: "user",
            fields: ["teamName"]
        },
        {
            title: "Project details",
            description: "Enter project information",
            icon: "file-alt",
            fields: ["projectName", "description", "category"]
        },
        {
            title: "Invite your team",
            description: "Start collaborating with your team",
            icon: "users",
            fields: ["teamMembers"]
        },
        {
            title: "Ready to go!",
            description: "Get up and running in 3 minutes",
            icon: "rocket",
            fields: []
        }
    ];

    // Initialize form sections HTML
    function initializeFormSections() {
        const formContent = document.querySelector('.form-content');
        
        // Create initial form section
        updateFormSection(0);

        // Show only first section
        showFormSection(0);
    }

    // Update form section content
    function updateFormSection(stepIndex) {
        const section = formSections[stepIndex];
        const formHeader = document.querySelector('.form-header');
        
        // Update header
        formHeader.innerHTML = `
            <i class="fas fa-${section.icon} logo-mark"></i>
            <h1>${section.title}</h1>
            <p>${section.description}</p>
        `;

        // Update form content based on step
        const form = document.querySelector('.create-team-form');
        
        if (stepIndex === 0) {
            form.innerHTML = `
                <div class="form-group">
                    <label for="teamName">Team Name*</label>
                    <input type="text" id="teamName" placeholder="Enter your team name" required>
                </div>
                <button type="button" class="btn-primary" onclick="nextStep()">
                    Continue
                    <i class="fas fa-arrow-right"></i>
                </button>
            `;
        } else if (stepIndex === 1) {
            form.innerHTML = `
                <div class="form-group">
                    <label for="projectName">Project/Research Title*</label>
                    <input type="text" id="projectName" placeholder="Enter project or research title" required>
                </div>
                <div class="form-group">
                    <label for="description">Description*</label>
                    <textarea id="description" placeholder="Describe your project, goals, and requirements" required></textarea>
                </div>
                <div class="form-group">
                    <label for="category">Category*</label>
                    <select id="category" required>
                        <option value="" disabled selected>Select a category</option>
                        <option value="research">Research</option>
                        <option value="software">Software Development</option>
                        <option value="journal">Journal Publication</option>
                        <option value="data-science">Data Science</option>
                        <option value="ai-ml">AI/Machine Learning</option>
                        <option value="engineering">Engineering</option>
                    </select>
                </div>
                <div class="button-group">
                    <button type="button" class="btn-secondary" onclick="previousStep()">
                        <i class="fas fa-arrow-left"></i>
                        Back
                    </button>
                    <button type="button" class="btn-primary" onclick="nextStep()">
                        Continue
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            `;
        } else if (stepIndex === 2) {
            form.innerHTML = `
                <div class="form-group">
                    <label for="teamMembers">Invite Team Members</label>
                    <div class="team-member-input">
                        <input type="email" id="teamMemberEmail" placeholder="Enter email address">
                        <button type="button" class="btn-add-member">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="team-members-list"></div>
                </div>
                <div class="button-group">
                    <button type="button" class="btn-secondary" onclick="previousStep()">
                        <i class="fas fa-arrow-left"></i>
                        Back
                    </button>
                    <button type="button" class="btn-primary" onclick="nextStep()">
                        Continue
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            `;
        } else if (stepIndex === 3) {
            // Create and show modal
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-icon">
                        <i class="fas fa-check"></i>
                    </div>
                    <h2 class="modal-title">Congratulations!</h2>
                    <p class="modal-message">Your team has been created successfully. Ready to start collaborating?</p>
                    <button class="modal-button" onclick="goToTeamDashboard()">
                        Go to Team Dashboard
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Create confetti effect
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = ['#0d6efd', '#4d94ff', '#87b9ff'][Math.floor(Math.random() * 3)];
                confetti.style.animation = `confetti-fall ${1 + Math.random() * 2}s linear forwards`;
                modal.appendChild(confetti);
            }

            // Show modal with animation
            setTimeout(() => {
                modal.classList.add('show');
            }, 100);

            form.innerHTML = ''; // Clear the form
        }
    }

    // Show form section
    function showFormSection(index) {
        // Update active step
        steps.forEach((step, i) => {
            if (i === index) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update progress dots
        progressDots.forEach((dot, i) => {
            if (i <= index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update form content
        updateFormSection(index);
    }

    // Next step handler
    window.nextStep = function() {
        if (currentStep < formSections.length - 1) {
            currentStep++;
            showFormSection(currentStep);
        }
    };

    // Previous step handler
    window.previousStep = function() {
        if (currentStep > 0) {
            currentStep--;
            showFormSection(currentStep);
        }
    };

    // Go to team dashboard
    window.goToTeamDashboard = function() {
        // Redirect to team dashboard
        window.location.href = 'team-dashboard.html';
    };

    // Initialize the form
    initializeFormSections();
});

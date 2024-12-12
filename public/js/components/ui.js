// Shared UI components and functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation menu functionality
    initializeNavigation();
    
    // Initialize tooltips
    initializeTooltips();
    
    // Initialize modals
    initializeModals();
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu functionality
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            } else {
                navLinks.classList.add('active');
            }
        });
    }

    // Dropdown functionality
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const content = dropdown.querySelector('.dropdown-content');

        if (trigger && content) {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                // Close other dropdowns
                dropdowns.forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('active');
                    }
                });
                dropdown.classList.toggle('active');
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// Tooltip initialization
function initializeTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', showTooltip);
        tooltip.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(event) {
    const tooltip = event.target;
    const tooltipText = tooltip.getAttribute('data-tooltip');
    
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'tooltip';
    tooltipElement.textContent = tooltipText;
    
    document.body.appendChild(tooltipElement);
    
    const rect = tooltip.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();
    
    tooltipElement.style.top = `${rect.top - tooltipRect.height - 10}px`;
    tooltipElement.style.left = `${rect.left + (rect.width - tooltipRect.width) / 2}px`;
}

function hideTooltip() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
}

// Modal functionality
function initializeModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                openModal(modal);
            }
        });
    });
}

function openModal(modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => closeModal(modal));
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
}

function closeModal(modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
}

// Shared form validation
export function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers;
}

// Loading spinner
export function showLoading(container) {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = '<div class="spinner"></div>';
    container.appendChild(spinner);
}

export function hideLoading() {
    const spinners = document.querySelectorAll('.loading-spinner');
    spinners.forEach(spinner => spinner.remove());
}

// Toast notifications
export function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Form helpers
export function serializeForm(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return data;
}

// Responsive helpers
export function isMobile() {
    return window.innerWidth < 768;
}

export function isTablet() {
    return window.innerWidth >= 768 && window.innerWidth < 1024;
}

export function isDesktop() {
    return window.innerWidth >= 1024;
}


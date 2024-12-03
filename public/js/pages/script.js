// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('img');

// Check for saved theme preference, default to light mode
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// Function to update theme
function updateTheme(darkMode) {
    document.body.classList.toggle('dark-mode', darkMode);
    themeIcon.src = darkMode ? 'assets/icons/theme-moon.svg' : 'assets/icons/theme-sun.svg';
    localStorage.setItem('darkMode', darkMode);
}

// Initialize theme
updateTheme(isDarkMode);

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    updateTheme(isDarkMode);
    
    // Add animation class
    themeIcon.classList.add('rotate');
    setTimeout(() => themeIcon.classList.remove('rotate'), 300);
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (localStorage.getItem('darkMode') === null) {
        isDarkMode = e.matches;
        updateTheme(isDarkMode);
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all feature cards and steps
document.querySelectorAll('.feature-card, .step').forEach(element => {
    observer.observe(element);
});

// Mobile Navigation Toggle
const createMobileNav = () => {
    const nav = document.querySelector('.nav-links');
    const burger = document.createElement('button');
    burger.classList.add('mobile-nav-toggle');
    burger.innerHTML = '';
    document.querySelector('.nav-container').appendChild(burger);

    burger.addEventListener('click', () => {
        nav.classList.toggle('show');
        burger.innerHTML = nav.classList.contains('show') ? '' : '';
    });
};

// Initialize mobile navigation on small screens
if (window.innerWidth <= 768) {
    createMobileNav();
}

// Form Validation for Join Us Button
document.querySelector('.join-button').addEventListener('click', () => {
    // You can add your sign-up form logic here
    alert('Join Us functionality coming soon!');
});

// Add active state to navigation links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Add scroll-based animations
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Add sticky class to navigation when scrolled
    const nav = document.querySelector('nav');
    if (scrollPosition > 0) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
});

// Initialize any tooltips or popovers
const initTooltips = () => {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', (e) => {
            const tip = document.createElement('div');
            tip.classList.add('tooltip');
            tip.textContent = e.target.dataset.tooltip;
            document.body.appendChild(tip);
            
            const rect = e.target.getBoundingClientRect();
            tip.style.top = `${rect.top - tip.offsetHeight - 10}px`;
            tip.style.left = `${rect.left + (rect.width - tip.offsetWidth) / 2}px`;
        });
        
        tooltip.addEventListener('mouseleave', () => {
            document.querySelector('.tooltip')?.remove();
        });
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTooltips();
});

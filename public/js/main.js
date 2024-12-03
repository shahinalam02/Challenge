document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navActions.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Dropdown menus for mobile
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');

    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                const dropdown = this.closest('.nav-dropdown');
                dropdown.classList.toggle('active');
            }
        });
    });

    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('img');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            themeIcon.src = isDark 
                ? '../public/assets/icons/theme-moon.svg'
                : '../public/assets/icons/theme-sun.svg';
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024) {
            const isClickInsideNav = e.target.closest('.navbar');
            if (!isClickInsideNav && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navActions.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            navLinks.classList.remove('active');
            navActions.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Tab switching functionality for collaborate page
    function initializeCollaboratePage() {
        const filterTabs = document.querySelectorAll('.filter-tab');
        const itemGrids = document.querySelectorAll('.items-grid');

        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and grids
                filterTabs.forEach(t => t.classList.remove('active'));
                itemGrids.forEach(grid => grid.classList.remove('active'));

                // Add active class to clicked tab and corresponding grid
                tab.classList.add('active');
                const filterValue = tab.getAttribute('data-filter');
                document.getElementById(`${filterValue}-grid`).classList.add('active');
            });
        });
    }

    // Search functionality
    function initializeSearch() {
        const searchInput = document.querySelector('.search-input');
        const itemCards = document.querySelectorAll('.item-card');

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            itemCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const shouldShow = title.includes(searchTerm) || description.includes(searchTerm);
                
                card.style.display = shouldShow ? '' : 'none';
            });
        });
    }

    // Join by code functionality
    function initializeJoinCode() {
        const joinInput = document.querySelector('.join-input');
        const joinBtn = document.querySelector('.join-btn');

        joinBtn.addEventListener('click', () => {
            const code = joinInput.value.trim();
            if (code) {
                // TODO: Implement actual join logic
                alert(`Joining with code: ${code}`);
                joinInput.value = '';
            } else {
                alert('Please enter a valid join code');
            }
        });
    }

    // Initialize all functionality when DOM is loaded
    initializeCollaboratePage();
    initializeSearch();
    initializeJoinCode();
});

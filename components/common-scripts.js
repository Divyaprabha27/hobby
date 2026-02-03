// ========== COMMON JAVASCRIPT FOR ALL PAGES ==========

// Load Common Components
function loadCommonComponents() {
    // Load header
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        // Show loading state
        headerContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-secondary);">Loading...</div>';
        
        // Load header
        fetch('components/header.html')
            .then(response => response.text())
            .then(html => {
                headerContainer.innerHTML = html;
                // Set active link after header loads
                if (typeof setActiveNavLink === 'function') {
                    setActiveNavLink();
                }
            })
            .catch(error => {
                console.error('Error loading header:', error);
                headerContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: red;">Error loading navigation</div>';
            });
    }

    // Load footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        fetch('components/footer.html')
            .then(response => response.text())
            .then(html => footerContainer.innerHTML = html)
            .catch(error => console.error('Error loading footer:', error));
    }
}

// Theme Toggle Functionality
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update theme toggle icons
    updateThemeToggleIcons(newTheme);
}

// Initialize theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleIcons(savedTheme);
}

// Update theme toggle icons
function updateThemeToggleIcons(theme) {
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');

    if (sunIcon && moonIcon) {
        if (sunIcon && moonIcon) {
            // Opacity handled by CSS based on data-theme attribute
        }
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');

    if (navLinks && menuToggle) {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    }
}

// Scroll to Top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/Hide Scroll to Top Button
function handleScrollToTop() {
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
        if (window.pageYOffset > 300) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    }
}

// Set Active Navigation Link
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop() || 'index.html';
    
    // Remove all active classes first
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current page link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentFile || 
            (currentFile === 'index.html' && href === 'index.html') ||
            (currentFile === '' && href === 'index.html') ||
            (currentFile === 'home2.html' && href === 'home2.html') ||
            (currentFile === 'new-arrivals.html' && href === 'new-arrivals.html') ||
            (currentFile === 'categories.html' && href === 'categories.html') ||
            (currentFile === 'shop.html' && href === 'shop.html') ||
            (currentFile === 'contact.html' && href === 'contact.html')) {
            link.classList.add('active');
        }
    });
}

// Wait for header to load then set active link
function waitForHeaderAndSetActive() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer && headerContainer.innerHTML.trim() !== '') {
        // Header is loaded, set active link
        setActiveNavLink();
    } else {
        // Header not loaded yet, wait and try again
        setTimeout(waitForHeaderAndSetActive, 100);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Load common components (header and footer)
    loadCommonComponents();
    
    // Initialize theme
    initializeTheme();
    
    // Wait for header to load then set active navigation link
    waitForHeaderAndSetActive();

    // Set up scroll event listener
    window.addEventListener('scroll', handleScrollToTop);

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');

        if (navLinks && menuToggle && navLinks.classList.contains('active')) {
            if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');

        if (window.innerWidth > 768 && navLinks && menuToggle) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// Export functions for global use
window.toggleTheme = toggleTheme;
window.toggleMobileMenu = toggleMobileMenu;
window.scrollToTop = scrollToTop;
window.setActiveNavLink = setActiveNavLink;
window.loadCommonComponents = loadCommonComponents;

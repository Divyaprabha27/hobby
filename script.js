// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

// Load Theme
const currentTheme = localStorage.getItem('app_theme');
if (currentTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
}

// Theme Toggle Click
if (themeToggle && themeIcon) {
    themeToggle.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';

        if (isDark) {
            body.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('app_theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('app_theme', 'dark');
        }
    });
}

// Scroll Events
window.addEventListener('scroll', () => {
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');

        document.querySelectorAll('.nav-links li').forEach((link, i) => {
            link.style.animation = link.style.animation
                ? ''
                : `navLinkFade 0.5s ease forwards ${i / 7 + 0.3}s`;
        });
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        e.preventDefault();
        if (navLinks) navLinks.classList.remove('active');

        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Add to Cart
const cartBtns = document.querySelectorAll('.btn-icon');
const cartBadge = document.querySelector('.cart-badge');
let cartCount = 0;

cartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        cartCount++;
        if (cartBadge) cartBadge.innerText = cartCount;

        const toast = document.createElement('div');
        toast.innerText = 'Added to Cart!';
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: '#00e5ff',
            color: '#000',
            padding: '10px 20px',
            borderRadius: '5px',
            fontWeight: '600',
            zIndex: '1000'
        });

        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    });
});

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const navbar = document.querySelector('.navbar');
const contactForm = document.querySelector('.contact-form');

// Theme functionality
function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    themeToggle.checked = theme === 'dark';
    localStorage.setItem('theme', theme);
    updateNavbarStyle();
}

// Update navbar style based on theme
function updateNavbarStyle() {
    const isDark = htmlElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
        navbar.style.cssText = `
            background-color: #141414 !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8) !important;
            border-bottom: 1px solid rgba(255, 140, 66, 0.15) !important;
        `;
    } else {
        navbar.style.cssText = '';
    }
}

// Initialize theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    applyTheme(savedTheme);
} else {
    applyTheme('light');
}

// Theme toggle listener
themeToggle.addEventListener('change', () => {
    applyTheme(themeToggle.checked ? 'dark' : 'light');
});

// Keep navbar dark in dark mode even during scroll
window.addEventListener('scroll', () => {
    updateNavbarStyle();
});

// Navbar scroll behavior (only in light mode)
window.addEventListener('scroll', () => {
    if (htmlElement.getAttribute('data-theme') !== 'dark') {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = '';
            navbar.style.boxShadow = '';
        }
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    console.log('Form submitted:', Object.fromEntries(formData));
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Skills Animation
function initSkillsAnimation() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                const progressText = entry.target.querySelector('.progress-text');
                const targetWidth = progressBar.style.width;
                const percentage = parseInt(targetWidth);
                
                // Animate the progress bar width
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 100);

                // Animate the percentage number
                let startPercentage = 0;
                const duration = 1500; // 1.5 seconds
                const interval = 16; // ~60fps
                const steps = duration / interval;
                const incrementPerStep = percentage / steps;

                const counter = setInterval(() => {
                    startPercentage += incrementPerStep;
                    if (startPercentage >= percentage) {
                        startPercentage = percentage;
                        clearInterval(counter);
                    }
                    progressText.textContent = Math.round(startPercentage) + '%';
                }, interval);

                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    // Observe all skill cards
    skillCards.forEach(card => observer.observe(card));
}

// Scroll Spy and Navigation
function initializeNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Handle click events on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Smooth scroll to section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Handle scroll events
    function updateActiveSection() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // Offset for navbar height
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current section's link
                correspondingLink?.classList.add('active');
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', updateActiveSection);
    
    // Set initial active state
    updateActiveSection();
}

// Mobile menu toggle
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSkillsAnimation();
    initializeNavigation();
    initializeMobileMenu();
});

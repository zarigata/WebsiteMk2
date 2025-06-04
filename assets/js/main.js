// ============================================
// Sleek - Digital Brand Acceleration
// Main JavaScript File
// ============================================

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initMobileMenu();
    initScrollToTop();
    initScrollSpy();
    initAnimations();
    initLanguageToggle();
    initFormValidation();
    
    // Add scroll event for navbar
    window.addEventListener('scroll', handleScroll);
});

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

/**
 * Initialize scroll to top button
 */
function initScrollToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Initialize scroll spy for navigation highlighting
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    // Highlight active section in navigation
    const highlightNav = () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Call once on load
}

/**
 * Initialize animations on scroll
 */
function initAnimations() {
    const animateElements = document.querySelectorAll('.fade-in, .service-card, .timeline-item');
    
    if (animateElements.length === 0) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

/**
 * Initialize language toggle functionality
 */
function initLanguageToggle() {
    const languageToggle = document.getElementById('language-toggle');
    
    if (!languageToggle) return;
    
    // Check for saved language preference or use browser language
    const savedLang = localStorage.getItem('preferredLanguage') || 
                     (navigator.language.startsWith('ar') ? 'ar' : 'en');
    
    // Set initial language
    setLanguage(savedLang);
    
    // Toggle language on button click
    languageToggle.addEventListener('click', () => {
        const currentLang = document.documentElement.lang;
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
    });
    
    // Function to set language and update UI
    function setLanguage(lang) {
        loadTranslations(lang);
    }
    
    // Function to load translations
    async function loadTranslations(lang) {
        try {
            const response = await fetch(`assets/lang/${lang}.json`);
            if (!response.ok) throw new Error('Failed to load translations');
            
            const translations = await response.json();
            applyTranslations(translations, lang);
            
            // Update HTML lang and dir attributes
            document.documentElement.lang = lang;
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
            
            // Save language preference
            localStorage.setItem('preferredLanguage', lang);
            
            // Update toggle button text
            const enText = document.querySelector('.lang-en');
            const arText = document.querySelector('.lang-ar');
            
            if (lang === 'ar') {
                enText.style.display = 'inline';
                arText.style.display = 'none';
            } else {
                enText.style.display = 'none';
                arText.style.display = 'inline';
            }
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }
    
    // Function to apply translations to the page
    function applyTranslations(translations, lang) {
        // Update text content for elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                // For buttons, inputs, etc., we want to update the value or placeholder
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    const placeholderKey = element.getAttribute('data-i18n-placeholder');
                    if (placeholderKey && translations[placeholderKey]) {
                        element.placeholder = translations[placeholderKey];
                    }
                } else if (element.tagName === 'BUTTON' || element.tagName === 'A') {
                    element.textContent = translations[key];
                } else {
                    element.textContent = translations[key];
                }
            }
        });
        
        // Update any RTL-specific styles
        if (lang === 'ar') {
            document.body.classList.add('rtl');
        } else {
            document.body.classList.remove('rtl');
        }
    }
}

/**
 * Initialize form validation
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    if (forms.length === 0) return;
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
            }
        });
    });
    
    // Add input event listeners for real-time validation
    document.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
        });
        
        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });
    
    // Validate entire form
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // Validate single input
    function validateInput(input) {
        const value = input.value.trim();
        const fieldName = input.getAttribute('name') || 'This field';
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous error
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
        
        // Required validation
        if (input.hasAttribute('required') && !value) {
            errorMessage = `${fieldName} is required`;
            isValid = false;
        } 
        // Email validation
        else if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
        }
        // URL validation
        else if (input.type === 'url' && value) {
            try {
                new URL(value);
            } catch (e) {
                errorMessage = 'Please enter a valid URL';
                isValid = false;
            }
        }
        // Min length validation
        else if (input.hasAttribute('minlength') && value.length < parseInt(input.getAttribute('minlength'))) {
            errorMessage = `Must be at least ${input.getAttribute('minlength')} characters`;
            isValid = false;
        }
        
        // Add error message if invalid
        if (!isValid) {
            input.classList.add('error');
            
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = errorMessage;
            
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        } else {
            input.classList.remove('error');
        }
        
        return isValid;
    }
}

/**
 * Handle scroll events
 */
function handleScroll() {
    // Add/remove scrolled class to navbar
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

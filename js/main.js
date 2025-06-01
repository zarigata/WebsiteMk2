/**
 * Catchy Marketing Website - Main JavaScript
 * Handles language switching, navigation, and UI interactions
 */

// ======================
// GLOBAL VARIABLES
// ======================
let currentLanguage = 'en';
const translations = {
    // Navigation
    logoText: { en: "Catchy", ar: "كاتشي" },
    navHome: { en: "Home", ar: "الرئيسية" },
    navAbout: { en: "About Us", ar: "من نحن" },
    navServices: { en: "Services", ar: "خدماتنا" },
    navBlog: { en: "Blog", ar: "المدونة" },
    navContact: { en: "Contact Us", ar: "اتصل بنا" },
    
    // Hero Section
    heroTitle: { en: "Transform Your Digital Presence in Saudi Arabia", ar: "حول وجودك الرقمي في المملكة العربية السعودية" },
    heroSubtitle: { en: "We craft bespoke marketing strategies that drive real results. From brand development to digital transformation, we help Saudi businesses thrive in the digital age.", ar: "نصمم استراتيجيات تسويقية مخصصة تحقق نتائج حقيقية. من تطوير العلامة التجارية إلى التحول الرقمي، نساعد الشركات السعودية على الازدهار في العصر الرقمي." },
    ourServices: { en: "Our Services", ar: "خدماتنا" },
    getInTouch: { en: "Get in Touch", ar: "تواصل معنا" },
    heroImageAlt: { en: "Digital Marketing Solutions", ar: "حلول التسويق الرقمي" },
    
    // Other sections will be added here
    srOnlyMenu: { en: "Menu", ar: "القائمة" },
    
    // About Section
    aboutTitle: { en: "About Us", ar: "من نحن" },
    
    // Services Section
    servicesTitle: { en: "Our Services", ar: "خدماتنا" },
    
    // Blog Section
    blogTitle: { en: "Latest Insights", ar: "أحدث المقالات" },
    
    // Contact Section
    contactTitle: { en: "Get In Touch", ar: "تواصل معنا" },
    contactFormName: { en: "Your Name", ar: "الاسم" },
    contactFormEmail: { en: "Your Email", ar: "البريد الإلكتروني" },
    contactFormMessage: { en: "Your Message", ar: "رسالتك" },
    contactFormSubmit: { en: "Send Message", ar: "إرسال الرسالة" },
    
    // Footer
    footerRights: { en: "© 2025 Catchy. All rights reserved.", ar: "© 2025 كاتشي. جميع الحقوق محفوظة." }
};

// ======================
// DOM ELEMENTS
// ======================
const DOMElements = {
    // Core Elements
    html: document.documentElement,
    body: document.body,
    
    // Header & Navigation
    header: document.getElementById('main-header'),
    languageToggle: document.getElementById('language-toggle'),
    menuToggle: document.getElementById('menu-toggle'),
    navMenu: document.querySelector('.nav-links'),
    navLinks: document.querySelectorAll('.nav-links a'),
    
    // Page Sections
    pageSections: document.querySelectorAll('.page-section'),
    heroSection: document.getElementById('home'),
    
    // Content Containers
    teamContainer: document.getElementById('team-members-container'),
    servicesContainer: document.getElementById('services-list-container'),
    blogContainer: document.getElementById('blog-posts-container')
};

// ======================
// LANGUAGE FUNCTIONS
// ======================
function setLanguage(lang) {
    currentLanguage = lang;
    DOMElements.html.lang = lang;
    DOMElements.html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update all elements with data-lang-key attribute
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (key && translations[key]) {
            element.textContent = translations[key][currentLanguage];
        }
    });
    
    // Update active class on nav links
    updateActiveNavLink();
}

function toggleLanguage() {
    const newLang = currentLanguage === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    
    // Save preference to localStorage
    try {
        localStorage.setItem('preferredLanguage', newLang);
    } catch (e) {
        console.warn('Could not save language preference:', e);
    }
}

// ======================
// MOBILE MENU
// ======================
function toggleMobileMenu() {
    const isExpanded = DOMElements.menuToggle.getAttribute('aria-expanded') === 'true' || false;
    DOMElements.menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    DOMElements.menuToggle.classList.toggle('active');
    DOMElements.navMenu.classList.toggle('active');
    DOMElements.body.classList.toggle('menu-open');
    
    // Toggle body scroll when menu is open
    if (!isExpanded) {
        DOMElements.body.style.overflow = 'hidden';
    } else {
        DOMElements.body.style.overflow = '';
    }
}

// ======================
// NAVIGATION
// ======================
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    DOMElements.pageSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            DOMElements.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ======================
// SMOOTH SCROLL
// ======================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's a different page or no target
            if (targetId === '#' || targetId.includes(':')) return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, '', targetId);
            }
        });
    });
}

// ======================
// INITIALIZATION
// =====================
function init() {
    // Set initial language from localStorage or default to 'en'
    try {
        const savedLang = localStorage.getItem('preferredLanguage');
        setLanguage(savedLang || 'en');
    } catch (e) {
        setLanguage('en');
    }
    
    // Initialize event listeners
    initEventListeners();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Initial active link check
    updateActiveNavLink();
    
    // Add loaded class to body for transitions
    setTimeout(() => {
        DOMElements.body.classList.add('loaded');
    }, 100);
    
    console.log('Catchy website initialized');
}

function initEventListeners() {
    // Language toggle
    if (DOMElements.languageToggle) {
        DOMElements.languageToggle.addEventListener('click', toggleLanguage);
    }
    
    // Mobile menu toggle
    if (DOMElements.menuToggle) {
        DOMElements.menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on a nav link
    DOMElements.navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (DOMElements.navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

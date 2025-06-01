// ======================
// SCROLL ANIMATIONS
// ======================

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

// Function to add animation class when element is in viewport
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        if (isInViewport(element) && !element.classList.contains('animated')) {
            element.classList.add('animated');
            
            // Add specific animation based on data attribute
            const animationType = element.getAttribute('data-animation') || 'fadeInUp';
            element.style.animation = `${animationType} 0.8s ease-out forwards`;
            
            // Add delay if specified
            const delay = element.getAttribute('data-delay') || '0s';
            element.style.animationDelay = delay;
        }
    });
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Initial check for elements in viewport
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        animateOnScroll();
        handleHeaderScroll();
    });
    
    // Add loaded class to body to enable transitions
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Parallax effect for hero section
function parallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    const scrollPosition = window.pageYOffset;
    heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
}

window.addEventListener('scroll', parallaxEffect);

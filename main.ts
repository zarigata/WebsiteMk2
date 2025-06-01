// // CODEX_INFO_BLOCK //
// // PROJECT: Catchy Marketing Website
// // FILE: main.ts
// // AUTHOR: Cascade AI for USER
// // DATE: 2025-06-01
// // PURPOSE: Main TypeScript file for website interactivity, language switching, and content loading.
// // VERSION: 1.0.0
// // NOTES: Compile this file using `tsc` to generate js/main.js.
// // END_CODEX_INFO_BLOCK //

// // TYPE_DEFINITIONS :: For structured data from JSON files //
interface TeamMember {
    id: number;
    name_en: string;
    name_ar: string;
    role_en: string;
    role_ar: string;
    intro_en: string;
    intro_ar: string;
    image: string; // Path to image
}

interface ServiceItem {
    id: number;
    name_en: string;
    name_ar: string;
    description_en: string;
    description_ar: string;
    icon_placeholder: string; // e.g., a class name for an icon font or an emoji
}

interface BlogPost {
    id: number;
    title_en: string;
    title_ar: string;
    date_en: string;
    date_ar: string;
    summary_en: string;
    summary_ar: string;
    image_placeholder: string; // Path to image or placeholder text
    content_en: string; // Full content (can be markdown or HTML string)
    content_ar: string;
}

interface Translations {
    [key: string]: {
        en: string;
        ar: string;
    };
}
// // END_TYPE_DEFINITIONS //

// // GLOBAL_STATE :: Manages current language and potentially other states //
let currentLanguage: 'en' | 'ar' = 'en';
const translations: Translations = {}; // To be populated from a JSON or directly
// // END_GLOBAL_STATE //

// // DOM_ELEMENT_SELECTORS :: Cache frequently accessed DOM elements //
const DOMElements = {
    html: document.documentElement,
    languageToggle: document.getElementById('language-toggle') as HTMLButtonElement,
    menuToggle: document.getElementById('menu-toggle') as HTMLButtonElement,
    navMenu: document.querySelector('.nav-links') as HTMLUListElement, // The <ul> element itself
    navLinks: document.querySelectorAll('.nav-links a') as NodeListOf<HTMLAnchorElement>,
    pageSections: document.querySelectorAll('.page-section') as NodeListOf<HTMLElement>,
    teamContainer: document.getElementById('team-members-container') as HTMLElement,
    servicesContainer: document.getElementById('services-list-container') as HTMLElement,
    blogContainer: document.getElementById('blog-posts-container') as HTMLElement,
    // Add more elements as needed
};
// // END_DOM_ELEMENT_SELECTORS //

// // TRANSLATION_DATA :: Static text translations //
// This could also be loaded from a JSON file for better organization
const siteTranslations: Translations = {
    logoText: { en: "Catchy", ar: "كاتشي" },
    navHome: { en: "Home", ar: "الرئيسية" },
    navAbout: { en: "About Us", ar: "من نحن" },
    navServices: { en: "Services", ar: "خدماتنا" },
    navBlog: { en: "Blog", ar: "المدونة" },
    navContact: { en: "Contact Us", ar: "اتصل بنا" },
    heroTitle: { en: "Elevate Your Brand with Catchy", ar: "ارتقِ بعلامتك التجارية مع كاتشي" },
    heroSubtitle: { en: "We provide complete marketing and automation solutions to grow your business online.", ar: "نقدم حلول تسويق وأتمتة متكاملة لتنمية أعمالك عبر الإنترنت." },
    heroCTA: { en: "Contact Us", ar: "اتصل بنا" },
    heroImagePlaceholder: { en: "[Main Brand Image/Banner]", ar: "[الصورة الرئيسية للعلامة التجارية/البانر]" },
    aboutPreviewTitle: { en: "Who We Are", ar: "من نحن" },
    aboutPreviewText: { en: "Catchy is your dedicated partner in navigating the digital landscape of Saudi Arabia. We craft bespoke marketing strategies that resonate and deliver results.", ar: "كاتشي هو شريكك المتخصص في استكشاف المشهد الرقمي في المملكة العربية السعودية. نصنع استراتيجيات تسويق مخصصة تترك أثراً وتحقق النتائج." },
    learnMore: { en: "Learn More About Us", ar: "اعرف المزيد عنا" },
    servicesPreviewTitle: { en: "What We Offer", ar: "ماذا نقدم" },
    serviceItem1: { en: "[Service 1: Marketing Strategy]", ar: "[الخدمة 1: استراتيجية التسويق]" },
    serviceItem2: { en: "[Service 2: Online Presence]", ar: "[الخدمة 2: التواجد عبر الإنترنت]" },
    serviceItem3: { en: "[Service 3: Website Creation]", ar: "[الخدمة 3: إنشاء المواقع]" },
    seeAllServices: { en: "See All Services", ar: "عرض جميع الخدمات" },
    aboutTitle: { en: "About Catchy", ar: "عن كاتشي" },
    aboutStory: { en: "[Brief story of Catchy...]", ar: "[قصة موجزة عن كاتشي...]" },
    teamTitle: { en: "Our Team", ar: "فريقنا" },
    visionTitle: { en: "Our Vision & Values", ar: "رؤيتنا وقيمنا" },
    visionText: { en: "[Company vision and values...]", ar: "[رؤية الشركة وقيمها...]" },
    servicesTitle: { en: "Our Services", ar: "خدماتنا" },
    blogTitle: { en: "Catchy Insights", ar: "رؤى كاتشي" },
    contactTitle: { en: "Get In Touch", ar: "تواصل معنا" },
    formName: { en: "Name:", ar: "الاسم:" },
    formEmail: { en: "Email:", ar: "البريد الإلكتروني:" },
    formMessage: { en: "Message:", ar: "الرسالة:" },
    formSubmit: { en: "Send Message", ar: "إرسال الرسالة" },
    contactAddress: { en: "Address: [Your Company Address, Riyadh, Saudi Arabia]", ar: "العنوان: [عنوان شركتك، الرياض، المملكة العربية السعودية]" },
    contactPhone: { en: "Phone: [Your Phone Number]", ar: "الهاتف: [رقم هاتفك]" },
    socialLinkedIn: { en: "LinkedIn", ar: "لينكدإن" },
    socialTwitter: { en: "Twitter", ar: "تويتر" },
    socialInstagram: { en: "Instagram", ar: "انستغرام" },
    mapPlaceholder: { en: "[Google Maps Embed Here]", ar: "[تضمين خرائط جوجل هنا]" },
    footerCopyright: { en: "&copy; 2025 Catchy. All rights reserved.", ar: "&copy; 2025 كاتشي. جميع الحقوق محفوظة." },
    footerPrivacy: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
    footerTerms: { en: "Terms of Service", ar: "شروط الخدمة" },
    srOnlyMenu: { en: "Open navigation menu", ar: "فتح قائمة التنقل" },
};
// // END_TRANSLATION_DATA //

// // LANGUAGE_FUNCTIONS :: Handles language switching and text updates // 
function setLanguage(lang: 'en' | 'ar'): void {
    currentLanguage = lang;
    DOMElements.html.lang = lang;
    DOMElements.html.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // // Update all elements with data-lang-key attribute
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (key && siteTranslations[key]) {
            element.textContent = siteTranslations[key][currentLanguage];
        }
    });

    // // Update dynamically loaded content if it's already rendered
    if (DOMElements.teamContainer && DOMElements.teamContainer.children.length > 0) loadTeamMembers();
    if (DOMElements.servicesContainer && DOMElements.servicesContainer.children.length > 0) loadServices();
    if (DOMElements.blogContainer && DOMElements.blogContainer.children.length > 0) loadBlogPosts();
    
    // // Update language toggle button text (optional)
    DOMElements.languageToggle.textContent = lang === 'en' ? 'AR' : 'EN';
}

function toggleLanguage(): void {
    setLanguage(currentLanguage === 'en' ? 'ar' : 'en');
}
// // END_LANGUAGE_FUNCTIONS //

// // MOBILE_MENU_FUNCTIONS :: Handles toggling the mobile navigation menu //
function toggleMobileMenu(): void {
    const isExpanded = DOMElements.menuToggle.getAttribute('aria-expanded') === 'true' || false;
    DOMElements.menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    DOMElements.menuToggle.classList.toggle('active');
    DOMElements.navMenu.classList.toggle('active');

    // // Update screen reader text for menu button
    const srTextElement = DOMElements.menuToggle.querySelector('.sr-only');
    if (srTextElement) {
        const menuKey = DOMElements.navMenu.classList.contains('active') ? 'srOnlyCloseMenu' : 'srOnlyOpenMenu';
        // // Add translations for close menu if not present
        if (!siteTranslations.srOnlyCloseMenu) siteTranslations.srOnlyCloseMenu = { en: "Close navigation menu", ar: "إغلاق قائمة التنقل" };
        if (!siteTranslations.srOnlyOpenMenu) siteTranslations.srOnlyOpenMenu = { en: "Open navigation menu", ar: "فتح قائمة التنقل" };
        
        srTextElement.textContent = siteTranslations[menuKey][currentLanguage];
    }
}
// // END_MOBILE_MENU_FUNCTIONS //

// // CONTENT_LOADING_FUNCTIONS :: Fetches and renders dynamic content //
async function fetchData<T>(url: string): Promise<T> {
    // // Simulating fetch for local JSON files
    // // In a real GitHub Pages scenario, ensure these files are accessible
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} for URL: ${url}`);
        }
        return await response.json() as T;
    } catch (error) {
        console.error(`// ERROR :: Failed to fetch data from ${url}:`, error);
        // // Fallback to empty array or default structure to prevent site breaking
        return [] as T; 
    }
}

async function loadTeamMembers(): Promise<void> {
    if (!DOMElements.teamContainer) return;
    try {
        const team = await fetchData<TeamMember[]>('./team.json');
        DOMElements.teamContainer.innerHTML = ''; // // Clear existing content
        team.forEach(member => {
            const memberDiv = document.createElement('div');
            memberDiv.className = 'team-member';
            memberDiv.innerHTML = `
                <img src="${member.image}" alt="${currentLanguage === 'en' ? member.name_en : member.name_ar}">
                <h4>${currentLanguage === 'en' ? member.name_en : member.name_ar}</h4>
                <p class="role">${currentLanguage === 'en' ? member.role_en : member.role_ar}</p>
                <p>${currentLanguage === 'en' ? member.intro_en : member.intro_ar}</p>
            `;
            DOMElements.teamContainer.appendChild(memberDiv);
        });
    } catch (error) {
        console.error('// ERROR :: Could not load team members:', error);
        DOMElements.teamContainer.innerHTML = `<p>${currentLanguage === 'en' ? 'Team members could not be loaded.' : 'لم يتم تحميل أعضاء الفريق.'}</p>`;
    }
}

async function loadServices(): Promise<void> {
    if (!DOMElements.servicesContainer) return;
    try {
        const services = await fetchData<ServiceItem[]>('./services.json');
        DOMElements.servicesContainer.innerHTML = ''; // // Clear existing content
        services.forEach(service => {
            const serviceDiv = document.createElement('div');
            serviceDiv.className = 'service-item';
            serviceDiv.innerHTML = `
                <div class="icon-placeholder">${service.icon_placeholder}</div> 
                <h4>${currentLanguage === 'en' ? service.name_en : service.name_ar}</h4>
                <p>${currentLanguage === 'en' ? service.description_en : service.description_ar}</p>
            `;
            // // Note: Icons would typically be classes for an icon font (e.g., Font Awesome) or SVG elements.
            // // For now, 'icon_placeholder' is just text.
            DOMElements.servicesContainer.appendChild(serviceDiv);
        });
    } catch (error) {
        console.error('// ERROR :: Could not load services:', error);
        DOMElements.servicesContainer.innerHTML = `<p>${currentLanguage === 'en' ? 'Services could not be loaded.' : 'لم يتم تحميل الخدمات.'}</p>`;
    }
}

async function loadBlogPosts(): Promise<void> {
    if (!DOMElements.blogContainer) return;
    try {
        const posts = await fetchData<BlogPost[]>('./blog-posts.json');
        DOMElements.blogContainer.innerHTML = ''; // // Clear existing content
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'blog-post-preview';
            // // Basic preview, a full post view would require more logic or a separate template
            postDiv.innerHTML = `
                ${post.image_placeholder && post.image_placeholder !== '[none]' ? `<img src="${post.image_placeholder}" alt="${currentLanguage === 'en' ? post.title_en : post.title_ar}" class="featured-image">` : ''}
                <div class="content">
                    <h4>${currentLanguage === 'en' ? post.title_en : post.title_ar}</h4>
                    <p class="date">${currentLanguage === 'en' ? post.date_en : post.date_ar}</p>
                    <p>${currentLanguage === 'en' ? post.summary_en : post.summary_ar}</p>
                    <a href="#blog-post-${post.id}" class="learn-more-button" data-lang-key="readMore">${currentLanguage === 'en' ? 'Read More' : 'اقرأ المزيد'}</a>
                </div>
            `;
            DOMElements.blogContainer.appendChild(postDiv);
        });
        // // Add 'readMore' to translations if not present
        if (!siteTranslations.readMore) {
            siteTranslations.readMore = { en: "Read More", ar: "اقرأ المزيد" };
        }

    } catch (error) {
        console.error('// ERROR :: Could not load blog posts:', error);
        DOMElements.blogContainer.innerHTML = `<p>${currentLanguage === 'en' ? 'Blog posts could not be loaded.' : 'لم يتم تحميل منشورات المدونة.'}</p>`;
    }
}
// // END_CONTENT_LOADING_FUNCTIONS //

// // NAVIGATION_FUNCTIONS :: Handles SPA-like page section visibility //
function showPageSection(targetId: string): void {
    DOMElements.pageSections.forEach(section => {
        if (section.id === targetId) {
            section.style.display = 'block';
            // // Dynamically load content if this section is being shown for the first time or needs refresh
            if (targetId === 'about' && DOMElements.teamContainer && DOMElements.teamContainer.children.length === 0) loadTeamMembers();
            if (targetId === 'services' && DOMElements.servicesContainer && DOMElements.servicesContainer.children.length === 0) loadServices();
            if (targetId === 'blog' && DOMElements.blogContainer && DOMElements.blogContainer.children.length === 0) loadBlogPosts();
        } else {
            // // Only hide sections that are designated as full 'page-section'
            // // Keep hero and other homepage previews visible unless explicitly part of a different view logic
            if(section.classList.contains('page-section')) {
                 section.style.display = 'none';
            }
        }
    });

    // // Special handling for homepage sections if we are not on a specific 'page'
    const homepageSections = ['home', 'about-preview', 'services-preview'];
    const isHomePageView = homepageSections.includes(targetId) || targetId === 'index.html' || targetId === '';

    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.style.display = isHomePageView || targetId === 'home' ? 'flex' : 'none'; // hero is flex
    }
    const aboutPreviewSection = document.getElementById('about-preview');
    if (aboutPreviewSection) {
        aboutPreviewSection.style.display = isHomePageView ? 'block' : 'none';
    }
    const servicesPreviewSection = document.getElementById('services-preview');
    if (servicesPreviewSection) {
        servicesPreviewSection.style.display = isHomePageView ? 'block' : 'none';
    }
    
    // // The main contact section is always visible at the bottom in this design, but if it were a page:
    // const contactSection = document.getElementById('contact');
    // if (contactSection) {
    //    contactSection.style.display = isHomePageView || targetId === 'contact' ? 'block' : 'none';
    // }

    // // Scroll to the top of the section or page
    const activeSection = document.getElementById(targetId);
    if (activeSection) activeSection.scrollIntoView({ behavior: 'smooth' });

}

function handleNavigation(event: Event): void {
    event.preventDefault();
    const target = event.currentTarget as HTMLAnchorElement;
    const targetId = target.getAttribute('href')?.substring(1) || 'home'; // Default to home
    
    showPageSection(targetId);

    // // Update active class on nav links
    DOMElements.navLinks.forEach(link => link.classList.remove('active'));
    target.classList.add('active');

    // // Close mobile menu after navigation (if open and on mobile view)
    if (DOMElements.navMenu.classList.contains('active') && DOMElements.menuToggle.style.display !== 'none') {
        toggleMobileMenu();
    }
}
// // END_NAVIGATION_FUNCTIONS //

// // INITIALIZATION_FUNCTION :: Sets up event listeners and initial state //
function initializeWebsite(): void {
    // // Set initial language based on browser or default
    // // For simplicity, defaulting to 'en'. Could check browser lang: navigator.language.startsWith('ar')
    setLanguage('en'); 

    if (DOMElements.languageToggle) {
        DOMElements.languageToggle.addEventListener('click', toggleLanguage);
    }

    if (DOMElements.menuToggle) {
        DOMElements.menuToggle.addEventListener('click', toggleMobileMenu);
    }

    DOMElements.navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // // Determine initial page view based on URL hash, or default to home
    const initialHash = window.location.hash.substring(1);
    const validInitialSections = ['home', 'about', 'services', 'blog', 'contact'];
    
    if (initialHash && validInitialSections.includes(initialHash)) {
        showPageSection(initialHash);
        // // Set active nav link
        const activeNavLink = document.querySelector(`.nav-links a[href="#${initialHash}"]`);
        if (activeNavLink) activeNavLink.classList.add('active');
    } else {
        showPageSection('home'); // // Default to showing homepage content
        const homeNavLink = document.querySelector('.nav-links a[href="#home"]');
        if (homeNavLink) homeNavLink.classList.add('active');
    }

    // // Load contact form if on contact page or if it's always visible
    // // No specific dynamic loading for contact form in this setup, it's static HTML.

    console.log('// LOG :: Catchy website initialized //');
}
// // END_INITIALIZATION_FUNCTION //

// // EVENT_LISTENERS_ATTACHMENT :: Ensures DOM is ready before running scripts //
document.addEventListener('DOMContentLoaded', initializeWebsite);
// // END_EVENT_LISTENERS_ATTACHMENT //

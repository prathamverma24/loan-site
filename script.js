// ========== GSAP REGISTRATION & SETUP ==========
gsap.registerPlugin(ScrollTrigger);

// ========== HERO CAROUSEL FUNCTIONALITY ==========
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const totalSlides = slides.length;
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Auto-rotate slides every 8 seconds
let autoRotateTimer = setInterval(nextSlide, 8000);

// Navigation buttons
document.querySelector('.carousel-btn.next').addEventListener('click', () => {
    nextSlide();
    clearInterval(autoRotateTimer);
    autoRotateTimer = setInterval(nextSlide, 8000);
});

document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
    prevSlide();
    clearInterval(autoRotateTimer);
    autoRotateTimer = setInterval(nextSlide, 8000);
});

// Indicator clicks
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        clearInterval(autoRotateTimer);
        autoRotateTimer = setInterval(nextSlide, 8000);
    });
});

// ========== NAVBAR ANIMATION ==========
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop - 200 && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`a[href="#${section.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
});

// Mobile menu hamburger
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
});

// ========== HERO CAROUSEL CONTENT ANIMATIONS ==========

// Animate hero content on slide change
const heroContentWrappers = document.querySelectorAll('.hero-content-wrapper');
function animateSlideContent() {
    heroContentWrappers.forEach((wrapper, index) => {
        if (index === currentSlide) {
            gsap.to(wrapper, { duration: 0.8, opacity: 1, x: 0, ease: 'power2.out' });
        }
    });
}

// Call on slide change
const originalShowSlide = showSlide;
showSlide = function(index) {
    originalShowSlide(index);
    animateSlideContent();
};

// Initial animation
animateSlideContent();

// ========== ABOUT SECTION ANIMATIONS ==========

// Animate stats on scroll
gsap.to('.stat-item', {
    scrollTrigger: {
        trigger: '.stats',
        start: 'top 80%',
        end: 'center center',
        toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    y: 0,
    opacity: 1,
    stagger: 0.2,
    ease: 'power2.out'
});

// Counter animation for stats
const stats = document.querySelectorAll('.stat-item h4');
stats.forEach(stat => {
    const text = stat.textContent;
    const numbers = text.match(/\d+/);
    if (numbers) {
        const finalNumber = parseInt(numbers[0]);
        gsap.to(stat, {
            scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 2,
            innerText: finalNumber,
            snap: { innerText: 1 },
            ease: 'power1.out',
            onUpdate: function() {
                stat.innerText = Math.ceil(this.targets()[0].innerText) + '+';
            }
        });
    }
});

// Feature cards animation
gsap.to('.feature-card', {
    scrollTrigger: {
        trigger: '.about-features',
        start: 'top 80%'
    },
    duration: 0.6,
    y: 0,
    opacity: 1,
    stagger: 0.15,
    ease: 'power2.out'
});

// ========== SERVICES SECTION ANIMATIONS ==========

// Service cards stagger animation
gsap.to('.service-card', {
    scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 80%'
    },
    duration: 0.8,
    y: 0,
    opacity: 1,
    stagger: 0.1,
    ease: 'back.out'
});

// Service card icon bounce on hover
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.service-icon'), {
            duration: 0.6,
            y: -20,
            repeat: 3,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
});

// ========== TESTIMONIALS SECTION ANIMATIONS ==========

// Testimonial cards animation
gsap.to('.testimonial-card', {
    scrollTrigger: {
        trigger: '.testimonials-container',
        start: 'top 80%'
    },
    duration: 0.8,
    x: 0,
    opacity: 1,
    stagger: 0.15,
    ease: 'power2.out'
});

// Carousel functionality for testimonials
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonialCards.length;

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        if (i === index) {
            gsap.to(card, { duration: 0.5, opacity: 1, scale: 1 });
            card.style.display = 'block';
        } else {
            gsap.to(card, { duration: 0.5, opacity: 0, scale: 0.9 });
            card.style.display = 'none';
        }
    });
}

document.querySelector('.testimonial-nav .next').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
});

document.querySelector('.testimonial-nav .prev').addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentTestimonial);
});

// Initialize testimonials using grid on desktop
if (window.innerWidth > 768) {
    testimonialCards.forEach(card => {
        card.style.display = 'block';
        gsap.set(card, { opacity: 1, scale: 1 });
    });
}

// ========== CONTACT SECTION ANIMATIONS ==========

// Info items animation
gsap.to('.info-item', {
    scrollTrigger: {
        trigger: '.contact-info',
        start: 'top 80%'
    },
    duration: 0.8,
    x: 0,
    opacity: 1,
    stagger: 0.15,
    ease: 'power2.out'
});

// Form animation
gsap.to('.contact-form', {
    scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 80%'
    },
    duration: 0.8,
    y: 0,
    opacity: 1,
    ease: 'power2.out'
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Animation on submit
        gsap.to('.form-btn', {
            duration: 0.3,
            scale: 0.95
        });
        
        // Show success message
        const btn = contactForm.querySelector('.form-btn');
        const originalText = btn.textContent;
        btn.textContent = '✓ Message Sent!';
        
        setTimeout(() => {
            contactForm.reset();
            btn.textContent = originalText;
        }, 2000);
    });
}

// ========== SCROLL ANIMATIONS ==========

// Section headers animation
gsap.to('.section-header', {
    scrollTrigger: {
        trigger: '.section-header',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    y: 0,
    opacity: 1,
    ease: 'power2.out'
});

// Smooth scroll to section on nav click
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target.offsetTop - 100,
                    autoKill: true
                },
                ease: 'power2.inOut'
            });
        }
    });
});

// ========== BUTTON ANIMATIONS ==========

// All hero buttons animation
document.querySelectorAll('.hero-btn').forEach(btn => {
    btn.addEventListener('mouseenter', (e) => {
        gsap.to(e.target, { duration: 0.3, scale: 1.05 });
    });
    
    btn.addEventListener('mouseleave', (e) => {
        gsap.to(e.target, { duration: 0.3, scale: 1 });
    });
});

// Apply buttons animation
document.querySelectorAll('.apply-btn, .service-btn').forEach(btn => {
    btn.addEventListener('mouseenter', (e) => {
        gsap.to(e.target, { duration: 0.3, y: -3 });
    });
    
    btn.addEventListener('mouseleave', (e) => {
        gsap.to(e.target, { duration: 0.3, y: 0 });
    });
});

// ========== FOOTER ANIMATION ==========

gsap.to('.footer-section', {
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 80%'
    },
    duration: 0.8,
    y: 0,
    opacity: 1,
    stagger: 0.1,
    ease: 'power2.out'
});

// ========== PAGE LOAD ANIMATION ==========

// Initial page load animation
gsap.from('[data-animate]', {
    duration: 0.8,
    opacity: 0,
    y: 20,
    stagger: 0.1,
    ease: 'power2.out'
});

// ========== SCROLL PROGRESS BAR ==========

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 50px;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #6BA82D, #5A9620);
    z-index: 999;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// ========== PERFORMANCE: Reduce animations on low-end devices ==========

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    gsap.globalTimeline.timeScale(0.5);
}

// ========== UTILITY: Trigger ScrollTrigger refresh on window resize ==========

window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// ========== WINDOW LOAD EVENT ==========

window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});

// ========== PROFESSIONAL SERVICES CAROUSEL ==========

let profCurrentSlide = 0;
const profCarousel = document.querySelector('.prof-services-carousel');
const profSlides = document.querySelectorAll('.prof-service-card');
const totalProfSlides = profSlides.length;

function getProfSlidesPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
}

function showProfSlide(index) {
    if (!profCarousel || !profSlides.length) return;
    
    const slidesPerView = getProfSlidesPerView();
    const offset = -index * (100 / slidesPerView);
    profCarousel.style.transform = `translateX(${offset}%)`;
    
    profSlides.forEach(slide => slide.classList.remove('active'));
    profSlides[index]?.classList.add('active');
}

function nextProfSlide() {
    if (!profSlides.length) return;
    
    const slidesPerView = getProfSlidesPerView();
    const maxSlide = Math.max(0, totalProfSlides - slidesPerView);
    profCurrentSlide = (profCurrentSlide + 1) % (maxSlide + 1);
    showProfSlide(profCurrentSlide);
}

function prevProfSlide() {
    if (!profSlides.length) return;
    
    const slidesPerView = getProfSlidesPerView();
    const maxSlide = Math.max(0, totalProfSlides - slidesPerView);
    profCurrentSlide = (profCurrentSlide - 1 + (maxSlide + 1)) % (maxSlide + 1);
    showProfSlide(profCurrentSlide);
}

// Auto-rotate professional services carousel every 3 seconds
let profAutoRotateTimer = setInterval(nextProfSlide, 3000);

// Professional Services Navigation
const profPrevBtn = document.querySelector('#professional-services .prof-nav-btn.prev');
const profNextBtn = document.querySelector('#professional-services .prof-nav-btn.next');

if (profPrevBtn) {
    profPrevBtn.addEventListener('click', () => {
        prevProfSlide();
        clearInterval(profAutoRotateTimer);
        profAutoRotateTimer = setInterval(nextProfSlide, 3000);
    });
}

if (profNextBtn) {
    profNextBtn.addEventListener('click', () => {
        nextProfSlide();
        clearInterval(profAutoRotateTimer);
        profAutoRotateTimer = setInterval(nextProfSlide, 3000);
    });
}

// Initialize professional services carousel
if (profCarousel && profSlides.length) {
    showProfSlide(0);
}

// Handle window resize for professional services
window.addEventListener('resize', () => {
    if (profCarousel && profSlides.length) {
        showProfSlide(profCurrentSlide);
    }
});

// ========== PARTNERS CAROUSEL AUTO-SLIDER ==========

const partnersGrid = document.querySelector('.partners-grid');
const partnerCards = document.querySelectorAll('.partner-card');

if (partnersGrid && partnerCards.length) {
    let partnersCurrentIndex = 0;
    const partnersPerView = 4;
    const totalPartners = partnerCards.length;

    function slidePartners() {
        partnersCurrentIndex = (partnersCurrentIndex + 1) % (totalPartners - partnersPerView + 1);
        const offset = -(partnersCurrentIndex * (100 / partnersPerView));
        partnersGrid.style.transform = `translateX(${offset}%)`;
    }

    // Auto-rotate partners every 2 seconds
    setInterval(slidePartners, 2000);
}

console.log('✓ All animations initialized successfully!');
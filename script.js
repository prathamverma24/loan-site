(function () {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasGSAP = typeof window.gsap !== 'undefined';
    const hasScrollTrigger = hasGSAP && typeof window.ScrollTrigger !== 'undefined';

    if (hasGSAP && hasScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    function onReady(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn, { once: true });
        } else {
            fn();
        }
    }

    function setupNavbar() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        const topBar = document.querySelector('.top-bar');
        const topBarHeight = topBar ? topBar.offsetHeight : 0;
        let lastScrollY = window.scrollY;

        function updateNavbar() {
            const currentY = window.scrollY;
            const isScrollingDown = currentY > lastScrollY;

            navbar.classList.toggle('scrolled', currentY > 90);

            if (currentY <= 10) {
                navbar.classList.remove('navbar-hidden');
            } else if (isScrollingDown && currentY > 140) {
                navbar.classList.add('navbar-hidden');
            } else {
                navbar.classList.remove('navbar-hidden');
            }

            lastScrollY = currentY;
        }

        updateNavbar();
        window.addEventListener('scroll', updateNavbar, { passive: true });

        if (topBarHeight > 0) {
            document.documentElement.style.setProperty('--top-bar-height', topBarHeight + 'px');
        }
    }

    function setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (!hamburger || !navMenu) return;

        hamburger.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('is-open');
            navMenu.style.display = isOpen ? 'flex' : '';
            hamburger.classList.toggle('is-open', isOpen);
        });
    }

    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (!href || href === '#') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();
                const navbar = document.querySelector('.navbar');
                const offset = navbar ? navbar.offsetHeight + 12 : 0;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({ top, behavior: 'smooth' });
            });
        });
    }

    function setupHeroCarousel() {
        const slides = document.querySelectorAll('.hero-slide');
        if (!slides.length) return;

        const indicators = document.querySelectorAll('.indicator');
        const nextBtn = document.querySelector('.carousel-btn.next');
        const prevBtn = document.querySelector('.carousel-btn.prev');

        let currentSlide = 0;
        let timer;

        function animateActiveSlide() {
            if (!hasGSAP || prefersReducedMotion) return;

            const activeSlide = slides[currentSlide];
            const label = activeSlide.querySelector('.hero-service-label');
            const heading = activeSlide.querySelector('.hero-title');
            const subtitle = activeSlide.querySelector('.hero-subtitle');
            const button = activeSlide.querySelector('.hero-btn');

            gsap.fromTo(
                activeSlide,
                { scale: 1.08 },
                { scale: 1, duration: 1.2, ease: 'power2.out' }
            );

            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
            if (label) tl.fromTo(label, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0);
            if (heading) tl.fromTo(heading, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.1);
            if (subtitle) tl.fromTo(subtitle, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.3);
            if (button) tl.fromTo(button, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.5);
        }

        function showSlide(index) {
            slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
            indicators.forEach((dot, i) => dot.classList.toggle('active', i === index));
            currentSlide = index;
            animateActiveSlide();
        }

        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }

        function prevSlide() {
            const prev = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prev);
        }

        function resetTimer() {
            clearInterval(timer);
            timer = setInterval(nextSlide, 5000);
        }

        nextBtn?.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });

        prevBtn?.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });

        indicators.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showSlide(i);
                resetTimer();
            });
        });

        showSlide(0);
        resetTimer();
    }

    function animateOnScroll(selector, vars) {
        if (!hasGSAP || !hasScrollTrigger || prefersReducedMotion) return;

        const elements = gsap.utils.toArray(selector);
        if (!elements.length) return;

        const base = {
            opacity: 0,
            y: 50
        };

        const finalVars = {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            ...vars
        };

        const staggerStep = typeof finalVars.stagger === 'number' ? finalVars.stagger : 0;
        delete finalVars.stagger;

        elements.forEach((el, idx) => {
            const localDelay = idx * staggerStep;
            gsap.fromTo(el, base, {
                ...finalVars,
                delay: localDelay,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'restart none none reset'
                }
            });
        });
    }

    function setupScrollAnimations() {
        animateOnScroll('.service-page-hero-inner', { y: 36, stagger: 0 });
        animateOnScroll('.service-main-content', { x: -40, y: 0, stagger: 0 });
        animateOnScroll('.service-side-panel, .service-side-card', { x: 40, y: 0, stagger: 0.12 });
        animateOnScroll('.service-related-card', { y: 28, stagger: 0.12 });

        animateOnScroll('.about-hero-inner', { y: 36, stagger: 0 });
        animateOnScroll('.about-main-content, .about-story-content', { x: -40, y: 0, stagger: 0 });
        animateOnScroll('.about-main-image, .about-story-image', { x: 40, y: 0, stagger: 0 });
        animateOnScroll('.about-value-card, .about-mission-card', { y: 28, stagger: 0.12 });
        animateOnScroll('.partners-grid--about .partner-card', { y: 24, stagger: 0.08 });

        animateOnScroll('.process-step', { stagger: 0.2 });
        animateOnScroll('.expertise-content', { x: -50, y: 0, stagger: 0 });
        animateOnScroll('.expertise-image', { x: 50, y: 0, stagger: 0 });
        animateOnScroll('.awards-left', { x: -40, y: 0, stagger: 0 });
        animateOnScroll('.awards-right', { x: 40, y: 0, stagger: 0 });
        animateOnScroll('.cert-item', { y: 40, stagger: 0.18 });
        animateOnScroll('.prof-service-card', { y: 36, stagger: 0.16 });
        animateOnScroll('.partners-header', { y: 28, stagger: 0 });
        animateOnScroll('.partner-card', { y: 26, stagger: 0.08 });
        animateOnScroll('.testimonial-card', { y: 40, stagger: 0.16 });
        animateOnScroll('.faq-item', { y: 28, stagger: 0.1 });
        animateOnScroll('.contact-left', { x: -45, y: 0, stagger: 0 });
        animateOnScroll('.contact-right', { x: 45, y: 0, stagger: 0 });
        animateOnScroll('.footer-cta', { y: 34, stagger: 0 });
        animateOnScroll('.footer-brand, .footer-links-column, .footer-contact-column', { y: 26, stagger: 0.12 });

        animateOnScroll('.calculator-hero-inner', { y: 34, stagger: 0 });
        animateOnScroll('.partners-page-card', { y: 30, stagger: 0.08 });
        animateOnScroll('.partners-heading-wrap', { y: 28, stagger: 0 });

        animateOnScroll('.achievements-page-hero h1, .achievements-page-hero p', { y: 28, stagger: 0.12 });
        animateOnScroll('.achievement-card', { y: 34, stagger: 0.12 });
        animateOnScroll('.calculator-card', { y: 34, stagger: 0 });
        animateOnScroll('.contact-card', { y: 24, stagger: 0.12 });
    }

    function setupTextAnimations() {
        if (!hasGSAP || !hasScrollTrigger || prefersReducedMotion) return;

        const sectionSelectors = [
            '.hero-content-wrapper',
            '.process-step',
            '.expertise-content',
            '.awards-left',
            '.award-detail-right',
            '.cert-item',
            '.prof-service-card',
            '.partners-header',
            '.testimonial-card',
            '.faq-header',
            '.faq-item',
            '.contact-left',
            '.contact-right',
            '.about-hero-inner',
            '.about-main-content',
            '.about-story-content',
            '.about-value-card',
            '.about-mission-card',
            '.service-page-hero-inner',
            '.service-main-content',
            '.service-side-panel',
            '.service-side-card',
            '.calculator-hero-inner',
            '.calculator-card',
            '.partners-page-hero-inner',
            '.partners-heading-wrap',
            '.achievements-page-hero',
            '.achievement-card',
            '.footer-cta-left',
            '.footer-brand',
            '.footer-links-column',
            '.footer-contact-column'
        ];

        sectionSelectors.forEach((sectionSelector) => {
            const sections = document.querySelectorAll(sectionSelector);
            sections.forEach((section) => {
                const textTargets = section.querySelectorAll('h1, h2, h3, h4, p, small, .hero-service-label, .process-label, .faq-label, .cert-hashtag, .achievement-tag, .nav-link, .form-btn, .hero-btn, .apply-btn, .learn-more-btn, .service-btn, .calculator-btn');
                if (!textTargets.length) return;

                gsap.fromTo(
                    textTargets,
                    { y: 24, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power2.out',
                        stagger: 0.08,
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                            end: 'bottom 20%',
                            toggleActions: 'restart none none reset'
                        }
                    }
                );
            });
        });
    }

    function setupCounters() {
        if (!hasGSAP || !hasScrollTrigger || prefersReducedMotion) return;

        const counterNodes = document.querySelectorAll('[data-counter], .counter-value, .stat-number');
        counterNodes.forEach((node) => {
            const raw = node.getAttribute('data-counter') || node.textContent || '';
            const target = parseInt((raw.match(/\d+/) || [])[0], 10);
            if (Number.isNaN(target)) return;

            const suffix = raw.replace(/\d+/g, '').trim();
            const state = { val: 0 };

            gsap.to(state, {
                val: target,
                duration: 2,
                ease: 'power1.out',
                scrollTrigger: {
                    trigger: node,
                    start: 'top 80%'
                },
                onUpdate: () => {
                    const value = Math.round(state.val);
                    node.textContent = suffix ? `${value}${suffix}` : `${value}`;
                }
            });
        });
    }

    function setupFaq() {
        const faqItems = document.querySelectorAll('.faq-item');
        if (!faqItems.length) return;

        faqItems.forEach((item) => {
            const button = item.querySelector('.faq-question');
            if (!button) return;

            button.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                faqItems.forEach((faq) => {
                    faq.classList.remove('active');
                    const q = faq.querySelector('.faq-question');
                    q?.setAttribute('aria-expanded', 'false');
                });

                if (!isActive) {
                    item.classList.add('active');
                    button.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    function setupTestimonials() {
        const cards = document.querySelectorAll('.testimonial-card');
        const next = document.querySelector('.testimonial-nav .next');
        const prev = document.querySelector('.testimonial-nav .prev');
        const container = document.querySelector('.testimonials-container');

        if (!cards.length || !next || !prev) return;

        let current = 0;
        let timer;

        function updateDesktopMode() {
            return window.innerWidth > 992;
        }

        function show(index) {
            if (updateDesktopMode()) {
                cards.forEach((card) => {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'none';
                });
                return;
            }

            cards.forEach((card, i) => {
                const active = i === index;
                card.style.display = active ? 'block' : 'none';
                if (hasGSAP && active && !prefersReducedMotion) {
                    gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
                }
            });
        }

        function nextSlide() {
            current = (current + 1) % cards.length;
            show(current);
        }

        function prevSlide() {
            current = (current - 1 + cards.length) % cards.length;
            show(current);
        }

        function startAuto() {
            clearInterval(timer);
            timer = setInterval(nextSlide, 4000);
        }

        next.addEventListener('click', () => {
            nextSlide();
            startAuto();
        });

        prev.addEventListener('click', () => {
            prevSlide();
            startAuto();
        });

        container?.addEventListener('mouseenter', () => clearInterval(timer));
        container?.addEventListener('mouseleave', startAuto);

        window.addEventListener('resize', () => show(current));

        show(0);
        startAuto();
    }

    function setupProfessionalServicesCarousel() {
        const carousel = document.querySelector('.prof-services-carousel');
        const slides = document.querySelectorAll('.prof-service-card');
        const nextBtn = document.querySelector('#professional-services .prof-nav-btn.next');
        const prevBtn = document.querySelector('#professional-services .prof-nav-btn.prev');

        if (!carousel || !slides.length || !nextBtn || !prevBtn) return;

        let current = 0;
        let timer;

        function slidesPerView() {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1024) return 2;
            return 3;
        }

        function render(index) {
            const perView = slidesPerView();
            const max = Math.max(0, slides.length - perView);
            current = Math.min(index, max);
            const offset = -(current * (100 / perView));
            carousel.style.transform = `translateX(${offset}%)`;
            slides.forEach((s, i) => s.classList.toggle('active', i === current));
        }

        function next() {
            const perView = slidesPerView();
            const max = Math.max(0, slides.length - perView);
            render(current >= max ? 0 : current + 1);
        }

        function prev() {
            const perView = slidesPerView();
            const max = Math.max(0, slides.length - perView);
            render(current <= 0 ? max : current - 1);
        }

        function startAuto() {
            clearInterval(timer);
            timer = setInterval(next, 3500);
        }

        nextBtn.addEventListener('click', () => {
            next();
            startAuto();
        });

        prevBtn.addEventListener('click', () => {
            prev();
            startAuto();
        });

        carousel.addEventListener('mouseenter', () => clearInterval(timer));
        carousel.addEventListener('mouseleave', startAuto);
        window.addEventListener('resize', () => render(current));

        render(0);
        startAuto();
    }

    function setupContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        const fields = form.querySelectorAll('input, select, textarea');
        fields.forEach((field) => {
            field.addEventListener('focus', () => field.classList.add('is-focus'));
            field.addEventListener('blur', () => field.classList.remove('is-focus'));
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.form-btn');
            if (!btn) return;

            const original = btn.textContent;
            btn.textContent = 'Message Sent!';
            btn.disabled = true;

            setTimeout(() => {
                form.reset();
                btn.textContent = original;
                btn.disabled = false;
            }, 1800);
        });
    }

    function setupHoverMicroInteractions() {
        const hoverTargets = document.querySelectorAll('.prof-service-card, .testimonial-card, .process-step, .contact-card, .partners-page-card, .achievement-card, .cert-item');

        hoverTargets.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                if (!hasGSAP || prefersReducedMotion) return;
                gsap.to(el, { y: -5, boxShadow: '0 14px 30px rgba(11,60,93,0.16)', duration: 0.28, ease: 'power2.out' });
            });

            el.addEventListener('mouseleave', () => {
                if (!hasGSAP || prefersReducedMotion) return;
                gsap.to(el, { y: 0, boxShadow: '', duration: 0.28, ease: 'power2.out' });
            });
        });
    }

    onReady(() => {
        setupNavbar();
        setupMobileMenu();
        setupSmoothScroll();
        setupHeroCarousel();
        setupScrollAnimations();
        setupTextAnimations();
        setupCounters();
        setupFaq();
        setupTestimonials();
        setupProfessionalServicesCarousel();
        setupContactForm();
        setupHoverMicroInteractions();

        if (hasScrollTrigger) {
            window.addEventListener('resize', () => ScrollTrigger.refresh());
            window.addEventListener('load', () => ScrollTrigger.refresh());
        }
    });
})();

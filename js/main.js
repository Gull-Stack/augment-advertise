/**
 * Augment & Advertise - Main JavaScript
 * Handles animations, interactions, and dynamic functionality
 */

(function() {
    'use strict';

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    /**
     * Debounce function for performance optimization
     */
    function debounce(func, wait = 10) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle function for scroll events
     */
    function throttle(func, limit = 100) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Check if element is in viewport
     */
    function isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset) &&
            rect.bottom >= offset
        );
    }


    // ============================================
    // HEADER & NAVIGATION
    // ============================================

    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navList = document.getElementById('navList');
    let lastScrollY = window.scrollY;
    let scrollDirection = 'up';

    /**
     * Handle header scroll behavior
     */
    function handleHeaderScroll() {
        const currentScrollY = window.scrollY;

        // Add/remove scrolled class
        if (currentScrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }

        // Determine scroll direction
        if (currentScrollY > lastScrollY) {
            scrollDirection = 'down';
        } else {
            scrollDirection = 'up';
        }

        lastScrollY = currentScrollY;
    }

    /**
     * Toggle mobile navigation
     */
    function toggleMobileNav() {
        navToggle.classList.toggle('nav__toggle--active');
        navList.classList.toggle('nav__list--open');
        document.body.classList.toggle('nav-open');
    }

    /**
     * Close mobile navigation
     */
    function closeMobileNav() {
        navToggle.classList.remove('nav__toggle--active');
        navList.classList.remove('nav__list--open');
        document.body.classList.remove('nav-open');
    }

    // Event listeners for navigation
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileNav);
    }

    // Close mobile nav when clicking on a link
    if (navList) {
        navList.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', closeMobileNav);
        });
    }

    // Close mobile nav on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileNav();
        }
    });

    // Header scroll listener
    window.addEventListener('scroll', throttle(handleHeaderScroll, 50));


    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================

    const revealElements = document.querySelectorAll('.reveal');
    const staggerElements = document.querySelectorAll('.stagger');

    /**
     * Reveal elements on scroll using Intersection Observer
     */
    function setupScrollReveal() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal--visible');
                    // Optionally unobserve after revealing
                    // revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    /**
     * Stagger animations for child elements
     */
    function setupStaggerAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('stagger--visible');
                }
            });
        }, observerOptions);

        staggerElements.forEach(element => {
            staggerObserver.observe(element);
        });
    }


    // ============================================
    // COUNTER ANIMATIONS
    // ============================================

    const counterElements = document.querySelectorAll('[data-counter]');
    const animatedCounters = new Set();

    /**
     * Animate counter from 0 to target value
     */
    function animateCounter(element) {
        if (animatedCounters.has(element)) return;

        const target = parseInt(element.dataset.counter, 10);
        const suffix = element.dataset.suffix || '';
        const prefix = element.dataset.prefix || '';
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        animatedCounters.add(element);

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const currentValue = Math.round(target * easeOut);
            element.textContent = prefix + currentValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = prefix + target + suffix;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    /**
     * Setup counter animations with Intersection Observer
     */
    function setupCounterAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                }
            });
        }, observerOptions);

        counterElements.forEach(element => {
            counterObserver.observe(element);
        });
    }


    // ============================================
    // BACK TO TOP BUTTON
    // ============================================

    const backToTopButton = document.getElementById('backToTop');

    /**
     * Handle back to top button visibility
     */
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('back-to-top--visible');
        } else {
            backToTopButton.classList.remove('back-to-top--visible');
        }
    }

    /**
     * Scroll to top smoothly
     */
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    if (backToTopButton) {
        backToTopButton.addEventListener('click', scrollToTop);
        window.addEventListener('scroll', throttle(handleBackToTop, 100));
    }


    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================

    /**
     * Setup smooth scrolling for anchor links
     */
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Skip if it's just "#"
                if (href === '#') return;

                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();

                    const headerOffset = header ? header.offsetHeight : 0;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 20;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile nav if open
                    closeMobileNav();
                }
            });
        });
    }


    // ============================================
    // PARALLAX EFFECTS
    // ============================================

    const parallaxElements = document.querySelectorAll('[data-parallax]');
    const heroFloats = document.querySelectorAll('.hero__float');

    /**
     * Apply parallax effect to elements
     */
    function handleParallax() {
        const scrollY = window.scrollY;

        // Hero floating elements parallax
        heroFloats.forEach((float, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = scrollY * speed;
            float.style.transform = `translateY(${yPos}px) rotate(${scrollY * 0.02}deg)`;
        });

        // Custom parallax elements
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const yPos = scrollY * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    if (heroFloats.length > 0 || parallaxElements.length > 0) {
        window.addEventListener('scroll', throttle(handleParallax, 16));
    }


    // ============================================
    // MOUSE FOLLOW EFFECTS
    // ============================================

    const heroBlock = document.querySelector('.hero__block-inner');
    let mouseX = 0;
    let mouseY = 0;
    let blockX = 0;
    let blockY = 0;

    /**
     * Handle mouse movement for subtle block movement
     */
    function handleMouseMove(e) {
        if (!heroBlock) return;

        const rect = heroBlock.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        mouseX = (e.clientX - centerX) / 50;
        mouseY = (e.clientY - centerY) / 50;
    }

    /**
     * Animate block position smoothly
     */
    function animateBlock() {
        if (!heroBlock) return;

        // Smooth interpolation
        blockX += (mouseX - blockX) * 0.1;
        blockY += (mouseY - blockY) * 0.1;

        heroBlock.style.transform = `translate(${blockX}px, ${blockY}px)`;

        requestAnimationFrame(animateBlock);
    }

    // Only enable on desktop
    if (window.innerWidth > 1024) {
        document.addEventListener('mousemove', handleMouseMove);
        animateBlock();
    }


    // ============================================
    // MAGNETIC BUTTONS
    // ============================================

    const magneticButtons = document.querySelectorAll('.btn--primary, .btn--secondary');

    /**
     * Add magnetic effect to buttons
     */
    function setupMagneticButtons() {
        if (window.innerWidth <= 1024) return;

        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0)';
            });
        });
    }


    // ============================================
    // SERVICE CARD 3D TILT
    // ============================================

    const serviceCards = document.querySelectorAll('.service-card');

    /**
     * Add 3D tilt effect to service cards
     */
    function setupCardTilt() {
        if (window.innerWidth <= 1024) return;

        serviceCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }


    // ============================================
    // FORM HANDLING
    // ============================================

    const forms = document.querySelectorAll('form');

    /**
     * Setup form validation and submission
     */
    function setupForms() {
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                // Add your form handling logic here
                // For now, just prevent default for demo
                // e.preventDefault();
            });

            // Add focus effects to inputs
            const inputs = form.querySelectorAll('.form-input, .form-textarea, .form-select');
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('form-group--focused');
                });
                input.addEventListener('blur', function() {
                    this.parentElement.classList.remove('form-group--focused');
                });
            });
        });
    }


    // ============================================
    // DYNAMIC YEAR UPDATE
    // ============================================

    /**
     * Update copyright year
     */
    function updateYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }


    // ============================================
    // PAGE TRANSITIONS
    // ============================================

    /**
     * Add page load animation
     */
    function pageLoadAnimation() {
        document.body.classList.add('page-loaded');
    }


    // ============================================
    // CURSOR EFFECTS (OPTIONAL)
    // ============================================

    /**
     * Custom cursor for interactive elements
     * Uncomment to enable
     */
    /*
    function setupCustomCursor() {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Add hover effect for links and buttons
        const interactiveElements = document.querySelectorAll('a, button, .service-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor--active'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--active'));
        });
    }
    */


    // ============================================
    // TEXT ANIMATION (TYPING EFFECT)
    // ============================================

    /**
     * Typing animation for hero text
     * Can be enabled for specific elements
     */
    function setupTypingAnimation() {
        const typingElements = document.querySelectorAll('[data-typing]');

        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.visibility = 'visible';

            let i = 0;
            const speed = parseInt(element.dataset.typing) || 50;

            function typeWriter() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                }
            }

            // Start typing when element is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeWriter();
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(element);
        });
    }


    // ============================================
    // LAZY LOADING IMAGES
    // ============================================

    /**
     * Setup lazy loading for images
     */
    function setupLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without Intersection Observer
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }


    // ============================================
    // ACCESSIBILITY ENHANCEMENTS
    // ============================================

    /**
     * Enhance accessibility features
     */
    function setupAccessibility() {
        // Skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    target.tabIndex = -1;
                    target.focus();
                }
            });
        }

        // Ensure focusable elements are properly accessible
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(el => {
            if (!el.getAttribute('aria-label') && !el.textContent.trim()) {
                console.warn('Focusable element missing accessible name:', el);
            }
        });
    }


    // ============================================
    // PREFERS REDUCED MOTION
    // ============================================

    /**
     * Respect user's motion preferences
     */
    function checkReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            document.documentElement.classList.add('reduced-motion');
            // Disable animations
            document.querySelectorAll('.reveal, .stagger').forEach(el => {
                el.classList.add('reveal--visible', 'stagger--visible');
            });
        }
    }


    // ============================================
    // INITIALIZATION
    // ============================================

    /**
     * Initialize all functionality
     */
    function init() {
        // Check for reduced motion preference first
        checkReducedMotion();

        // Core functionality
        updateYear();
        setupScrollReveal();
        setupStaggerAnimations();
        setupCounterAnimations();
        setupSmoothScroll();

        // Interactive effects (desktop only)
        if (window.innerWidth > 1024) {
            setupMagneticButtons();
            setupCardTilt();
        }

        // Forms
        setupForms();

        // Performance optimizations
        setupLazyLoading();

        // Accessibility
        setupAccessibility();

        // Page load animation
        requestAnimationFrame(() => {
            pageLoadAnimation();
        });

        console.log('Augment & Advertise - Site initialized');
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Reinitialize effects that depend on screen size
            if (window.innerWidth > 1024) {
                setupMagneticButtons();
                setupCardTilt();
            }
        }, 250);
    });

})();

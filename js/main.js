/**
 * Augment & Advertise - SuperTool Inspired JavaScript
 * Interactive effects and animations
 */

(function() {
    'use strict';

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    function throttle(func, delay) {
        let inProgress = false;
        return function(...args) {
            if (inProgress) return;
            inProgress = true;
            setTimeout(() => inProgress = false, delay);
            return func.apply(this, args);
        };
    }

    function debounce(func, wait) {
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

    // Check if element is in viewport
    function isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset) &&
            rect.bottom >= offset &&
            rect.left <= window.innerWidth &&
            rect.right >= 0
        );
    }

    // Lerp function for smooth interpolation
    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    // ============================================
    // NUMBER TICKER ANIMATION
    // ============================================

    class NumberTicker {
        constructor(element) {
            this.element = element;
            this.targetValue = parseInt(element.dataset.value) || 0;
            this.currentValue = 0;
            this.hasStarted = false;
        }

        start() {
            if (this.hasStarted) return;
            this.hasStarted = true;

            const duration = 2000; // 2 seconds
            const startTime = Date.now();
            const startValue = 0;

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease out cubic)
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                
                this.currentValue = Math.floor(startValue + (this.targetValue - startValue) * easeOutCubic);
                this.element.textContent = this.currentValue.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    this.element.textContent = this.targetValue.toLocaleString();
                }
            };

            animate();
        }
    }

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================

    class ScrollAnimations {
        constructor() {
            this.observers = [];
            this.init();
        }

        init() {
            this.setupIntersectionObserver();
            this.setupNumberTickers();
        }

        setupIntersectionObserver() {
            const options = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            // Stats section observer
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const items = entry.target.querySelectorAll('.stat-item');
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('animate');
                            }, index * 150);
                        });
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, options);

            const statsSection = document.querySelector('.stats-section');
            if (statsSection) {
                statsObserver.observe(statsSection);
            }

            // Features section observer
            const featuresObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cards = entry.target.querySelectorAll('.feature-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('animate');
                            }, index * 100);
                        });
                        featuresObserver.unobserve(entry.target);
                    }
                });
            }, options);

            const featuresSection = document.querySelector('.features-section');
            if (featuresSection) {
                featuresObserver.observe(featuresSection);
            }

            // How it works section observer
            const howItWorksObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const steps = entry.target.querySelectorAll('.step-item');
                        steps.forEach((step, index) => {
                            setTimeout(() => {
                                step.classList.add('animate');
                            }, index * 150);
                        });
                        howItWorksObserver.unobserve(entry.target);
                    }
                });
            }, options);

            const howItWorksSection = document.querySelector('.how-it-works-section');
            if (howItWorksSection) {
                howItWorksObserver.observe(howItWorksSection);
            }

            // Case studies section observer
            const caseStudiesObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cards = entry.target.querySelectorAll('.case-study-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('animate');
                            }, index * 150);
                        });
                        caseStudiesObserver.unobserve(entry.target);
                    }
                });
            }, options);

            const caseStudiesSection = document.querySelector('.case-studies-section');
            if (caseStudiesSection) {
                caseStudiesObserver.observe(caseStudiesSection);
            }

            // Team section observer
            const teamObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cards = entry.target.querySelectorAll('.team-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('animate');
                            }, index * 150);
                        });
                        teamObserver.unobserve(entry.target);
                    }
                });
            }, options);

            const teamSection = document.querySelector('.team-section');
            if (teamSection) {
                teamObserver.observe(teamSection);
            }
        }

        setupNumberTickers() {
            const tickerElements = document.querySelectorAll('.number-ticker');
            const tickers = Array.from(tickerElements).map(el => new NumberTicker(el));

            const tickerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const ticker = tickers.find(t => t.element === entry.target);
                        if (ticker) {
                            ticker.start();
                        }
                    }
                });
            }, { threshold: 0.5 });

            tickerElements.forEach(el => tickerObserver.observe(el));
        }
    }

    // ============================================
    // PARTICLE SYSTEM
    // ============================================

    class ParticleSystem {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.particles = [];
            this.mouse = { x: 0, y: 0 };
            this.animationId = null;
            
            this.init();
        }

        init() {
            this.resize();
            this.createParticles();
            this.bindEvents();
            this.animate();
        }

        resize() {
            const rect = this.canvas.parentElement.getBoundingClientRect();
            this.canvas.width = rect.width;
            this.canvas.height = rect.height;
        }

        createParticles() {
            const particleCount = 60;
            this.particles = [];

            for (let i = 0; i < particleCount; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    translateX: 0,
                    translateY: 0,
                    size: Math.random() * 2 + 0.4,
                    alpha: 0,
                    targetAlpha: Math.random() * 0.6 + 0.1,
                    dx: (Math.random() - 0.5) * 0.1,
                    dy: (Math.random() - 0.5) * 0.1,
                    magnetism: 0.1 + Math.random() * 4
                });
            }
        }

        bindEvents() {
            this.canvas.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left - this.canvas.width / 2;
                this.mouse.y = e.clientY - rect.top - this.canvas.height / 2;
            });

            window.addEventListener('resize', debounce(() => {
                this.resize();
                this.createParticles();
            }, 200));
        }

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.particles.forEach((particle, i) => {
                // Update alpha based on distance from edges
                const edge = [
                    particle.x + particle.translateX - particle.size,
                    this.canvas.width - particle.x - particle.translateX - particle.size,
                    particle.y + particle.translateY - particle.size,
                    this.canvas.height - particle.y - particle.translateY - particle.size
                ];
                const closestEdge = Math.min(...edge);
                const remapClosestEdge = Math.max(0, Math.min(1, closestEdge / 20));

                if (remapClosestEdge > 1) {
                    particle.alpha += 0.02;
                    if (particle.alpha > particle.targetAlpha) {
                        particle.alpha = particle.targetAlpha;
                    }
                } else {
                    particle.alpha = particle.targetAlpha * remapClosestEdge;
                }

                // Update position
                particle.x += particle.dx;
                particle.y += particle.dy;
                
                // Mouse interaction
                const staticity = 50;
                const ease = 50;
                particle.translateX += (this.mouse.x / (staticity / particle.magnetism) - particle.translateX) / ease;
                particle.translateY += (this.mouse.y / (staticity / particle.magnetism) - particle.translateY) / ease;

                // Draw particle
                this.ctx.save();
                this.ctx.translate(particle.translateX, particle.translateY);
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
                this.ctx.fillStyle = `rgba(99, 102, 241, ${particle.alpha})`;
                this.ctx.fill();
                this.ctx.restore();

                // Reset particle if out of bounds
                if (
                    particle.x < -particle.size ||
                    particle.x > this.canvas.width + particle.size ||
                    particle.y < -particle.size ||
                    particle.y > this.canvas.height + particle.size
                ) {
                    this.particles[i] = {
                        x: Math.random() * this.canvas.width,
                        y: Math.random() * this.canvas.height,
                        translateX: 0,
                        translateY: 0,
                        size: Math.random() * 2 + 0.4,
                        alpha: 0,
                        targetAlpha: Math.random() * 0.6 + 0.1,
                        dx: (Math.random() - 0.5) * 0.1,
                        dy: (Math.random() - 0.5) * 0.1,
                        magnetism: 0.1 + Math.random() * 4
                    };
                }
            });

            this.animationId = requestAnimationFrame(() => this.animate());
        }

        destroy() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
        }
    }

    // ============================================
    // FEATURE CARD GLOW EFFECT
    // ============================================

    class FeatureCardGlow {
        constructor() {
            this.init();
        }

        init() {
            const featureCards = document.querySelectorAll('.feature-card');
            
            featureCards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    card.style.setProperty('--mouse-x', `${x}px`);
                    card.style.setProperty('--mouse-y', `${y}px`);
                });

                card.addEventListener('mouseleave', () => {
                    card.style.removeProperty('--mouse-x');
                    card.style.removeProperty('--mouse-y');
                });
            });
        }
    }

    // ============================================
    // MOBILE NAVIGATION
    // ============================================

    class MobileNavigation {
        constructor() {
            this.init();
        }

        init() {
            const toggle = document.getElementById('navToggle');
            const navbar = document.querySelector('.navbar');
            const navLinks = document.querySelector('.navbar-links');
            
            if (!toggle || !navbar || !navLinks) return;

            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Close menu when clicking on a link
            navLinks.addEventListener('click', (e) => {
                if (e.target.classList.contains('navbar-link')) {
                    toggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navbar.contains(e.target)) {
                    toggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        }
    }

    // ============================================
    // SMOOTH SCROLLING
    // ============================================

    class SmoothScrolling {
        constructor() {
            this.init();
        }

        init() {
            // Handle smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = anchor.getAttribute('href');
                    if (href === '#') return;
                    
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
    }

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================

    class NavbarScrollEffect {
        constructor() {
            this.navbar = document.querySelector('.navbar');
            this.lastScrollY = window.scrollY;
            this.init();
        }

        init() {
            if (!this.navbar) return;

            window.addEventListener('scroll', throttle(() => {
                const currentScrollY = window.scrollY;
                
                // Add/remove backdrop blur based on scroll position
                if (currentScrollY > 50) {
                    this.navbar.classList.add('scrolled');
                } else {
                    this.navbar.classList.remove('scrolled');
                }

                this.lastScrollY = currentScrollY;
            }, 16));
        }
    }

    // ============================================
    // INTERSECTION OBSERVER POLYFILL
    // ============================================

    function intersectionObserverPolyfill() {
        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers
            const elements = document.querySelectorAll('[data-animate]');
            elements.forEach(el => {
                el.classList.add('animate');
            });
        }
    }

    // ============================================
    // INITIALIZATION
    // ============================================

    class App {
        constructor() {
            this.init();
        }

        init() {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
            } else {
                this.initializeComponents();
            }
        }

        initializeComponents() {
            // Initialize polyfills
            intersectionObserverPolyfill();

            // Initialize components
            new ScrollAnimations();
            new FeatureCardGlow();
            new MobileNavigation();
            new SmoothScrolling();
            new NavbarScrollEffect();

            // Initialize particle system
            const particlesCanvas = document.getElementById('particles');
            if (particlesCanvas) {
                new ParticleSystem(particlesCanvas);
            }

            // Set current year in footer
            const currentYear = document.getElementById('currentYear');
            if (currentYear) {
                currentYear.textContent = new Date().getFullYear().toString();
            }

            // Add some additional mobile-specific styles
            this.handleMobile();
        }

        handleMobile() {
            // Prevent zoom on iOS when focusing inputs
            if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                const inputs = document.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    input.addEventListener('focus', () => {
                        input.style.fontSize = '16px';
                    });
                    input.addEventListener('blur', () => {
                        input.style.fontSize = '';
                    });
                });
            }

            // Handle touch devices for hover effects
            if ('ontouchstart' in window) {
                document.body.classList.add('touch-device');
            }
        }
    }

    // ============================================
    // START THE APP
    // ============================================

    new App();

})();

// Add CSS for mobile navigation states
const mobileNavCSS = `
    @media (max-width: 768px) {
        .navbar-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .navbar-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .navbar-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .navbar-links.active {
            display: flex !important;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            flex-direction: column;
            background: rgba(9, 9, 11, 0.95);
            backdrop-filter: blur(20px);
            border-top: 1px solid var(--border);
            padding: var(--space-lg);
            gap: var(--space-md);
        }
    }
    
    .navbar.scrolled {
        background: rgba(9, 9, 11, 0.95);
        backdrop-filter: blur(20px);
    }
    
    .touch-device .feature-card:hover::before {
        opacity: 0;
    }
    
    .touch-device .feature-card:active::before {
        opacity: 1;
    }
`;

// Inject the mobile nav CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileNavCSS;
document.head.appendChild(styleSheet);
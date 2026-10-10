/* js/script.js - Advanced Professional Version */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Theme Toggle (with Icon swap) ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        themeIcon.className = theme === 'dark' ? 'ph ph-sun' : 'ph ph-moon';
    }

    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));

    themeToggle.addEventListener('click', () => {
        setTheme(htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = menuToggle.querySelector('i');

    menuToggle.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive);
        menuIcon.className = isActive ? 'ph ph-x' : 'ph ph-list';
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuIcon.className = 'ph ph-list';
        });
    });

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // --- Staggered Scroll Reveal Animations ---
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Add staggered delay based on DOM order for grid items
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach((el, index) => {
            // Apply a slight transition delay based on index for staggered effect in grids
            // Reset delay every 4 items to prevent massive delays at the bottom of the page
            const staggerIndex = index % 4; 
            if (el.classList.contains('glass-card') || el.classList.contains('timeline-item')) {
                 el.style.transitionDelay = `${staggerIndex * 0.1}s`;
            }
            observer.observe(el);
        });
    }

    // --- Mouse Tracking Glow Effect for Cards ---
    if (!prefersReducedMotion) {
        const cards = document.querySelectorAll('.glass-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
            // Reset on mouse leave so glow doesn't get stuck at the edge
            card.addEventListener('mouseleave', () => {
                 card.style.setProperty('--mouse-x', `-500px`);
                 card.style.setProperty('--mouse-y', `-500px`);
            });
        });
    }

    // --- Dynamic Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Contact Form (Mailto Fallback) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            const targetEmail = 'ahmedashrafelwakeel7@gmail.com';
            const mailtoSubject = encodeURIComponent(`Portfolio Inquiry: ${subject}`);
            const mailtoBody = encodeURIComponent(
                `Hello Ahmed,\n\n${message}\n\n---\nSender: ${name}\nEmail: ${email}`
            );

            window.location.href = `mailto:${targetEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
            contactForm.reset();
        });
    }
});

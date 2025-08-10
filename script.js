// Get elements
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section, .hero');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const scrollIndicator = document.getElementById('scrollIndicator');

// ✅ Scroll-based navbar style & scroll indicator
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Navbar style
    if (scrolled > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll progress bar
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrolled / windowHeight) * 100;
    scrollIndicator.style.width = scrollProgress + '%';
});

// ✅ Nav tab highlighting (Up/Down scroll friendly)
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);

        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (link) link.classList.add('active');
        }
    });
}, {
    threshold: 0.6
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ✅ Smooth scroll for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const targetPosition = targetSection.offsetTop - 80;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }

        // Close mobile menu
        navMenu.classList.remove('active');
    });
});

// ✅ Smooth scroll for CTA
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = document.querySelector('#about');
        if (targetSection) {
            const targetPosition = targetSection.offsetTop - 80;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// ✅ Mobile menu toggle
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// ✅ Close mobile nav on outside click
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// ✅ Entrance animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const animatedElements = entry.target.querySelectorAll('.section-content > *, .feature-card, .portfolio-item');
            animatedElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// ✅ Parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero, .about-section, .services-section, .portfolio-section, .contact-section');

    parallaxElements.forEach(el => {
        const rate = scrolled * -0.3;
        el.style.transform = `translateY(${rate}px)`;
    });
});

// ✅ Initial setup
document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }

    // Fade-in animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

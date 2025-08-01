// Get elements
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section, .hero');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const scrollIndicator = document.getElementById('scrollIndicator');

// Scroll event listener for navbar changes and scroll indicator
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Change navbar style on scroll
    if (scrolled > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update scroll progress indicator
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrolled / windowHeight) * 100;
    scrollIndicator.style.width = scrollProgress + '%';

    // Update active navigation link based on scroll position
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrolled >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    // Remove active class from all links and add to current
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for navigation links
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

        // Close mobile menu if open
        navMenu.classList.remove('active');
    });
});

// CTA button smooth scroll
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

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Add entrance animations when sections come into view
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

// Observe all sections for entrance animations
sections.forEach(section => {
    observer.observe(section);
});

// Parallax effect for background images
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero, .about-section, .services-section, .portfolio-section, .contact-section');
    
    parallaxElements.forEach(el => {
        const rate = scrolled * -0.3;
        el.style.transform = `translateY(${rate}px)`;
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active state
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }

    // Add smooth loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add scroll-to-top functionality (optional)
let scrollToTopButton = null;
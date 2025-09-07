/*

TemplateMo 593 personal shape

https://templatemo.com/tm-593-personal-shape

*/

// JavaScript Document

// Mobile menu functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on links
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Enhanced Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Staggered animation for portfolio items
const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.portfolio-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 150);
            });
        }
    });
}, { threshold: 0.1 });

// Observe all animation elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    const portfolioSection = document.querySelector('.portfolio-grid');
    if (portfolioSection) {
        portfolioObserver.observe(portfolioSection);
    }
});

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize EmailJS
(function () {
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    emailjs.init('T04XISJuUYWUt342d');
})();

// Form validation function
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(msg => msg.remove());

    let isValid = true;

    // Validate name
    if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate subject
    if (subject.length < 5) {
        showError('subject', 'Subject must be at least 5 characters long');
        isValid = false;
    }

    // Validate message
    if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }

    return isValid;
}

// Show error message function
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;

    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#ef4444';
}

// Clear error styling
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(msg => msg.remove());
    document.querySelectorAll('input, textarea').forEach(field => {
        field.style.borderColor = '';
    });
}

// Enhanced form submission with EmailJS integration
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous errors
    clearErrors();

    // Validate form
    if (!validateForm()) {
        return;
    }

    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    const form = document.querySelector('.contact-form');

    // Add loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.background = 'linear-gradient(135deg, #94a3b8, #64748b)';

    // Get form data
    const formData = {
        from_name: document.getElementById('name').value.trim(),
        from_email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim(),
        to_email: 'career.metasharp@gmail.com, contact@metasharp.info' // Both email addresses
    };

    // Send email using EmailJS
    emailjs.send('service_8w0asih', 'template_ucyprep', formData)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);

            // Show success state
            submitBtn.textContent = 'Message Sent! ✓';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

            // Show success animation
            submitBtn.style.transform = 'scale(1.05)';
            setTimeout(() => {
                submitBtn.style.transform = 'scale(1)';
            }, 200);

            // Reset form after success
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                form.reset();
                clearErrors();
            }, 3000);
        })
        .catch(function (error) {
            console.log('FAILED...', error);

            // Show error state
            submitBtn.textContent = 'Failed to Send';
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';

            // Reset button after error
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        });
});

// Enhanced parallax effect for hero background
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.3;
    hero.style.transform = `translateY(${rate}px)`;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Add subtle hover effects to skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-2px) scale(1.05)';
    });

    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'translateY(0) scale(1)';
    });
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});



const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.service-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 150);
            });
        }
    });
}, { threshold: 0.1 });

// Observe all animation elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    const serviceSection = document.querySelector('.service-grid');
    if (serviceSection) {
        serviceObserver.observe(serviceSection);
    }
});

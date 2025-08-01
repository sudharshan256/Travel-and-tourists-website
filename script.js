// DOM Elements
const loadingScreen = document.querySelector('.loading-screen');
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const modal = document.getElementById('bookingModal');
const closeModal = document.querySelector('.close');
const contactForm = document.getElementById('contactForm');
const bookingForm = document.getElementById('bookingForm');
const filterBtns = document.querySelectorAll('.filter-btn');
const packageCards = document.querySelectorAll('.package-card');
const destinationCards = document.querySelectorAll('.destination-card');
const mapPoints = document.querySelectorAll('.map-point');
const statNumbers = document.querySelectorAll('.stat-number');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Modal functionality
function openBookingModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Package filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        packageCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'block';
                card.style.animation = 'slideUp 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Destination card interactions
destinationCards.forEach(card => {
    card.addEventListener('click', () => {
        const destination = card.getAttribute('data-destination');
        showDestinationDetails(destination);
    });
    
    // Add hover effects
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Map point interactions
mapPoints.forEach(point => {
    point.addEventListener('click', () => {
        const location = point.getAttribute('data-location');
        showDestinationDetails(location);
    });
    
    // Add pulse animation on hover
    point.addEventListener('mouseenter', () => {
        point.style.transform = 'scale(1.2)';
    });
    
    point.addEventListener('mouseleave', () => {
        point.style.transform = 'scale(1)';
    });
});

// Show destination details (placeholder function)
function showDestinationDetails(destination) {
    const destinations = {
        paris: {
            name: 'Paris, France',
            description: 'The City of Light offers iconic landmarks, world-class cuisine, and romantic atmosphere.',
            highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Champs-Élysées'],
            price: '$899',
            duration: '5 days'
        },
        tokyo: {
            name: 'Tokyo, Japan',
            description: 'Experience the perfect blend of tradition and cutting-edge technology.',
            highlights: ['Shibuya Crossing', 'Senso-ji Temple', 'Tokyo Skytree', 'Tsukiji Market'],
            price: '$1299',
            duration: '7 days'
        },
        santorini: {
            name: 'Santorini, Greece',
            description: 'Stunning sunsets and white-washed buildings overlooking the Aegean Sea.',
            highlights: ['Oia Sunset', 'Fira Town', 'Red Beach', 'Wine Tasting'],
            price: '$1099',
            duration: '6 days'
        },
        bali: {
            name: 'Bali, Indonesia',
            description: 'Tropical paradise with rich culture, beautiful beaches, and spiritual temples.',
            highlights: ['Ubud Temples', 'Rice Terraces', 'Beach Clubs', 'Monkey Forest'],
            price: '$799',
            duration: '8 days'
        }
    };
    
    const dest = destinations[destination];
    if (dest) {
        showModal(`
            <h2>${dest.name}</h2>
            <p>${dest.description}</p>
            <h3>Highlights:</h3>
            <ul>
                ${dest.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
            </ul>
            <div class="destination-pricing">
                <span class="price">${dest.price}</span>
                <span class="duration">${dest.duration}</span>
            </div>
            <button class="btn btn-primary" onclick="openBookingModal()">Book This Trip</button>
        `);
    }
}

// Generic modal function
function showModal(content) {
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
        <span class="close" onclick="closeGenericModal()">&times;</span>
        ${content}
    `;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeGenericModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Form submissions
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show success message
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
});

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(bookingForm);
    const data = Object.fromEntries(formData);
    
    // Show success message
    showNotification('Booking request submitted successfully! We\'ll contact you shortly.', 'success');
    
    // Close modal and reset form
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    bookingForm.reset();
});

// Newsletter form
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    e.target.reset();
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.destination-card, .package-card, .feature, .stat').forEach(el => {
    el.classList.add('scroll-animate');
    observer.observe(el);
});

// Animate statistics when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
        }
    });
}, { threshold: 0.5 });

document.querySelector('.about-stats').forEach(stat => {
    statsObserver.observe(stat);
});

function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current).toLocaleString();
        }, 16);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Floating cards animation enhancement
function enhanceFloatingCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.animationPlayState = 'paused';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.animationPlayState = 'running';
        });
    });
}

// Search functionality (placeholder)
function searchDestinations(query) {
    const destinations = document.querySelectorAll('.destination-card');
    
    destinations.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const searchTerm = query.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.animation = 'slideUp 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Weather API integration (placeholder)
async function getWeatherData(city) {
    // This would integrate with a real weather API
    const weatherData = {
        paris: { temp: 18, condition: 'Sunny', icon: '☀️' },
        tokyo: { temp: 22, condition: 'Cloudy', icon: '☁️' },
        santorini: { temp: 25, condition: 'Clear', icon: '🌤️' },
        bali: { temp: 28, condition: 'Rainy', icon: '🌧️' }
    };
    
    return weatherData[city] || { temp: 20, condition: 'Unknown', icon: '❓' };
}

// Currency converter (placeholder)
function convertCurrency(amount, fromCurrency, toCurrency) {
    const rates = {
        USD: { EUR: 0.85, JPY: 110, GBP: 0.73 },
        EUR: { USD: 1.18, JPY: 129, GBP: 0.86 },
        JPY: { USD: 0.009, EUR: 0.0077, GBP: 0.0066 },
        GBP: { USD: 1.37, EUR: 1.16, JPY: 151 }
    };
    
    if (rates[fromCurrency] && rates[fromCurrency][toCurrency]) {
        return (amount * rates[fromCurrency][toCurrency]).toFixed(2);
    }
    return amount;
}

// Local storage for user preferences
function saveUserPreference(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getUserPreference(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    saveUserPreference('theme', newTheme);
}

// Initialize theme
const savedTheme = getUserPreference('theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
});

// Performance optimization - Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    enhanceFloatingCards();
    lazyLoadImages();
    
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading states to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.innerHTML = this.getAttribute('data-original-text') || this.innerHTML;
                }, 2000);
            }
        });
    });
});

// Add CSS for new animations
const additionalStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content button {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 10px;
    }
    
    .btn.loading {
        pointer-events: none;
        opacity: 0.7;
    }
    
    [data-theme="dark"] {
        --bg-primary: #1a1a1a;
        --text-primary: #ffffff;
        --text-secondary: #cccccc;
    }
    
    [data-theme="dark"] body {
        background-color: var(--bg-primary);
        color: var(--text-primary);
    }
    
    [data-theme="dark"] .navbar {
        background: rgba(26, 26, 26, 0.95);
    }
    
    [data-theme="dark"] .destinations,
    [data-theme="dark"] .packages,
    [data-theme="dark"] .contact {
        background: #2a2a2a;
    }
    
    [data-theme="dark"] .destination-card,
    [data-theme="dark"] .package-card,
    [data-theme="dark"] .contact-form {
        background: #333;
        color: var(--text-primary);
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet); 
// ===== GLOBAL VARIABLES =====
let currentSlide = 0;
let currentTestimonial = 0;
let isScrolling = false;
let heroSlideInterval;
let testimonialInterval;

// ===== DOM ELEMENTS =====
const loadingScreen = document.getElementById('loadingScreen');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const backToTop = document.getElementById('backToTop');
const heroSlides = document.querySelectorAll('.hero-slide');
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.dot');
const bookingModal = document.getElementById('bookingModal');
const notification = document.getElementById('notification');

// ===== LOADING SCREEN =====
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after a delay
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 2000);

    // Initialize all features
    initializeWebsite();
});

function initializeWebsite() {
    initializeNavigation();
    initializeHeroSlider();
    initializeScrollAnimations();
    initializeCounters();
    initializeTestimonials();
    initializePackageFilters();
    initializeForms();
    initializeBackToTop();
    initializeModalFunctionality();
}

// ===== NAVIGATION =====
function initializeNavigation() {
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container') && navMenu?.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

function handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        e.target.classList.add('active');

        // Smooth scroll to section
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Close mobile menu if open
        closeMobileMenu();
    }
}

function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }

    // Update active navigation based on scroll position
    updateActiveNav();
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            navLink?.classList.add('active');
        }
    });
}

// ===== HERO SLIDER =====
function initializeHeroSlider() {
    if (heroSlides.length > 0) {
        // Start auto-slide
        startHeroSlider();

        // Add swipe functionality for mobile
        addSwipeGestures();
    }
}

function startHeroSlider() {
    heroSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function changeSlide(direction) {
    // Clear interval to prevent conflicts
    clearInterval(heroSlideInterval);

    // Remove active class from current slide
    heroSlides[currentSlide]?.classList.remove('active');

    // Calculate next slide
    currentSlide += direction;
    if (currentSlide >= heroSlides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = heroSlides.length - 1;

    // Add active class to new slide
    heroSlides[currentSlide]?.classList.add('active');

    // Restart auto-slide
    setTimeout(startHeroSlider, 1000);
}

function addSwipeGestures() {
    let startX = 0;
    let endX = 0;

    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    heroSection.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    heroSection.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const difference = startX - endX;

        if (Math.abs(difference) > 50) {
            if (difference > 0) {
                changeSlide(1); // Swipe left - next slide
            } else {
                changeSlide(-1); // Swipe right - previous slide
            }
        }
    });
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    // Create intersection observer for scroll animations
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

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .destination-card,
        .package-card,
        .culture-card,
        .experience-card,
        .feature
    `);

    animatedElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// ===== COUNTERS =====
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.7 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
        if (current < target) {
            current += increment;
            element.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// ===== TESTIMONIALS =====
function initializeTestimonials() {
    if (testimonialCards.length > 0) {
        // Start auto-testimonial rotation
        startTestimonialRotation();
    }
}

function startTestimonialRotation() {
    testimonialInterval = setInterval(() => {
        changeTestimonial(1);
    }, 6000);
}

function changeTestimonial(direction) {
    // Clear interval to prevent conflicts
    clearInterval(testimonialInterval);

    // Remove active classes
    testimonialCards[currentTestimonial]?.classList.remove('active');
    testimonialDots[currentTestimonial]?.classList.remove('active');

    // Calculate next testimonial
    currentTestimonial += direction;
    if (currentTestimonial >= testimonialCards.length) currentTestimonial = 0;
    if (currentTestimonial < 0) currentTestimonial = testimonialCards.length - 1;

    // Add active classes
    testimonialCards[currentTestimonial]?.classList.add('active');
    testimonialDots[currentTestimonial]?.classList.add('active');

    // Transform track
    if (testimonialTrack) {
        testimonialTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    }

    // Restart auto-rotation
    setTimeout(startTestimonialRotation, 1000);
}

function currentTestimonial(index) {
    clearInterval(testimonialInterval);
    
    // Remove active classes
    testimonialCards[currentTestimonial]?.classList.remove('active');
    testimonialDots[currentTestimonial]?.classList.remove('active');

    // Set new testimonial
    currentTestimonial = index;
    testimonialCards[currentTestimonial]?.classList.add('active');
    testimonialDots[currentTestimonial]?.classList.add('active');

    // Transform track
    if (testimonialTrack) {
        testimonialTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    }

    // Restart auto-rotation
    setTimeout(startTestimonialRotation, 1000);
}

// ===== PACKAGE FILTERS =====
function initializePackageFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const packageCards = document.querySelectorAll('.package-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter packages
            filterPackages(filter, packageCards);
        });
    });
}

function filterPackages(filter, cards) {
    cards.forEach(card => {
        const categories = card.getAttribute('data-category');
        
        if (filter === 'all' || categories?.includes(filter)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

// ===== FORM HANDLING =====
function initializeForms() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterForm);
    }

    // Booking form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        initializeBookingForm();
    }

    // Search form
    initializeSearchForm();
}

function handleContactForm(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Validate form
    if (validateContactForm(data)) {
        // Simulate form submission
        showNotification('Thank you! Your message has been sent successfully.');
        e.target.reset();
    }
}

function validateContactForm(data) {
    if (!data.firstName || !data.lastName || !data.email || !data.destination || !data.travelers) {
        showNotification('Please fill in all required fields.', 'error');
        return false;
    }

    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }

    return true;
}

function handleNewsletterForm(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (isValidEmail(email)) {
        showNotification('Successfully subscribed to newsletter!');
        e.target.reset();
    } else {
        showNotification('Please enter a valid email address.', 'error');
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== BOOKING MODAL =====
let currentStep = 1;
const totalSteps = 3;

function initializeBookingForm() {
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
}

function openBookingModal() {
    if (bookingModal) {
        bookingModal.classList.add('active');
        bookingModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        resetBookingForm();
    }
}

function closeBookingModal() {
    if (bookingModal) {
        bookingModal.classList.remove('active');
        setTimeout(() => {
            bookingModal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
}

function resetBookingForm() {
    currentStep = 1;
    updateBookingStep();
    document.getElementById('bookingForm')?.reset();
}

function nextStep() {
    if (validateCurrentStep()) {
        currentStep++;
        updateBookingStep();
    }
}

function previousStep() {
    currentStep--;
    updateBookingStep();
}

function updateBookingStep() {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });

    // Show current step
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }

    // Update progress bar
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const progressPercent = (currentStep / totalSteps) * 100;
        progressFill.style.width = `${progressPercent}%`;
    }

    // Update progress steps
    document.querySelectorAll('.progress-steps .step').forEach((step, index) => {
        if (index < currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    // Update navigation buttons
    const prevBtn = document.querySelector('.prev-step');
    const nextBtn = document.querySelector('.next-step');
    const submitBtn = document.querySelector('.submit-step');

    if (prevBtn) prevBtn.style.display = currentStep > 1 ? 'block' : 'none';
    if (nextBtn) nextBtn.style.display = currentStep < totalSteps ? 'block' : 'none';
    if (submitBtn) submitBtn.style.display = currentStep === totalSteps ? 'block' : 'none';
}

function validateCurrentStep() {
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
    if (!currentStepElement) return false;

    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            field.style.borderColor = '#e2e8f0';
        }
    });

    if (!isValid) {
        showNotification('Please fill in all required fields.', 'error');
    }

    return isValid;
}

function handleBookingSubmit(e) {
    e.preventDefault();
    
    if (validateCurrentStep()) {
        // Simulate booking submission
        showNotification('Booking request submitted! We will contact you within 24 hours.');
        closeBookingModal();
    }
}

// ===== SEARCH FUNCTIONALITY =====
function initializeSearchForm() {
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', searchPackages);
    }
}

function searchPackages() {
    const destination = document.getElementById('destinationSelect')?.value;
    const travelType = document.getElementById('travelType')?.value;
    const duration = document.getElementById('duration')?.value;

    if (!destination && !travelType && !duration) {
        showNotification('Please select at least one search criteria.', 'error');
        return;
    }

    // Scroll to packages section
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
        packagesSection.scrollIntoView({ behavior: 'smooth' });
        
        // Highlight relevant packages
        setTimeout(() => {
            highlightSearchResults(destination, travelType, duration);
        }, 500);
    }
}

function highlightSearchResults(destination, travelType, duration) {
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        const cardDestination = card.getAttribute('data-destination');
        const cardCategory = card.getAttribute('data-category');
        
        let matches = false;
        
        if (destination && cardDestination?.includes(destination)) matches = true;
        if (travelType && cardCategory?.includes(travelType)) matches = true;
        
        if (matches) {
            card.style.border = '3px solid #FF6900';
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 20px 40px rgba(255, 105, 0, 0.2)';
        } else {
            card.style.border = '';
            card.style.transform = '';
            card.style.boxShadow = '';
        }
    });

    // Remove highlights after a few seconds
    setTimeout(() => {
        packageCards.forEach(card => {
            card.style.border = '';
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    }, 5000);
}

// ===== DESTINATION INTERACTIONS =====
function exploreDestination(destinationId) {
    // Show destination details or redirect to dedicated page
    showNotification(`Exploring ${destinationId.charAt(0).toUpperCase() + destinationId.slice(1)}...`);
    
    // Simulate loading destination details
    setTimeout(() => {
        openDestinationModal(destinationId);
    }, 1000);
}

function openDestinationModal(destinationId) {
    // Create dynamic modal content for destination
    const destinationData = getDestinationData(destinationId);
    if (destinationData) {
        createDestinationModal(destinationData);
    }
}

function getDestinationData(id) {
    const destinations = {
        rajasthan: {
            name: 'Rajasthan',
            tagline: 'Land of Kings & Palaces',
            description: 'Experience royal heritage in magnificent palaces, explore golden deserts, and witness vibrant festivals.',
            highlights: ['Magnificent Palaces', 'Desert Safari', 'Camel Rides', 'Folk Performances'],
            images: [
                'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop&q=85',
                'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=85'
            ]
        },
        kerala: {
            name: 'Kerala',
            tagline: 'God\'s Own Country',
            description: 'Cruise through serene backwaters, relax on pristine beaches, and experience authentic Ayurvedic treatments.',
            highlights: ['Houseboat Cruises', 'Ayurvedic Treatments', 'Spice Plantations', 'Beach Resorts'],
            images: [
                'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop&q=85',
                'https://images.unsplash.com/photo-1588777564147-b3bc75eb5b08?w=800&h=600&fit=crop&q=85'
            ]
        }
    };
    
    return destinations[id];
}

function createDestinationModal(data) {
    // This would create a detailed modal with image gallery, highlights, and booking options
    showNotification(`${data.name} details would open in a dedicated modal.`);
}

// ===== EXPERIENCE BOOKING =====
function bookExperience(experienceId) {
    showNotification(`Booking ${experienceId.replace('-', ' ')} experience...`);
    
    // Pre-fill booking modal with experience details
    setTimeout(() => {
        openBookingModal();
        // Pre-select experience in booking form if available
    }, 500);
}

// ===== PACKAGE INTERACTIONS =====
function viewPackageDetails(packageId) {
    showNotification(`Loading ${packageId.replace('-', ' ')} package details...`);
    // This would open a detailed package view
}

function bookPackage(packageId) {
    showNotification(`Booking ${packageId.replace('-', ' ')} package...`);
    setTimeout(() => {
        openBookingModal();
    }, 500);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'success') {
    if (!notification) return;

    const content = notification.querySelector('.notification-content');
    if (content) {
        // Update notification style based on type
        if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            content.innerHTML = `<i class="fas fa-exclamation-circle"></i><span>${message}</span>`;
        } else {
            notification.style.background = 'linear-gradient(135deg, #16a34a, #15803d)';
            content.innerHTML = `<i class="fas fa-check-circle"></i><span>${message}</span>`;
        }

        // Show notification
        notification.classList.add('show');

        // Hide after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }
}

// ===== BACK TO TOP =====
function initializeBackToTop() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop?.classList.add('show');
        } else {
            backToTop?.classList.remove('show');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== MODAL FUNCTIONALITY =====
function initializeModalFunctionality() {
    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeBookingModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && bookingModal?.classList.contains('active')) {
            closeBookingModal();
        }
    });
}

// ===== UTILITY FUNCTIONS =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showAllDestinations() {
    showNotification('Loading all 29 states and territories...');
    // This would expand the destinations grid or navigate to a dedicated page
}

function showAllPackages() {
    showNotification('Loading additional travel packages...');
    // This would show more packages or navigate to a dedicated packages page
}

// ===== LAZY LOADING =====
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
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

// Optimize scroll events
const debouncedScrollHandler = debounce(handleNavbarScroll, 10);
window.removeEventListener('scroll', handleNavbarScroll);
window.addEventListener('scroll', debouncedScrollHandler);

// ===== ACCESSIBILITY =====
function initializeAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add ARIA labels dynamically
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            const text = button.textContent.trim() || button.title || 'Button';
            button.setAttribute('aria-label', text);
        }
    });
}

// ===== ANIMATION HELPERS =====
function addScrollAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        .scroll-animate {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .scroll-animate.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .keyboard-navigation *:focus {
            outline: 3px solid #FF6900 !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(style);
}

// ===== INITIALIZE ON LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    addScrollAnimation();
    initializeAccessibility();
    initializeLazyLoading();
});

// ===== WINDOW RESIZE HANDLER =====
window.addEventListener('resize', debounce(() => {
    // Adjust layout if needed
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
}, 250));

// ===== GLOBAL ERROR HANDLER =====
window.addEventListener('error', (e) => {
    console.error('Website error:', e.error);
    // Optionally show user-friendly error message
});

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;
window.nextStep = nextStep;
window.previousStep = previousStep;
window.changeSlide = changeSlide;
window.changeTestimonial = changeTestimonial;
window.currentTestimonial = currentTestimonial;
window.scrollToSection = scrollToSection;
window.scrollToTop = scrollToTop;
window.exploreDestination = exploreDestination;
window.bookExperience = bookExperience;
window.viewPackageDetails = viewPackageDetails;
window.bookPackage = bookPackage;
window.searchPackages = searchPackages;
window.showAllDestinations = showAllDestinations;
window.showAllPackages = showAllPackages; 
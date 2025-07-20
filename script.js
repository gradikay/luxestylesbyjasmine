// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    
    // Initialize business hours
    initializeBusinessHours();
    
    // Initialize back to top button
    initializeBackToTop();

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Gallery filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(button => button.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    const itemCategories = item.getAttribute('data-category');
                    if (itemCategories && itemCategories.includes(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    // Contact form functionality
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Simple form validation
        const requiredFields = ['name', 'email', 'phone', 'service'];
        let isValid = true;

        requiredFields.forEach(field => {
            const input = this.querySelector(`[name="${field}"]`);
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff4757';
                setTimeout(() => {
                    input.style.borderColor = '#444';
                }, 3000);
            }
        });

        if (isValid) {
            // Show success message
            showNotification('Thank you! Your message has been sent. We\'ll get back to you soon!', 'success');
            
            // Reset form
            this.reset();
            
            // In a real application, you would send the data to a server
            console.log('Form submitted:', formObject);
        } else {
            showNotification('Please fill in all required fields.', 'error');
        }
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .gallery-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Hero buttons functionality
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (index === 0) {
                // Book Appointment button
                document.querySelector('#contact').scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                // View Gallery button
                document.querySelector('#gallery').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Service card booking buttons
    const serviceButtons = document.querySelectorAll('.service-card .btn');
    serviceButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceTitle = this.closest('.service-card').querySelector('.service-title').textContent;
            
            // Scroll to contact form
            document.querySelector('#contact').scrollIntoView({
                behavior: 'smooth'
            });
            
            // Pre-fill service field
            setTimeout(() => {
                const serviceSelect = document.querySelector('#service');
                const serviceOptions = {
                    'Protective Styles': 'protective',
                    'Natural Hair Care': 'natural',
                    'Special Occasion': 'occasion',
                    'Color & Highlights': 'color',
                    'Hair Treatments': 'treatment',
                    'Consultations': 'consultation'
                };
                
                if (serviceOptions[serviceTitle]) {
                    serviceSelect.value = serviceOptions[serviceTitle];
                }
            }, 1000);
        });
    });

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            document.querySelector('#services').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Floating animations for hero icons
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
    });

    // Hero image switcher with cool transitions
    function initializeHeroImageSwitcher() {
        const heroImage = document.querySelector('.hero-main-img');
        if (!heroImage) return;
        
        const images = [
            'attached_assets/cute-hair-1_1752954432621_1752969817949.webp',
            'attached_assets/hair-style-4-hero_1752954432624_1752969817952.webp'
        ];
        
        let currentIndex = 0;
        
        function switchImage() {
            // Add cool transition effects
            heroImage.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            heroImage.style.opacity = '0';
            heroImage.style.transform = 'scale(0.9) rotateY(15deg)';
            heroImage.style.filter = 'blur(2px)';
            
            setTimeout(() => {
                // Change image source
                currentIndex = (currentIndex + 1) % images.length;
                heroImage.src = images[currentIndex];
                
                // Add fade in effect with bounce
                setTimeout(() => {
                    heroImage.style.opacity = '1';
                    heroImage.style.transform = 'scale(1.05) rotateY(0deg)';
                    heroImage.style.filter = 'blur(0px)';
                    
                    // Settle back to normal size
                    setTimeout(() => {
                        heroImage.style.transform = 'scale(1) rotateY(0deg)';
                    }, 200);
                }, 50);
            }, 400);
        }
        
        // Switch image every 5 seconds
        setInterval(switchImage, 5000);
    }
    
    // Initialize image switcher
    initializeHeroImageSwitcher();

    // Form label animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Typing effect for hero title (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Add sparkle effect on hover for certain elements
    const sparkleElements = document.querySelectorAll('.service-icon, .social-link');
    sparkleElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Utility function to show notifications
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#ff69b4' : '#ff4757'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Add some interactive particles effect (optional)
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #ff69b4;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        opacity: 0.7;
    `;
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    document.body.appendChild(particle);
    
    // Animate particle
    const animation = particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 0.7 },
        { transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0)`, opacity: 0 }
    ], {
        duration: 2000,
        easing: 'ease-out'
    });
    
    animation.addEventListener('finish', () => {
        document.body.removeChild(particle);
    });
}

// Create particles occasionally
setInterval(createParticle, 3000);

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
});

// Smooth reveal animations for sections
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.15 });

revealSections.forEach(section => {
    revealObserver.observe(section);
});

// Business Hours Functionality
function initializeBusinessHours() {
    updateBusinessStatus();
    // Update status every minute
    setInterval(updateBusinessStatus, 60000);
}

function updateBusinessStatus() {
    const status = getBusinessStatus();
    const statusDot = document.querySelector('.status-dot');
    const statusMessage = document.getElementById('status-message');
    const statusDetail = document.getElementById('status-detail');
    const todayHoursElement = document.getElementById('today-hours');
    const countdownTimer = document.getElementById('countdown-timer');
    
    if (!statusDot || !statusMessage || !statusDetail || !todayHoursElement) return;
    
    // Update status dot
    statusDot.className = `status-dot ${status.status}`;
    
    // Update status text
    statusMessage.textContent = status.message;
    
    if (status.timeUntilChange) {
        if (status.status === 'open' || status.status === 'closing-soon') {
            statusDetail.textContent = `Closes in ${status.timeUntilChange}`;
        } else if (status.status === 'opening-soon') {
            statusDetail.textContent = `Opens in ${status.timeUntilChange}`;
        } else {
            statusDetail.textContent = status.nextOpen ? `Next open: ${status.nextOpen}` : 'Check back soon';
        }
    } else {
        statusDetail.textContent = status.nextOpen ? `Next open: ${status.nextOpen}` : 'Check back soon';
    }
    
    // Update today's hours
    todayHoursElement.textContent = getTodayHours();
    
    // Update countdown timer for closing soon
    if (status.status === 'open' || status.status === 'closing-soon') {
        showCountdownTimer(status.timeUntilChange);
        countdownTimer.style.display = 'block';
    } else {
        countdownTimer.style.display = 'none';
    }
    
    // Update weekly hours with today highlight
    updateWeeklyHours();
}

function showCountdownTimer(timeUntilChange) {
    const hoursLeft = document.getElementById('hours-left');
    const minutesLeft = document.getElementById('minutes-left');
    
    if (!hoursLeft || !minutesLeft || !timeUntilChange) return;
    
    const [hours, minutes] = timeUntilChange.split(':').map(Number);
    hoursLeft.textContent = hours.toString().padStart(2, '0');
    minutesLeft.textContent = minutes.toString().padStart(2, '0');
}

function updateWeeklyHours() {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'lowercase' });
    const hourItems = document.querySelectorAll('.hour-item');
    
    // Convert business hours to display format
    const daysOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    hourItems.forEach((item, index) => {
        const dayName = daysOrder[index];
        const dayHours = businessHours[dayName];
        const hoursSpan = item.querySelector('.hours');
        
        if (dayHours.isOpen) {
            const openTime = convertTo12Hour(dayHours.open);
            const closeTime = convertTo12Hour(dayHours.close);
            hoursSpan.textContent = `${openTime} - ${closeTime}`;
        } else {
            hoursSpan.textContent = 'Closed';
        }
        
        // Highlight today
        if (dayName === currentDay) {
            item.classList.add('today');
        } else {
            item.classList.remove('today');
        }
    });
}

// Back to Top Button Functionality
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add extra sparkle animation on click
        const sparkles = this.querySelectorAll('.sparkle');
        sparkles.forEach(sparkle => {
            sparkle.style.animation = 'sparkleAnimation 0.5s ease-in-out';
        });
        
        setTimeout(() => {
            sparkles.forEach(sparkle => {
                sparkle.style.animation = '';
            });
        }, 500);
    });
}

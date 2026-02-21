// Simple animation for feature cards on scroll
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        // Add delay based on index for staggered animation
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Scroll animation for fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    // Add subtle animation to hero text
    const heroText = document.querySelector('.hero-content');
    heroText.style.opacity = '0';
    heroText.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        heroText.style.transition = 'opacity 1s ease, transform 1s ease';
        heroText.style.opacity = '1';
        heroText.style.transform = 'translateY(0)';
    }, 300);
});

// Additional functionality for the ArtisanAI platform

// Modal functionality for authentication
function initAuthModals() {
    const loginBtn = document.querySelector('.btn-outline');
    const signupBtn = document.querySelector('.btn-primary');
    const authModals = document.getElementById('auth-modals');
    
    if (loginBtn && signupBtn && authModals) {
        loginBtn.addEventListener('click', () => {
            showAuthModal('login');
        });
        
        signupBtn.addEventListener('click', () => {
            showAuthModal('signup');
        });
    }
}

function showAuthModal(type) {
    // Implementation for showing authentication modals
    console.log(`Showing ${type} modal`);
    // This would typically show a modal with login or signup form
}

// Artisan filtering functionality
function initArtisanFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            filterArtisans(filterValue);
        });
    });
}

function filterArtisans(filter) {
    // Implementation for filtering artisans by craft type
    const artisanCards = document.querySelectorAll('.artisan-card');
    
    artisanCards.forEach(card => {
        const craftType = card.getAttribute('data-craft');
        
        if (filter === 'all' || craftType === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Form validation for contact forms
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Form is valid, proceed with submission
                this.submit();
            }
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            highlightError(input);
        } else {
            removeErrorHighlight(input);
        }
    });
    
    return isValid;
}

function highlightError(input) {
    input.style.borderColor = '#ff6b6b';
}

function removeErrorHighlight(input) {
    input.style.borderColor = '';
}

// Testimonial carousel functionality
function initTestimonialCarousel() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    
    if (testimonialCards.length > 1) {
        // Only show the first testimonial initially
        for (let i = 1; i < testimonialCards.length; i++) {
            testimonialCards[i].style.display = 'none';
        }
        
        // Set up automatic rotation
        setInterval(() => {
            testimonialCards[currentIndex].style.display = 'none';
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            testimonialCards[currentIndex].style.display = 'block';
        }, 5000);
    }
}

// Initialize all functionality when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initAuthModals();
    initArtisanFilter();
    initFormValidation();
    initTestimonialCarousel();
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// API integration functions (example)
async function fetchFeaturedArtisans() {
    try {
        const response = await fetch('/api/artisans/featured');
        const artisans = await response.json();
        displayArtisans(artisans);
    } catch (error) {
        console.error('Error fetching featured artisans:', error);
    }
}

function displayArtisans(artisans) {
    const artisanGrid = document.querySelector('.artisan-grid');
    
    if (artisanGrid) {
        // Clear existing content
        artisanGrid.innerHTML = '';
        
        // Add new artisan cards
        artisans.forEach(artisan => {
            const artisanCard = createArtisanCard(artisan);
            artisanGrid.appendChild(artisanCard);
        });
    }
}

function createArtisanCard(artisan) {
    const card = document.createElement('div');
    card.className = 'artisan-card fade-in';
    card.setAttribute('data-craft', artisan.craftType);
    
    card.innerHTML = `
        <div class="artisan-image">
            <i class="${getCraftIcon(artisan.craftType)}"></i>
        </div>
        <div class="artisan-info">
            <h3>${artisan.name}</h3>
            <div class="artisan-craft">${artisan.craft}</div>
            <p>${artisan.description}</p>
        </div>
    `;
    
    return card;
}

function getCraftIcon(craftType) {
    const iconMap = {
        'textiles': 'fas fa-rug',
        'pottery': 'fas fa-vase',
        'jewelry': 'fas fa-gem',
        'woodwork': 'fas fa-tree',
        'metalwork': 'fas fa-hammer',
        'default': 'fas fa-palette'
    };
    
    return iconMap[craftType] || iconMap.default;
}

// Local storage functions for user preferences
function saveUserPreference(key, value) {
    localStorage.setItem(`artisanai_${key}`, JSON.stringify(value));
}

function getUserPreference(key) {
    const item = localStorage.getItem(`artisanai_${key}`);
    return item ? JSON.parse(item) : null;
}

// Theme preference example
function initThemePreference() {
    const savedTheme = getUserPreference('theme');
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // Add theme toggle functionality if needed
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    saveUserPreference('theme', newTheme);
}
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Tech-themed animation for the hero section
    const animationContainer = document.getElementById('animation-container');
    if (animationContainer) {
        const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
        animationContainer.innerHTML = `
            <svg viewBox="0 0 100 100" width="100%" height="100%">
                <!-- Circuit board paths -->
                <path class="circuit-path" d="M100 20 L80 20 L80 40 L60 40" 
                    fill="none" stroke="${accent}" stroke-width="1">
                    <animate attributeName="stroke-dashoffset" from="100" to="0" 
                        dur="1.5s" begin="0s" fill="freeze"/>
                </path>
                <path class="circuit-path" d="M100 50 L70 50 L70 60 L50 60" 
                    fill="none" stroke="${accent}" stroke-width="1">
                    <animate attributeName="stroke-dashoffset" from="100" to="0" 
                        dur="1.5s" begin="0.3s" fill="freeze"/>
                </path>
                <path class="circuit-path" d="M100 80 L90 80 L90 70 L60 70" 
                    fill="none" stroke="${accent}" stroke-width="1">
                    <animate attributeName="stroke-dashoffset" from="100" to="0" 
                        dur="1.5s" begin="0.6s" fill="freeze"/>
                </path>

                <!-- Animated nodes -->
                <circle class="node" cx="60" cy="40" r="2" fill="${accent}">
                    <animate attributeName="r" values="0;2;1;2" dur="1s" 
                        begin="1.5s" fill="freeze"/>
                </circle>
                <circle class="node" cx="50" cy="60" r="2" fill="${accent}">
                    <animate attributeName="r" values="0;2;1;2" dur="1s" 
                        begin="1.8s" fill="freeze"/>
                </circle>
                <circle class="node" cx="60" cy="70" r="2" fill="${accent}">
                    <animate attributeName="r" values="0;2;1;2" dur="1s" 
                        begin="2.1s" fill="freeze"/>
                </circle>

                <!-- Data flow particles -->
                <circle class="particle" r="1" fill="${accent}">
                    <animateMotion path="M100 20 L80 20 L80 40 L60 40" 
                        dur="1.5s" fill="freeze"/>
                </circle>
                <circle class="particle" r="1" fill="${accent}">
                    <animateMotion path="M100 50 L70 50 L70 60 L50 60" 
                        dur="1.5s" begin="0.7s" fill="freeze"/>
                </circle>
                <circle class="particle" r="1" fill="${accent}">
                    <animateMotion path="M100 80 L90 80 L90 70 L60 70" 
                        dur="1.5s" begin="1.4s" fill="freeze"/>
                </circle>
            </svg>
        `;

        // Add CSS for the circuit paths
        const style = document.createElement('style');
        style.textContent = `
            .circuit-path {
                stroke-dasharray: 100;
                stroke-dashoffset: 100;
            }
            .particle {
                opacity: 0.7;
            }
        `;
        document.head.appendChild(style);
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.2,  // 20% of element needs to be visible
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add animation with staggered delay based on index
                entry.target.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s forwards`;
                observer.unobserve(entry.target);  // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe all service cards
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.style.opacity = '0';  // Start invisible
        observer.observe(card);
    });

    // Add to existing observers
    const expertiseObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Reduced delay from 700ms to 500ms
                setTimeout(() => {
                    entry.target.classList.add('in-view');
                }, 500);  // Changed from 0.7s to 0.5s delay
                expertiseObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe expertise image
    const expertiseImage = document.querySelector('.expertise-image');
    if (expertiseImage) {
        expertiseObserver.observe(expertiseImage);
    }

    // Add to existing observers
    const contactImageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                contactImageObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe contact image
    const contactImage = document.querySelector('.contact-image');
    if (contactImage) {
        contactImageObserver.observe(contactImage);
    }

    // Add to existing observers
    const logosObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const logos = entry.target.querySelectorAll('img');
                logos.forEach((logo, index) => {
                    logo.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s forwards`;
                });
                logosObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe logos section
    const logosSection = document.querySelector('.logos-section.transparent');
    if (logosSection) {
        logosObserver.observe(logosSection);
    }
}); 
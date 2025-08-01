// DIME Website JavaScript

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
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
    
    // Play button functionality for GIF demo
    const playButton = document.querySelector('.play-button');
    const demoPoster = document.querySelector('.demo-poster');
    const demoGif = document.querySelector('.demo-gif');
    
    if (playButton && demoPoster && demoGif) {
        playButton.addEventListener('click', function() {
            // Hide poster and play button
            demoPoster.style.display = 'none';
            playButton.style.display = 'none';
            
            // Show and start the GIF
            demoGif.style.display = 'block';
            
            // Force reload the GIF to start from beginning
            const gifSrc = demoGif.src;
            demoGif.src = '';
            demoGif.src = gifSrc + '?t=' + new Date().getTime();
            
            // Add a replay button after GIF loads
            setTimeout(() => {
                const replayBtn = document.createElement('button');
                replayBtn.className = 'replay-button';
                replayBtn.innerHTML = '↻ Replay';
                replayBtn.addEventListener('click', function() {
                    const newSrc = gifSrc + '?t=' + new Date().getTime();
                    demoGif.src = '';
                    demoGif.src = newSrc;
                });
                document.getElementById('demo-container').appendChild(replayBtn);
            }, 1000);
        });
    }
    
    // Add scroll effect to navbar
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
});

// Utility function for formatting numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Platform page specific functionality
if (window.location.pathname.includes('platform.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        // Component section click to expand/collapse
        const componentSections = document.querySelectorAll('.component-section');
        
        componentSections.forEach(section => {
            // Set initial collapsed state
            section.classList.add('collapsed');
            
            const header = section.querySelector('.component-header');
            if (header) {
                header.addEventListener('click', function() {
                    section.classList.toggle('collapsed');
                });
            }
        });
        
        // Lightbox functionality
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const lightboxClose = lightbox.querySelector('.lightbox-close');
        
        // Add click handlers to all images in component sections
        const componentImages = document.querySelectorAll('.component-visual img, .monitoring-thumb');
        
        componentImages.forEach(img => {
            img.addEventListener('click', function() {
                lightbox.classList.add('active');
                lightboxImage.src = this.src;
                lightboxImage.alt = this.alt;
                lightboxCaption.textContent = this.alt;
            });
        });
        
        // Close lightbox when clicking close button
        lightboxClose.addEventListener('click', function() {
            lightbox.classList.remove('active');
        });
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target === lightboxClose) {
                lightbox.classList.remove('active');
            }
        });
        
        // Close lightbox with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
            }
        });
    });
}
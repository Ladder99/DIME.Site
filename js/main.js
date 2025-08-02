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
    
    // Play button functionality for GIF demos
    function initDemoPlayer(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const playButton = container.querySelector('.play-button');
        const demoPoster = container.querySelector('.demo-poster');
        const demoGif = container.querySelector('.demo-gif');
        
        if (playButton && demoPoster && demoGif) {
            // Preload the GIF
            const preloadGif = new Image();
            preloadGif.src = demoGif.src;
            
            playButton.addEventListener('click', function() {
                // Create a new GIF element to ensure fresh start
                const newGif = document.createElement('img');
                newGif.src = demoGif.src + '?t=' + new Date().getTime();
                newGif.className = 'demo-gif';
                newGif.style.display = 'none';
                
                // Wait for the new GIF to load before transitioning
                newGif.onload = function() {
                    // Hide poster and play button with fade effect
                    demoPoster.style.opacity = '0';
                    playButton.style.opacity = '0';
                    
                    setTimeout(() => {
                        demoPoster.style.display = 'none';
                        playButton.style.display = 'none';
                        newGif.style.display = 'block';
                    }, 300);
                };
                
                // Replace the old GIF with the new one
                demoGif.parentNode.replaceChild(newGif, demoGif);
                
                // Add a replay button after GIF loads
                setTimeout(() => {
                    const replayBtn = document.createElement('button');
                    replayBtn.className = 'replay-button';
                    replayBtn.innerHTML = '↻ Replay';
                    replayBtn.addEventListener('click', function() {
                        const reloadGif = document.createElement('img');
                        reloadGif.src = newGif.src.split('?')[0] + '?t=' + new Date().getTime();
                        reloadGif.className = 'demo-gif';
                        reloadGif.style.display = 'block';
                        newGif.parentNode.replaceChild(reloadGif, newGif);
                        replayBtn.remove();
                    });
                    container.appendChild(replayBtn);
                }, 1000);
            });
        }
    }
    
    // Initialize both demo players
    initDemoPlayer('demo-container');
    initDemoPlayer('demo-container-2');
    
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
            const content = section.querySelector('.component-content');
            const header = section.querySelector('.component-header');
            
            // Set initial collapsed state only if not coming from a hash link
            if (!window.location.hash || window.location.hash.substring(1) !== section.id) {
                section.classList.add('collapsed');
                if (content) {
                    content.style.maxHeight = '0';
                }
            }
            
            if (header && content) {
                header.addEventListener('click', function(e) {
                    // Prevent duplicate handling if already being handled by navigation
                    if (e.defaultPrevented) return;
                    
                    if (section.classList.contains('collapsed')) {
                        // Expanding
                        section.classList.remove('collapsed');
                        content.style.maxHeight = content.scrollHeight + 'px';
                        
                        // After animation, remove max-height to allow content to grow
                        setTimeout(() => {
                            if (!section.classList.contains('collapsed')) {
                                content.style.maxHeight = 'none';
                            }
                        }, 300);
                    } else {
                        // Collapsing
                        content.style.maxHeight = content.scrollHeight + 'px';
                        // Force reflow
                        content.offsetHeight;
                        content.style.maxHeight = '0';
                        section.classList.add('collapsed');
                    }
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
        
        // Add click handlers for stat links
        const statLinks = document.querySelectorAll('.stat-link');
        
        statLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const imageSrc = this.getAttribute('data-image');
                const caption = this.getAttribute('data-caption');
                
                lightbox.classList.add('active');
                lightboxImage.src = imageSrc;
                lightboxImage.alt = caption;
                lightboxCaption.textContent = caption;
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
// Platform Navigation and Component Expansion
document.addEventListener('DOMContentLoaded', function() {
    // Function to expand a specific component
    function expandComponent(componentId) {
        const component = document.getElementById(componentId);
        if (component) {
            const content = component.querySelector('.component-content');
            
            // Remove collapsed class and set proper max-height
            component.classList.remove('collapsed');
            if (content) {
                content.style.maxHeight = content.scrollHeight + 'px';
                
                // After animation, remove max-height to allow content to grow
                setTimeout(() => {
                    if (!component.classList.contains('collapsed')) {
                        content.style.maxHeight = 'none';
                    }
                }, 300);
            }
            
            // Scroll to the component with offset for header
            const headerOffset = 100;
            const elementPosition = component.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Add visual feedback
            component.style.backgroundColor = '#f0f8ff';
            setTimeout(() => {
                component.style.backgroundColor = '';
            }, 2000);
        }
    }
    
    // Check if we're navigating from a hash link
    function handleHashNavigation() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            // Map home page component IDs to platform page IDs
            const componentMap = {
                'data-collection': 'data-collection',
                'system-integration': 'system-integration',
                'operational-monitoring': 'operational-monitoring',
                'digital-twin': 'usecase-builder',  // Digital Twin Builder maps to Use Case Builder
                'analytics-workbench': 'analytics-workbench',
                'htm-anomaly': 'htm-engine'  // HTM Anomaly Detection maps to HTM Engine
            };
            
            const targetId = componentMap[hash] || hash;
            
            // Wait for page to load then expand
            setTimeout(() => {
                expandComponent(targetId);
            }, 100);
        }
    }
    
    // Handle initial page load with hash
    handleHashNavigation();
    
    // Handle hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    
    // Remove the duplicate click handlers since main.js already handles them
    // We only need to handle the navigation from home page
});
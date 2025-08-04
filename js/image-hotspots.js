// Image Hotspots Module - Reusable hotspot functionality for images
(function() {
    
    // Hotspot configuration for different images
    const hotspotConfigs = {
        'workbench_1.png': [
            {
                id: 'asset-tree',
                left: '0.5%',
                top: '5%',
                width: '23%',
                height: '27%',
                title: 'Factory Asset Discovery',
                description: 'Real-time factory asset list showing connection status and health across your organization.'
            },
            {
                id: 'anomaly-chart',
                left: '26%',
                top: '10%',
                width: '72%',
                height: '29%',
                title: 'HTM Anomaly Detection',
                description: 'Continuous learning anomaly detection using Hierarchical Temporal Memory. Blue shows anomaly score, red indicates likelihood, with real-time pattern recognition.'
            },
            {
                id: 'asset-details',
                left: '0.5%',
                top: '33%',
                width: '23%',
                height: '63%',
                title: 'Selected Factory Asset Model',
                description: 'A standardized view of the factory asset\'s component hierarchy and individual observations updated in real-time. Each observation can be charted for historical analysis.'
            },
            {
                id: 'device-timeline',
                left: '26%',
                top: '40%',
                width: '72%',
                height: '29%',
                title: 'Event Analysis',
                description: 'Live and historical timeline of event transitions with calculated durations.'
            },
            {
                id: 'frequency-analysis',
                left: '26%',
                top: '70%',
                width: '72%',
                height: '26%',
                title: 'Timeseries Analysis',
                description: 'Live and historical timeseries chart with a variety of statistical investigative tools.'
            }
        ],
        'ai_integration_1.png': [
            {
                id: 'ai-chart-analysis',
                left: '0.5%',
                top: '43%',
                width: '99.2%',
                height: '56%',
                title: 'AI Chart Analysis',
                description: 'Interactive AI-powered analytics interface using OpenAI API integration. Ask questions about patterns, anomalies, or trends in natural language and receive intelligent insights. The AI can analyze multiple chart types simultaneously and provide correlations, predictions, and actionable recommendations based on your industrial data.'
            }
        ],
        'htm_2.png': [
            {
                id: 'keys-selector',
                left: '0.1%',
                top: '5%',
                width: '22%',
                height: '40%',
                title: 'Data Stream Selector',
                description: 'Select from available data streams for HTM analysis. Shows real-time keys from your industrial assets with their current values and data types.'
            },
            {
                id: 'htm-visualization',
                left: '22%',
                top: '2%',
                width: '59%',
                height: '51%',
                title: 'HTM Spatial Pooler Visualization',
                description: 'Real-time visualization of HTM neural columns. Blue cells show active columns learning patterns, red cells indicate anomalous patterns being detected.'
            },
            {
                id: 'current-metrics',
                left: '80.5%',
                top: '2%',
                width: '19%',
                height: '53%',
                title: 'Current Timestep Metrics',
                description: 'Live metrics for the current data point including timestamp, value, anomaly score, likelihood score, and anomaly flag.'
            },
            {
                id: 'performance-metrics',
                left: '0.1%',
                top: '49%',
                width: '22%',
                height: '51%',
                title: 'HTM Performance Metrics',
                description: 'Model performance statistics including prediction accuracy, anomaly detection rates, active cell counts, and computational efficiency metrics.'
            },
            {
                id: 'temporal-memory',
                left: '22%',
                top: '56%',
                width: '77%',
                height: '44%',
                title: 'Temporal Memory Patterns',
                description: 'Grid of temporal memory states showing how HTM learns and recognizes sequences over time. Each cell represents a temporal pattern with color indicating activation strength.'
            }
        ],
        'advanced_monitoring_3.png': [
            {
                id: 'message-timeline-header',
                left: '0%',
                top: '8%',
                width: '100%',
                height: '12%',
                title: 'Message Timeline Controls',
                description: 'Advanced filtering and view controls for real-time message monitoring. Includes regex pattern matching, system message filters, zoom controls, and freeze view options.'
            },
            {
                id: 'trends-graph',
                left: '16.5%',
                top: '23%',
                width: '82%',
                height: '18%',
                title: 'Real-time Trends Visualization',
                description: 'Live trend graph showing message flow patterns, system activity levels, and data throughput over time.'
            },
            {
                id: 'captured-messages',
                left: '1%',
                top: '24%',
                width: '16%',
                height: '77%',
                title: 'Captured Messages List',
                description: 'Filtered list of captured messages with timestamps and source information. Click to expand and view detailed message content.'
            },
            {
                id: 'message-timeline',
                left: '16.5%',
                top: '40%',
                width: '81%',
                height: '58%',
                title: 'Interactive Message Timeline',
                description: 'Wireshark-like view of industrial data packets flowing through DIME. Each row represents a different data stream with color-coded message types. Hover to see details, click to inspect message contents.'
            }
        ],
        'advanced_connector_configuration_2.png': [
            {
                id: 'sources-panel',
                left: '1%',
                top: '16%',
                width: '48%',
                height: '82%',
                title: 'Data Sources Configuration',
                description: 'Configure multiple data sources including HAAS, Modbus, Ethernet/IP, and others. Each source is fully configurable.'
            },
            {
                id: 'sinks-panel',
                left: '50%',
                top: '16%',
                width: '48%',
                height: '82%',
                title: 'Data Sinks Configuration',
                description: 'Configure data destinations including console output, MQTT brokers, HTTP servers, databases, and others. Set up filters, data transformation rules, and other properties for each sink.'
            }
        ],
        'advanced_connector_configuration_1.png': [
            {
                id: 'connector-settings-section',
                left: '30%',
                top: '10%',
                width: '40%',
                height: '77%',
                title: 'Connector Settings',
                description: 'Protocol-specific settings including PLC type selection, IP addresses, connection paths, and logging configuration. Supports multiple industrial protocols with intelligent defaults.'
            }
        ],
        'advanced_connector_configuration_3.png': [
            {
                id: 'items-list',
                left: '11%',
                top: '9%',
                width: '79%',
                height: '74%',
                title: 'Data Items List',
                description: 'List of configured data points for that particular connector type.  Each item can be individually edited or deleted.'
            }
        ],
        'advanced_connector_configuration_4.png': [
            {
                id: 'basic-properties',
                left: '31.5%',
                top: '8.5%',
                width: '37%',
                height: '71%',
                title: 'Data Item Editor',
                description: 'Configure item name and path, status, data address or tag path for the specific protocol.  Add transformation scripts, report by exception, and event triggers among other properties.'
            }
        ],
        'advanced_connector_configuration_with_schema_validation.png': [
            {
                id: 'yaml-editor',
                left: '0.5%',
                top: '7%',
                width: '99%',
                height: '92%',
                title: 'YAML Configuration Editor',
                description: 'Advanced YAML editor with syntax highlighting, line numbers, intelligent auto-completion, and validation. Configure sources, sinks, transformations, and scripting logic for complex data integration scenarios.'
            }
        ]
        // Add more image configurations here as needed
    };
    
    // Add CSS animation if not already present
    function addPulseAnimation() {
        if (!document.querySelector('#pulse-animation-style')) {
            const style = document.createElement('style');
            style.id = 'pulse-animation-style';
            style.textContent = `
                @keyframes pulse {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.2);
                        opacity: 0.7;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Create hotspot elements
    function createHotspot(config) {
        const hotspotEl = document.createElement('div');
        hotspotEl.className = 'dime-hotspot';
        hotspotEl.style.position = 'absolute';
        hotspotEl.style.left = config.left;
        hotspotEl.style.top = config.top;
        hotspotEl.style.width = config.width;
        hotspotEl.style.height = config.height;
        hotspotEl.style.border = '2px solid transparent';
        hotspotEl.style.borderRadius = '4px';
        hotspotEl.style.cursor = 'pointer';
        hotspotEl.style.pointerEvents = 'auto';
        hotspotEl.style.transition = 'all 0.3s ease';
        
        // Add pulsing indicator dot
        const indicator = document.createElement('div');
        indicator.className = 'hotspot-indicator';
        indicator.style.position = 'absolute';
        indicator.style.width = '12px';
        indicator.style.height = '12px';
        indicator.style.borderRadius = '50%';
        indicator.style.backgroundColor = '#DC2626';  // Red for visibility
        indicator.style.border = '2px solid white';
        indicator.style.boxShadow = '0 2px 8px rgba(220, 38, 38, 0.6)';
        indicator.style.top = '10px';
        indicator.style.right = '10px';
        indicator.style.zIndex = '5';
        indicator.style.animation = 'pulse 2s infinite';
        
        // Add info icon
        const infoIcon = document.createElement('div');
        infoIcon.style.position = 'absolute';
        infoIcon.style.width = '8px';
        infoIcon.style.height = '8px';
        infoIcon.style.top = '50%';
        infoIcon.style.left = '50%';
        infoIcon.style.transform = 'translate(-50%, -50%)';
        infoIcon.style.color = 'white';
        infoIcon.style.fontSize = '10px';
        infoIcon.style.fontWeight = 'bold';
        infoIcon.style.lineHeight = '8px';
        infoIcon.style.textAlign = 'center';
        infoIcon.textContent = 'i';
        indicator.appendChild(infoIcon);
        
        hotspotEl.appendChild(indicator);
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'dime-tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.bottom = '100%';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%) translateY(-10px)';
        tooltip.style.backgroundColor = 'rgba(14, 116, 144, 0.95)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '12px 16px';
        tooltip.style.borderRadius = '6px';
        tooltip.style.minWidth = '250px';
        tooltip.style.maxWidth = '350px';
        tooltip.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
        tooltip.style.transition = 'all 0.3s ease';
        tooltip.style.fontSize = '14px';
        tooltip.style.lineHeight = '1.4';
        tooltip.style.zIndex = '100';
        tooltip.style.pointerEvents = 'none';
        
        // Add arrow
        const arrow = document.createElement('div');
        arrow.style.position = 'absolute';
        arrow.style.top = '100%';
        arrow.style.left = '50%';
        arrow.style.transform = 'translateX(-50%)';
        arrow.style.width = '0';
        arrow.style.height = '0';
        arrow.style.borderLeft = '8px solid transparent';
        arrow.style.borderRight = '8px solid transparent';
        arrow.style.borderTop = '8px solid rgba(14, 116, 144, 0.95)';
        tooltip.appendChild(arrow);
        
        const tooltipTitle = document.createElement('div');
        tooltipTitle.style.fontWeight = 'bold';
        tooltipTitle.style.marginBottom = '6px';
        tooltipTitle.style.fontSize = '15px';
        tooltipTitle.textContent = config.title;
        
        const tooltipDesc = document.createElement('div');
        tooltipDesc.style.fontSize = '13px';
        tooltipDesc.style.opacity = '0.9';
        tooltipDesc.textContent = config.description;
        
        tooltip.appendChild(tooltipTitle);
        tooltip.appendChild(tooltipDesc);
        hotspotEl.appendChild(tooltip);
        
        // Add hover effects
        hotspotEl.addEventListener('mouseenter', () => {
            hotspotEl.style.border = '2px solid #0E7490';
            hotspotEl.style.backgroundColor = 'rgba(14, 116, 144, 0.1)';
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
            tooltip.style.transform = 'translateX(-50%) translateY(-15px)';
            indicator.style.display = 'none'; // Hide indicator on hover
        });
        
        hotspotEl.addEventListener('mouseleave', () => {
            hotspotEl.style.border = '2px solid transparent';
            hotspotEl.style.backgroundColor = 'transparent';
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
            tooltip.style.transform = 'translateX(-50%) translateY(-10px)';
            indicator.style.display = 'block'; // Show indicator again
        });
        
        return hotspotEl;
    }
    
    // Position hotspots container to match actual image dimensions
    function positionHotspots(img, wrapper, hotspotsContainer) {
        const wrapperRect = wrapper.getBoundingClientRect();
        
        // Calculate the actual image display area (accounting for object-fit: contain)
        const imgAspectRatio = img.naturalWidth / img.naturalHeight;
        const containerAspectRatio = wrapperRect.width / wrapperRect.height;
        
        let actualWidth, actualHeight, offsetX, offsetY;
        
        if (imgAspectRatio > containerAspectRatio) {
            // Image is wider - fit to width
            actualWidth = wrapperRect.width;
            actualHeight = wrapperRect.width / imgAspectRatio;
            offsetX = 0;
            offsetY = (wrapperRect.height - actualHeight) / 2;
        } else {
            // Image is taller - fit to height
            actualHeight = wrapperRect.height;
            actualWidth = wrapperRect.height * imgAspectRatio;
            offsetX = (wrapperRect.width - actualWidth) / 2;
            offsetY = 0;
        }
        
        // Position and size the hotspots container to match the actual image
        hotspotsContainer.style.width = actualWidth + 'px';
        hotspotsContainer.style.height = actualHeight + 'px';
        hotspotsContainer.style.left = offsetX + 'px';
        hotspotsContainer.style.top = offsetY + 'px';
    }
    
    // Main function to add hotspots to an image
    window.addImageHotspots = function(wrapper, img, configKey) {
        // Get hotspot configuration for this image
        const hotspots = hotspotConfigs[configKey];
        if (!hotspots) {
            console.warn('No hotspot configuration found for:', configKey);
            return null;
        }
        
        // Remove any existing hotspots container first
        const existingContainer = wrapper.querySelector('.dime-hotspots-container');
        if (existingContainer) {
            existingContainer.remove();
        }
        
        // Add pulse animation CSS
        addPulseAnimation();
        
        // Create hotspots container
        const hotspotsContainer = document.createElement('div');
        hotspotsContainer.className = 'dime-hotspots-container';
        hotspotsContainer.style.position = 'absolute';
        hotspotsContainer.style.zIndex = '10';
        hotspotsContainer.style.pointerEvents = 'none';
        hotspotsContainer.style.opacity = '0';
        hotspotsContainer.style.transition = 'opacity 0.5s ease-in-out';
        
        // Create all hotspots
        hotspots.forEach(hotspot => {
            const hotspotEl = createHotspot(hotspot);
            hotspotsContainer.appendChild(hotspotEl);
        });
        
        // Add container to wrapper
        wrapper.appendChild(hotspotsContainer);
        
        // Position hotspots when image loads
        if (img.complete) {
            positionHotspots(img, wrapper, hotspotsContainer);
        } else {
            img.addEventListener('load', () => {
                positionHotspots(img, wrapper, hotspotsContainer);
            });
        }
        
        // Reposition on window resize
        const resizeHandler = () => positionHotspots(img, wrapper, hotspotsContainer);
        window.addEventListener('resize', resizeHandler);
        
        // Show hotspots after a delay
        setTimeout(() => {
            hotspotsContainer.style.opacity = '1';
            positionHotspots(img, wrapper, hotspotsContainer);
        }, 500);
        
        // Return container and cleanup function
        return {
            container: hotspotsContainer,
            cleanup: () => {
                window.removeEventListener('resize', resizeHandler);
                hotspotsContainer.remove();
            }
        };
    };
    
    // Gallery functionality for switching between images
    window.createImageGallery = function(wrapper, images) {
        let currentIndex = 0;
        let currentHotspots = null;
        const img = wrapper.querySelector('img');
        let indicators; // Will be defined later
        let captionElement; // Will be created later
        
        // Update indicator dots
        function updateIndicators() {
            if (!indicators) return;
            const dots = indicators.querySelectorAll('button');
            dots.forEach((dot, index) => {
                dot.style.background = index === currentIndex ? 'white' : 'transparent';
            });
        }
        
        // Update caption
        function updateCaption(caption) {
            if (captionElement && caption) {
                captionElement.textContent = caption;
            }
        }
        
        function showImage(index) {
            // Cleanup previous hotspots
            if (currentHotspots) {
                currentHotspots.cleanup();
                currentHotspots = null;
            }
            
            // Update image
            const imageConfig = images[index];
            img.src = imageConfig.src;
            
            // Update caption
            updateCaption(imageConfig.caption);
            
            // Wait for image to load before adding hotspots
            const addHotspotsForImage = () => {
                if (imageConfig.hotspotsKey) {
                    // Small delay to ensure image dimensions are available
                    setTimeout(() => {
                        currentHotspots = addImageHotspots(wrapper, img, imageConfig.hotspotsKey);
                    }, 100);
                }
            };
            
            if (img.complete && img.src === imageConfig.src) {
                addHotspotsForImage();
            } else {
                img.onload = addHotspotsForImage;
            }
            
            currentIndex = index;
            updateIndicators();
        }
        
        // Add navigation buttons
        const prevBtn = document.createElement('button');
        prevBtn.className = 'gallery-nav gallery-prev';
        prevBtn.innerHTML = '❮';
        prevBtn.style.position = 'absolute';
        prevBtn.style.left = '10px';
        prevBtn.style.top = '50%';
        prevBtn.style.transform = 'translateY(-50%)';
        prevBtn.style.zIndex = '20';
        prevBtn.style.background = 'rgba(0,0,0,0.5)';
        prevBtn.style.color = 'white';
        prevBtn.style.border = 'none';
        prevBtn.style.borderRadius = '4px';
        prevBtn.style.padding = '10px 15px';
        prevBtn.style.cursor = 'pointer';
        prevBtn.style.fontSize = '20px';
        prevBtn.style.transition = 'opacity 0.3s ease';
        // Hide on mobile
        if (window.innerWidth < 768) {
            prevBtn.style.display = 'none';
        }
        prevBtn.onclick = () => {
            const newIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(newIndex);
        };
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'gallery-nav gallery-next';
        nextBtn.innerHTML = '❯';
        nextBtn.style.position = 'absolute';
        nextBtn.style.right = '10px';
        nextBtn.style.top = '50%';
        nextBtn.style.transform = 'translateY(-50%)';
        nextBtn.style.zIndex = '20';
        nextBtn.style.background = 'rgba(0,0,0,0.5)';
        nextBtn.style.color = 'white';
        nextBtn.style.border = 'none';
        nextBtn.style.borderRadius = '4px';
        nextBtn.style.padding = '10px 15px';
        nextBtn.style.cursor = 'pointer';
        nextBtn.style.fontSize = '20px';
        nextBtn.style.transition = 'opacity 0.3s ease';
        // Hide on mobile
        if (window.innerWidth < 768) {
            nextBtn.style.display = 'none';
        }
        nextBtn.onclick = () => {
            const newIndex = (currentIndex + 1) % images.length;
            showImage(newIndex);
        };
        
        wrapper.appendChild(prevBtn);
        wrapper.appendChild(nextBtn);
        
        // Add touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        wrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        wrapper.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            const swipeThreshold = 50; // Minimum distance for swipe
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swiped left - next image
                    nextBtn.click();
                } else {
                    // Swiped right - previous image
                    prevBtn.click();
                }
            }
        }
        
        // Add indicator dots
        indicators = document.createElement('div');
        indicators.className = 'gallery-indicators';
        indicators.style.position = 'absolute';
        indicators.style.bottom = '20px';
        indicators.style.left = '50%';
        indicators.style.transform = 'translateX(-50%)';
        indicators.style.zIndex = '20';
        indicators.style.display = 'flex';
        indicators.style.gap = '10px';
        indicators.style.transition = 'opacity 0.3s ease';
        
        images.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.style.width = '10px';
            dot.style.height = '10px';
            dot.style.borderRadius = '50%';
            dot.style.border = '2px solid white';
            dot.style.background = index === 0 ? 'white' : 'transparent';
            dot.style.cursor = 'pointer';
            dot.style.transition = 'background 0.3s';
            dot.onclick = () => showImage(index);
            indicators.appendChild(dot);
        });
        
        wrapper.appendChild(indicators);
        
        // Add caption element
        captionElement = document.createElement('div');
        captionElement.className = 'gallery-caption';
        captionElement.style.position = 'absolute';
        captionElement.style.bottom = '60px';
        captionElement.style.left = '50%';
        captionElement.style.transform = 'translateX(-50%)';
        captionElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        captionElement.style.color = 'white';
        captionElement.style.padding = '10px 20px';
        captionElement.style.borderRadius = '6px';
        captionElement.style.fontSize = '14px';
        captionElement.style.maxWidth = '80%';
        captionElement.style.textAlign = 'center';
        captionElement.style.zIndex = '15';
        captionElement.style.lineHeight = '1.4';
        captionElement.style.transition = 'opacity 0.3s ease';
        captionElement.style.opacity = '1';
        captionElement.style.pointerEvents = 'none';  // Allow clicks to pass through
        wrapper.appendChild(captionElement);
        
        // Add hover effect to fade out caption, nav buttons, and indicators
        wrapper.addEventListener('mouseenter', () => {
            if (captionElement) {
                captionElement.style.opacity = '0';
            }
            if (prevBtn) {
                prevBtn.style.opacity = '0.2';
            }
            if (nextBtn) {
                nextBtn.style.opacity = '0.2';
            }
            if (indicators) {
                indicators.style.opacity = '0.2';
            }
        });
        
        wrapper.addEventListener('mouseleave', () => {
            if (captionElement) {
                captionElement.style.opacity = '1';
            }
            if (prevBtn) {
                prevBtn.style.opacity = '1';
            }
            if (nextBtn) {
                nextBtn.style.opacity = '1';
            }
            if (indicators) {
                indicators.style.opacity = '1';
            }
        });
        
        // Don't re-initialize first image since it's already loaded
        // Just add hotspots for the already loaded first image
        if (images[0].hotspotsKey) {
            currentHotspots = addImageHotspots(wrapper, img, images[0].hotspotsKey);
        }
        
        // Set initial caption
        updateCaption(images[0].caption);
        updateIndicators();
        
        return {
            showImage,
            next: () => nextBtn.click(),
            prev: () => prevBtn.click()
        };
    };
    
})();
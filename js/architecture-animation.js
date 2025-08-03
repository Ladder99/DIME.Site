// DIME Logo Recreation with Three.js - Animated System Architecture with Drop-in Effect
(function() {
    // Wait for page to fully load
    window.addEventListener('load', function() {
        initDimeLogo();
    });
    
    function initDimeLogo() {
        const canvas = document.getElementById('architecture-canvas');
        if (!canvas) {
            console.error('Canvas element not found');
            return;
        }
        
        // Skip animation on mobile and show swipeable image gallery
        if (window.innerWidth < 768) {
            canvas.style.display = 'none';
            
            // Create wrapper for gallery
            const wrapper = document.createElement('div');
            wrapper.style.position = 'relative';
            wrapper.style.width = '100%';
            wrapper.style.height = 'auto';
            wrapper.style.minHeight = '300px';
            
            // Create image element
            const img = document.createElement('img');
            img.src = 'assets/images/workbench_1.png';
            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.display = 'block';
            
            wrapper.appendChild(img);
            canvas.parentElement.insertBefore(wrapper, canvas);
            
            // Setup simple swipeable gallery (no hotspots on mobile)
            const images = [
                'assets/images/workbench_1.png',
                'assets/images/ai_integration_1.png',
                'assets/images/htm_2.png',
                'assets/images/advanced_monitoring_3.png',
                'assets/images/advanced_connector_configuration_2.png',
                'assets/images/advanced_connector_configuration_1.png',
                'assets/images/advanced_connector_configuration_3.png',
                'assets/images/advanced_connector_configuration_4.png',
                'assets/images/advanced_connector_configuration_with_schema_validation.png'
            ];
            
            let currentIndex = 0;
            
            // Add touch/swipe support
            let touchStartX = 0;
            let touchEndX = 0;
            
            wrapper.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, false);
            
            wrapper.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, false);
            
            // Add indicator dots
            const indicators = document.createElement('div');
            indicators.style.position = 'absolute';
            indicators.style.bottom = '20px';
            indicators.style.left = '50%';
            indicators.style.transform = 'translateX(-50%)';
            indicators.style.zIndex = '10';
            indicators.style.display = 'flex';
            indicators.style.gap = '10px';
            
            images.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.style.width = '10px';
                dot.style.height = '10px';
                dot.style.borderRadius = '50%';
                dot.style.border = '2px solid white';
                dot.style.background = index === 0 ? 'white' : 'transparent';
                dot.style.cursor = 'pointer';
                dot.style.transition = 'background 0.3s';
                dot.style.boxShadow = '0 0 4px rgba(0,0,0,0.5)';
                indicators.appendChild(dot);
            });
            
            wrapper.appendChild(indicators);
            
            // Update indicators when image changes
            function updateIndicators() {
                const dots = indicators.querySelectorAll('div');
                dots.forEach((dot, index) => {
                    dot.style.background = index === currentIndex ? 'white' : 'transparent';
                });
            }
            
            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        // Swiped left - next image
                        currentIndex = (currentIndex + 1) % images.length;
                    } else {
                        // Swiped right - previous image
                        currentIndex = (currentIndex - 1 + images.length) % images.length;
                    }
                    img.src = images[currentIndex];
                    updateIndicators();
                }
            };
            
            return;
        }
        
        // Three.js setup
        const scene = new THREE.Scene();
        scene.background = null; // Transparent background for crossfade
        
        // Camera setup - responsive dimensions
        const container = canvas.parentElement;
        const width = container.clientWidth;
        const height = 570; // Desktop only: 570px
        canvas.style.width = '100%';
        canvas.style.height = height + 'px';
        
        const camera = new THREE.PerspectiveCamera(
            45,
            width / height,
            0.1,
            1000
        );
        
        // Adjust camera distance to show triangle at 2/3 height
        // The triangle group is about 4.5 units tall after compression, so zoom accordingly
        const cameraDistance = 16; // Desktop only
        camera.position.set(0, 0, cameraDistance);
        camera.lookAt(0, 0, 0);
        
        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            antialias: true, // Always enabled for desktop
            alpha: true,
            powerPreference: "high-performance"  // Request high performance GPU
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        
        
        // DIME subsystem colors - website style colors
        const systemColors = {
            dataCollection: 0x0E7490,     // Deep teal from logo - Data Collection Layer
            integration: 0x1E3A8A,         // Navy blue from logo - System Integration
            monitoring: 0x14B8A6,          // Light teal - Operational Monitoring
            analytics: 0x991B1B,           // Burgundy from logo - Analytics Workbench
            ai: 0x475569,                  // Neutral gray - HTM Engine
            core: 0x0E7490,                // Deep teal - Core System
            connections: 0x1E3A8A          // Navy blue - Data Flow
        };
        
        // Define triangle size
        const triSize = 1.15;
        const triHeight = Math.sqrt(3) / 2 * triSize;
        
        // Store all triangles and their metadata
        const triangles = [];
        const connections = [];
        const particles = [];
        const particleSystem = new THREE.Group();
        scene.add(particleSystem);
        
        // Add point light for dramatic effect
        const pointLight = new THREE.PointLight(0xffffff, 0.5, 100);
        pointLight.position.set(0, 0, 10);
        scene.add(pointLight);
        
        // Create outline of big triangle pointing right
        const outlineGeometry = new THREE.BufferGeometry();
        const outlinePoints = [
            -2.598, -2.25, 0,  // bottom left
            -2.598, 2.25, 0,   // top left
            2.165, 0, 0,       // right point
            -2.598, -2.25, 0   // back to start
        ];
        outlineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(outlinePoints, 3));
        
        const outlineMaterial = new THREE.LineBasicMaterial({ 
            color: 0x0E7490,  // Deep teal to match website style
            transparent: true,
            opacity: 0.8,
            linewidth: 2
        });
        const outline = new THREE.Line(outlineGeometry, outlineMaterial);
        scene.add(outline);
        
        // Helper to create one triangle with glow effect
        function createTriangle(x, y, pointsUp, subsystem, index, delay) {
            const geometry = new THREE.BufferGeometry();
            const positions = [];
            
            if (pointsUp) {
                // Upward-pointing triangle
                positions.push(
                    x, y, 0,
                    x + triSize/2, y + triHeight, 0,
                    x + triSize, y, 0
                );
            } else {
                // Downward-pointing triangle
                positions.push(
                    x, y + triHeight, 0,
                    x + triSize/2, y, 0,
                    x + triSize, y + triHeight, 0
                );
            }
            
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            geometry.computeVertexNormals();
            
            // Create glowing material
            const material = new THREE.MeshBasicMaterial({ 
                color: systemColors[subsystem],
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            
            // Create group for triangle
            const group = new THREE.Group();
            group.add(mesh);
            
            // Store metadata
            group.userData = {
                subsystem: subsystem,
                index: index,
                baseX: x,
                baseY: y,
                targetX: x,
                targetY: y,
                targetZ: 0,
                columnShiftX: 0,  // How much to shift X for column closing
                pointsUp: pointsUp,
                delay: delay,
                dropped: false,
                dropTime: 0,
                column: -1  // Which column this triangle belongs to
            };
            
            // Start position to the right (will appear from right after rotation)
            group.position.set(
                (Math.random() - 0.5) * 2,
                15 + Math.random() * 5,  // This becomes X after rotation
                (Math.random() - 0.5) * 2
            );
            
            // Random initial rotation
            group.rotation.z = Math.random() * Math.PI * 2;
            
            return group;
        }
        
        // Define subsystem mapping for each triangle
        const subsystemMap = [
            // Row 0 (9 triangles)
            'dataCollection', 'integration', 'dataCollection', 'monitoring', 'dataCollection',
            'integration', 'monitoring', 'dataCollection', 'integration',
            // Row 1 (7 triangles)
            'monitoring', 'analytics', 'monitoring', 'analytics', 'monitoring', 'analytics', 'monitoring',
            // Row 2 (5 triangles)
            'analytics', 'ai', 'core', 'ai', 'analytics',
            // Row 3 (3 triangles)
            'ai', 'core', 'ai',
            // Row 4 (1 triangle)
            'core'
        ];
        
        let triangleIndex = 0;
        
        // Create main group for rotation
        const mainGroup = new THREE.Group();
        
        // Row 0 (bottom): 9 triangles
        for (let col = 0; col < 9; col++) {
            const x = (col - 4) * triSize / 2;  // Back to original spacing
            const y = -2 * triHeight;
            const pointsUp = (col % 2 === 0);
            const delay = triangleIndex * 0.1 + Math.random() * 0.2;
            const triangle = createTriangle(x, y, pointsUp, subsystemMap[triangleIndex], triangleIndex, delay);
            triangle.userData.column = 0;  // Row 0
            triangle.userData.columnShiftX = 0;  // No shift needed
            triangles.push(triangle);
            mainGroup.add(triangle);
            triangleIndex++;
        }
        
        // Row 1: 7 triangles - FLIPPED 180 AROUND Z
        for (let col = 0; col < 7; col++) {
            const x = (col - 3) * triSize / 2;  // Perfect tessellation spacing
            const y = -triHeight;
            const pointsUp = (col % 2 === 0);
            const delay = triangleIndex * 0.1 + Math.random() * 0.2;
            const triangle = createTriangle(x, y, pointsUp, subsystemMap[triangleIndex], triangleIndex, delay);
            triangle.rotation.z = Math.PI;  // Flip 180 degrees around Z axis
            triangle.userData.column = 1;  // Row 1
            triangle.userData.columnShiftX = 0;
            triangles.push(triangle);
            mainGroup.add(triangle);
            triangleIndex++;
        }
        
        // Row 2: 5 triangles
        for (let col = 0; col < 5; col++) {
            const x = (col - 2) * triSize / 2;  // Back to original spacing
            const y = 0;
            const pointsUp = (col % 2 === 0);
            const delay = triangleIndex * 0.1 + Math.random() * 0.2;
            const triangle = createTriangle(x, y, pointsUp, subsystemMap[triangleIndex], triangleIndex, delay);
            triangle.userData.column = 2;  // Row 2
            triangle.userData.columnShiftX = 0;
            triangles.push(triangle);
            mainGroup.add(triangle);
            triangleIndex++;
        }
        
        // Row 3: 3 triangles - FLIPPED 180 AROUND Z
        for (let col = 0; col < 3; col++) {
            const x = (col - 1) * triSize / 2;  // Perfect tessellation spacing
            const y = triHeight;
            const pointsUp = (col % 2 === 0);
            const delay = triangleIndex * 0.1 + Math.random() * 0.2;
            const triangle = createTriangle(x, y, pointsUp, subsystemMap[triangleIndex], triangleIndex, delay);
            triangle.rotation.z = Math.PI;  // Flip 180 degrees around Z axis
            triangle.userData.column = 3;  // Row 3
            triangle.userData.columnShiftX = 0;
            triangles.push(triangle);
            mainGroup.add(triangle);
            triangleIndex++;
        }
        
        // Row 4: 1 triangle
        const delay = triangleIndex * 0.1 + Math.random() * 0.2;
        const triangle = createTriangle(0, 2 * triHeight, true, subsystemMap[triangleIndex], triangleIndex, delay);
        triangle.userData.column = 4;  // Row 4
        triangle.userData.columnShiftX = 0;  // Center triangle doesn't move
        triangles.push(triangle);
        mainGroup.add(triangle);
        
        // Rotate entire group to point right
        mainGroup.rotation.z = -Math.PI / 2;
        scene.add(mainGroup);
        
        
        // Animation variables
        let time = 0;
        let allDropped = false;
        let columnsClosing = false;
        let columnsClosingStartTime = 0;
        let animationComplete = false;
        let fadeOutStartTime = 0;
        let fadeOutStarted = false;
        let imageReplaced = false;
        
        // Function to create velocity particles (in world space, not rotated)
        function createParticle(x, y, velocity, color, size = 0.02) {
            const particleGeometry = new THREE.SphereGeometry(size, 6, 6);
            const particleMaterial = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: 1.0  // Full opacity
            });
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            
            // Apply rotation to position since particles are in world space
            // Rotate -90 degrees to match mainGroup rotation
            const rotatedX = y;  // y becomes x after -90 degree rotation
            const rotatedY = -x; // x becomes -y after -90 degree rotation
            particle.position.set(rotatedX, rotatedY, 0);
            
            // Also rotate velocity
            const rotatedVelX = velocity.y;
            const rotatedVelY = -velocity.x;
            
            particle.userData = {
                velocity: {
                    x: rotatedVelX,
                    y: rotatedVelY,
                    z: velocity.z
                },
                life: 1.0,
                maxLife: 1.0
            };
            particles.push(particle);
            particleSystem.add(particle);
        }
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            time += 0.016; // ~60fps
            
            // Drop animation for triangles
            triangles.forEach((tri, index) => {
                if (time > tri.userData.delay && !tri.userData.dropped) {
                    tri.userData.dropTime += 0.03;
                    const t = Math.min(tri.userData.dropTime, 1);
                    
                    // Easing function for smooth drop (bounce effect)
                    const ease = 1 - Math.pow(1 - t, 3);
                    
                    // Store previous position for trail
                    const prevX = tri.position.x;
                    const prevY = tri.position.y;
                    const prevZ = tri.position.z;
                    
                    // Interpolate position to exact tessellation position
                    tri.position.x = tri.position.x * (1 - ease * 0.08) + tri.userData.targetX * ease * 0.08;
                    tri.position.y = tri.position.y * (1 - ease * 0.08) + tri.userData.targetY * ease * 0.08;
                    tri.position.z = tri.position.z * (1 - ease * 0.08) + tri.userData.targetZ * ease * 0.08;
                    
                    // Emit trail particles as triangle moves
                    if (t < 0.9 && Math.random() > 0.3) { // More particles for better trail
                        const numTrailParticles = 2 + Math.floor(Math.random() * 2);
                        for (let p = 0; p < numTrailParticles; p++) {
                            // Velocity should follow the triangle's actual movement direction
                            const velocity = {
                                x: (prevX - tri.position.x) * 0.1 + (Math.random() - 0.5) * 0.01,
                                y: (prevY - tri.position.y) * 0.1 + (Math.random() - 0.5) * 0.01,
                                z: (prevZ - tri.position.z) * 0.1 + (Math.random() - 0.5) * 0.01
                            };
                            createParticle(
                                prevX + (Math.random() - 0.5) * 0.1,
                                prevY + (Math.random() - 0.5) * 0.1,
                                velocity,
                                tri.children[0].material.color.getHex()
                            );
                        }
                    }
                    
                    // Reduce rotation as it falls to zero for clean tessellation
                    tri.rotation.z = tri.rotation.z * (1 - ease * 0.08);
                    
                    // Snap to exact position when close
                    if (t >= 0.95) {
                        // Create shockwave effect - scale bounce
                        if (!tri.userData.impactCreated) {
                            tri.userData.impactCreated = true;
                            tri.userData.impactTime = time;
                            tri.userData.baseScale = 1;
                            
                        }
                        
                        tri.position.x = tri.userData.targetX;
                        tri.position.y = tri.userData.targetY;
                        tri.position.z = tri.userData.targetZ;
                        tri.rotation.z = 0;
                    }
                    
                    // Fade in
                    tri.children[0].material.opacity = ease * 0.7;
                    
                    if (t >= 1) {
                        tri.userData.dropped = true;
                        
                        // Check if all triangles have dropped
                        if (triangles.every(t => t.userData.dropped)) {
                            allDropped = true;
                            if (!columnsClosing) {
                                columnsClosing = true;
                                columnsClosingStartTime = time;
                            }
                        }
                    }
                }
                
                // After dropping, add subtle animations
                if (tri.userData.dropped) {
                    let scale = 1;
                    
                    // Impact shockwave animation
                    if (tri.userData.impactTime) {
                        const impactDelta = time - tri.userData.impactTime;
                        if (impactDelta < 0.5) {
                            // Bounce effect: scale up then down
                            const bounce = Math.sin(impactDelta * Math.PI * 4) * Math.exp(-impactDelta * 8);
                            scale = 1 + bounce * 0.3;
                            
                            // Flash effect
                            const flash = Math.exp(-impactDelta * 10);
                            tri.children[0].material.opacity = Math.min(1, 0.7 + flash * 0.3);
                        } else {
                            // Normal gentle pulsing after impact settles
                            scale = 1 + Math.sin(time * 2 + index * 0.3) * 0.02;
                            tri.children[0].material.opacity = 0.6 + Math.sin(time * 3 + index) * 0.2;
                        }
                    }
                    
                    tri.scale.set(scale, scale, scale);
                    
                    // Subtle floating
                    tri.position.z = tri.userData.targetZ + Math.sin(time + index * 0.5) * 0.1;
                }
            });
            
            // Animate columns coming together after all triangles drop
            if (columnsClosing) {
                const closeSpeed = 0.5;
                const closeTime = (time - columnsClosingStartTime) * closeSpeed;
                const closeEase = Math.min(closeTime, 1);
                const smoothEase = 1 - Math.pow(1 - closeEase, 3);
                
                // Move all triangles closer together in both X and Y to close gaps
                triangles.forEach((tri) => {
                    // Calculate previous position for velocity
                    const prevX = tri.position.x;
                    const prevY = tri.position.y;
                    
                    // Compress both X and Y to close all gaps - NUCLEAR COMPRESSION!
                    tri.position.x = tri.userData.targetX * (1 - smoothEase * 0.95);
                    tri.position.y = tri.userData.targetY * (1 - smoothEase * 0.95);
                    
                });
                
                // Mark animation as complete after compression finishes (removed 0.5 second delay)
                if (closeEase >= 1 && !animationComplete) {
                    animationComplete = true;
                    fadeOutStarted = true;
                    fadeOutStartTime = time;
                }
            }
            
            
            
            // Fade out all geometry when animation is complete
            if (fadeOutStarted) {
                const fadeTime = (time - fadeOutStartTime) * 0.67; // Slower fade (1.5 seconds instead of 1)
                const fadeEase = Math.min(fadeTime, 1);
                const opacity = 1 - fadeEase;
                
                // Fade out triangles
                triangles.forEach((tri) => {
                    tri.children[0].material.opacity = tri.children[0].material.opacity * opacity;
                });
                
                // Fade out outline
                outline.material.opacity = outline.material.opacity * opacity;
                
                // Start image replacement at 0.1 seconds (even earlier for longer overlap)
                if (fadeEase >= 0.1 && !imageReplaced) {
                    imageReplaced = true;
                    replaceCanvasWithImage();
                }
            } else {
                // Normal outline animation
                outline.material.opacity = 0.3 + Math.sin(time * 2) * 0.2;
            }
            
            // Update particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const particle = particles[i];
                
                // Update position based on velocity
                particle.position.x += particle.userData.velocity.x;
                particle.position.y += particle.userData.velocity.y;
                particle.position.z += particle.userData.velocity.z;
                
                // Apply gravity and drag (less drag for data packets to travel further)
                particle.userData.velocity.y -= 0.0002; // lighter gravity
                particle.userData.velocity.x *= 0.995; // less drag for data packets
                particle.userData.velocity.y *= 0.995;
                particle.userData.velocity.z *= 0.995;
                
                // Fade out
                particle.userData.life -= 0.015;  // Slower fade for better visibility
                particle.material.opacity = particle.userData.life;
                
                // Remove dead particles
                if (particle.userData.life <= 0) {
                    particleSystem.remove(particle);
                    particles.splice(i, 1);
                    particle.geometry.dispose();
                    particle.material.dispose();
                }
            }
            
            // Render the scene
            renderer.render(scene, camera);
        }
        
        // Function to replace canvas with image gallery
        function replaceCanvasWithImage() {
            // Use the same fixed height as the canvas (570px) to prevent jumping
            const canvasHeight = 570;
            
            // Create wrapper div with same height as canvas
            const wrapper = document.createElement('div');
            wrapper.style.position = 'relative';
            wrapper.style.width = '100%';
            wrapper.style.height = canvasHeight + 'px';
            wrapper.style.backgroundColor = '#ffffff'; // White background on wrapper
            
            // Create image element
            const img = document.createElement('img');
            img.src = 'assets/images/workbench_1.png';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.display = 'block';
            img.style.opacity = '0';
            img.style.transition = 'opacity 1.3s ease-in-out'; // Slower fade-in by 500ms
            img.style.objectFit = 'contain';
            img.style.position = 'absolute';
            img.style.top = '0';
            img.style.left = '0';
            img.style.zIndex = '1'; // Image behind canvas
            
            // Move canvas to absolute positioning too
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.zIndex = '2'; // Canvas on top
            canvas.style.transition = 'opacity 1.3s ease-in-out'; // Match slower fade timing
            
            // Wrap canvas in the wrapper
            canvas.parentElement.insertBefore(wrapper, canvas);
            wrapper.appendChild(img); // Add image first (bottom layer)
            wrapper.appendChild(canvas); // Add canvas second (top layer)
            
            // Setup gallery with multiple images (if gallery module available)
            if (window.createImageGallery) {
                // Define gallery images
                const galleryImages = [
                    {
                        src: 'assets/images/workbench_1.png',
                        hotspotsKey: 'workbench_1.png'
                    },
                    {
                        src: 'assets/images/ai_integration_1.png',
                        hotspotsKey: 'ai_integration_1.png'
                    },
                    {
                        src: 'assets/images/htm_2.png',
                        hotspotsKey: 'htm_2.png'
                    },
                    {
                        src: 'assets/images/advanced_monitoring_3.png',
                        hotspotsKey: 'advanced_monitoring_3.png'
                    },
                    {
                        src: 'assets/images/advanced_connector_configuration_2.png',
                        hotspotsKey: 'advanced_connector_configuration_2.png'
                    },
                    {
                        src: 'assets/images/advanced_connector_configuration_1.png',
                        hotspotsKey: 'advanced_connector_configuration_1.png'
                    },
                    {
                        src: 'assets/images/advanced_connector_configuration_3.png',
                        hotspotsKey: 'advanced_connector_configuration_3.png'
                    },
                    {
                        src: 'assets/images/advanced_connector_configuration_4.png',
                        hotspotsKey: 'advanced_connector_configuration_4.png'
                    },
                    {
                        src: 'assets/images/advanced_connector_configuration_with_schema_validation.png',
                        hotspotsKey: 'advanced_connector_configuration_with_schema_validation.png'
                    }
                ];
                
                // Wait for image to load, then create gallery
                const setupGallery = function() {
                    window.createImageGallery(wrapper, galleryImages);
                };
                
                if (img.complete) {
                    setupGallery();
                } else {
                    img.onload = setupGallery;
                }
            } else if (window.addImageHotspots) {
                // Fallback to single image with hotspots
                const setupHotspots = function() {
                    window.addImageHotspots(wrapper, img, 'workbench_1.png');
                };
                
                if (img.complete) {
                    setupHotspots();
                } else {
                    img.onload = setupHotspots;
                }
            }
            
            // Fade in image immediately (will overlap with canvas fade out)
            setTimeout(() => {
                img.style.opacity = '1';
                // Also fade out the canvas itself for true crossfade
                canvas.style.opacity = '0';
            }, 10);
            
            // After transition completes, keep the fixed height
            setTimeout(() => {
                canvas.style.display = 'none';
                // Keep the wrapper with fixed height to prevent jumping
                // The image stays inside the wrapper at the same height
            }, 900); // Wait for full transition (0.8s + buffer)
        }
        
        // Start animation
        animate();
        
        // Handle window resize
        window.addEventListener('resize', function() {
            // On mobile, just show the image
            if (window.innerWidth < 768) {
                // Reload page to show image instead of animation
                window.location.reload();
                return;
            }
            
            const container = canvas.parentElement;
            const newWidth = container.clientWidth;
            const newHeight = 570;
            
            // Update canvas dimensions
            canvas.style.height = newHeight + 'px';
            
            // Update camera
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            
            // Update renderer
            renderer.setSize(newWidth, newHeight);
        });
        
    }
})();
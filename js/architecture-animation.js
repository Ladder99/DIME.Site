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
        
        // Three.js setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff); // White background
        
        // Camera setup - responsive dimensions
        const container = canvas.parentElement;
        const width = container.clientWidth;
        const height = window.innerWidth < 768 ? 400 : 570; // Larger height: 400px mobile, 570px desktop
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
        const cameraDistance = window.innerWidth < 768 ? 12 : 10; // Closer to make triangle larger
        camera.position.set(0, 0, cameraDistance);
        camera.lookAt(0, 0, 0);
        
        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            antialias: window.innerWidth > 768, // Disable antialiasing on mobile for better performance
            alpha: true,
            powerPreference: "high-performance"  // Request high performance GPU
        });
        // Limit pixel ratio on mobile for better performance
        const pixelRatio = window.innerWidth < 768 ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio;
        renderer.setPixelRatio(pixelRatio);
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
            
            // Start position high above with some scatter
            group.position.set(
                (Math.random() - 0.5) * 8,
                10 + Math.random() * 5,
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
            const delay = triangleIndex * (window.innerWidth < 768 ? 0.05 : 0.1) + Math.random() * (window.innerWidth < 768 ? 0.1 : 0.2);
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
            const delay = triangleIndex * (window.innerWidth < 768 ? 0.05 : 0.1) + Math.random() * (window.innerWidth < 768 ? 0.1 : 0.2);
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
            const delay = triangleIndex * (window.innerWidth < 768 ? 0.05 : 0.1) + Math.random() * (window.innerWidth < 768 ? 0.1 : 0.2);
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
            const delay = triangleIndex * (window.innerWidth < 768 ? 0.05 : 0.1) + Math.random() * (window.innerWidth < 768 ? 0.1 : 0.2);
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
        const isMobile = window.innerWidth < 768;
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            time += 0.016; // ~60fps
            
            // Drop animation for triangles
            triangles.forEach((tri, index) => {
                if (time > tri.userData.delay && !tri.userData.dropped) {
                    tri.userData.dropTime += isMobile ? 0.06 : 0.03;  // Faster on mobile
                    const t = Math.min(tri.userData.dropTime, 1);
                    
                    // Easing function for smooth drop (bounce effect)
                    const ease = 1 - Math.pow(1 - t, 3);
                    
                    // Interpolate position to exact tessellation position
                    tri.position.x = tri.position.x * (1 - ease * 0.08) + tri.userData.targetX * ease * 0.08;
                    tri.position.y = tri.position.y * (1 - ease * 0.08) + tri.userData.targetY * ease * 0.08;
                    tri.position.z = tri.position.z * (1 - ease * 0.08) + tri.userData.targetZ * ease * 0.08;
                    
                    // Reduce rotation as it falls to zero for clean tessellation
                    tri.rotation.z = tri.rotation.z * (1 - ease * 0.08);
                    
                    // Snap to exact position when close
                    if (t >= 0.95) {
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
                    // Gentle pulsing
                    const scale = 1 + Math.sin(time * 2 + index * 0.3) * 0.02;
                    tri.scale.set(scale, scale, scale);
                    
                    // Subtle floating
                    tri.position.z = tri.userData.targetZ + Math.sin(time + index * 0.5) * 0.1;
                    
                    // Opacity variation - shimmer effect
                    tri.children[0].material.opacity = 0.6 + Math.sin(time * 3 + index) * 0.2;
                }
            });
            
            // Animate columns coming together after all triangles drop
            if (columnsClosing) {
                const closeSpeed = isMobile ? 1.0 : 0.5;  // Faster on mobile
                const closeTime = (time - columnsClosingStartTime) * closeSpeed;
                const closeEase = Math.min(closeTime, 1);
                const smoothEase = 1 - Math.pow(1 - closeEase, 3);
                
                // Move all triangles closer together in both X and Y to close gaps
                triangles.forEach((tri) => {
                    // Compress both X and Y to close all gaps - NUCLEAR COMPRESSION!
                    tri.position.x = tri.userData.targetX * (1 - smoothEase * 0.95);
                    tri.position.y = tri.userData.targetY * (1 - smoothEase * 0.95);
                });
                
                // Mark animation as complete after compression finishes + 0.5 seconds
                if (closeEase >= 1 && !animationComplete) {
                    setTimeout(() => {
                        animationComplete = true;
                        fadeOutStarted = true;
                        fadeOutStartTime = time;
                    }, 500);
                }
            }
            
            
            
            // Fade out all geometry when animation is complete
            if (fadeOutStarted) {
                const fadeTime = (time - fadeOutStartTime) * 1.0; // 1 second fade
                const fadeEase = Math.min(fadeTime, 1);
                const opacity = 1 - fadeEase;
                
                // Fade out triangles
                triangles.forEach((tri) => {
                    tri.children[0].material.opacity = tri.children[0].material.opacity * opacity;
                });
                
                // Fade out outline
                outline.material.opacity = outline.material.opacity * opacity;
                
                // Start image replacement at 0.5 seconds (halfway through fade)
                if (fadeEase >= 0.5 && !imageReplaced) {
                    imageReplaced = true;
                    replaceCanvasWithImage();
                }
            } else {
                // Normal outline animation
                outline.material.opacity = 0.3 + Math.sin(time * 2) * 0.2;
            }
            
            // Render the scene
            renderer.render(scene, camera);
        }
        
        // Function to replace canvas with image
        function replaceCanvasWithImage() {
            // Create a temporary image to calculate natural dimensions
            const tempImg = new Image();
            tempImg.src = 'assets/images/workbench_1.png';
            
            tempImg.onload = function() {
                // Calculate the height based on image aspect ratio
                const aspectRatio = tempImg.height / tempImg.width;
                const containerWidth = canvas.parentElement.clientWidth;
                const naturalHeight = containerWidth * aspectRatio;
                
                // Create wrapper div with correct height
                const wrapper = document.createElement('div');
                wrapper.style.position = 'relative';
                wrapper.style.width = '100%';
                wrapper.style.height = naturalHeight + 'px';
                
                // Create image element
                const img = document.createElement('img');
                img.src = 'assets/images/workbench_1.png';
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.display = 'block';
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease-in-out';
                img.style.objectFit = 'contain';
                img.style.backgroundColor = '#ffffff';
                img.style.position = 'absolute';
                img.style.top = '0';
                img.style.left = '0';
                
                // Move canvas to absolute positioning too
                canvas.style.position = 'absolute';
                canvas.style.top = '0';
                canvas.style.left = '0';
                canvas.style.zIndex = '2';
                
                // Wrap canvas in the wrapper
                canvas.parentElement.insertBefore(wrapper, canvas);
                wrapper.appendChild(canvas);
                wrapper.appendChild(img);
                
                // Fade in image immediately (will overlap with canvas fade out)
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 50);
                
                // After transition completes, switch to natural image sizing
                setTimeout(() => {
                    canvas.style.display = 'none';
                    // Remove wrapper and let image be naturally sized
                    img.style.position = 'static';
                    img.style.height = 'auto';
                    wrapper.style.height = 'auto';
                    // Replace wrapper with just the image
                    wrapper.parentElement.insertBefore(img, wrapper);
                    wrapper.remove();
                }, 500);
            };
        }
        
        // Start animation
        animate();
        
        // Handle window resize
        window.addEventListener('resize', function() {
            const container = canvas.parentElement;
            const newWidth = container.clientWidth;
            const newHeight = window.innerWidth < 768 ? 400 : 570;
            
            // Update canvas dimensions
            canvas.style.height = newHeight + 'px';
            
            // Update camera
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            
            // Adjust camera distance for mobile
            const cameraDistance = window.innerWidth < 768 ? 12 : 10;
            camera.position.z = cameraDistance;
            
            // Update renderer
            renderer.setSize(newWidth, newHeight);
        });
        
    }
})();
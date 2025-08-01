// Solutions Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // Solution Builder functionality
    const steps = document.querySelectorAll('.step');
    const stepContents = document.querySelectorAll('.builder-step-content');
    const prevBtn = document.getElementById('builder-prev');
    const nextBtn = document.getElementById('builder-next');
    const builderSummary = document.querySelector('.builder-summary');
    let currentStep = 1;
    
    function updateStepDisplay() {
        // Update step indicators
        steps.forEach((step, index) => {
            if (index < currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Update step content
        stepContents.forEach(content => content.classList.remove('active'));
        document.getElementById(`step-${currentStep}`).classList.add('active');
        
        // Update navigation buttons
        prevBtn.disabled = currentStep === 1;
        
        if (currentStep === 4) {
            nextBtn.textContent = 'Generate Solution';
        } else {
            nextBtn.textContent = 'Next →';
        }
    }
    
    function calculateSolution() {
        // Get selected options
        const industry = document.getElementById('industry-select').value;
        const equipment = document.querySelectorAll('.equipment-option input:checked').length;
        const usecases = document.querySelectorAll('.usecase-option input:checked').length;
        const compliance = document.querySelectorAll('.compliance-option input:checked').length;
        
        // Calculate metrics based on selections
        const connectorCount = equipment * 2 + 6; // Base connectors plus equipment-specific
        const dashboardCount = usecases * 3 + 2; // Templates per use case plus base
        const reportCount = (usecases + compliance) * 5 + 10; // Reports based on requirements
        const deploymentTime = 2 + equipment + (usecases * 0.5); // Base time plus complexity
        
        // Calculate pricing
        let monthlyPrice = 2500; // Base Essential price
        if (equipment > 3 || usecases > 2) {
            monthlyPrice = 7500; // Professional tier
        }
        if (equipment > 5 || usecases > 4 || compliance > 2) {
            monthlyPrice = 'Custom'; // Enterprise tier
        }
        
        // Calculate ROI (simplified)
        const roi = 300 + (usecases * 50) + (equipment * 25);
        
        // Update summary
        document.getElementById('connector-count').textContent = connectorCount;
        document.getElementById('dashboard-count').textContent = dashboardCount;
        document.getElementById('report-count').textContent = reportCount;
        document.getElementById('deployment-time').textContent = deploymentTime.toFixed(1) + ' hours';
        document.getElementById('monthly-cost').textContent = 
            typeof monthlyPrice === 'number' ? `$${monthlyPrice.toLocaleString()}` : monthlyPrice;
        document.getElementById('expected-roi').textContent = roi + '%';
        
        // Show summary
        builderSummary.style.display = 'block';
    }
    
    nextBtn.addEventListener('click', function() {
        if (currentStep < 4) {
            currentStep++;
            updateStepDisplay();
        } else {
            // Generate solution on final step
            calculateSolution();
            nextBtn.style.display = 'none';
            prevBtn.style.display = 'none';
        }
    });
    
    prevBtn.addEventListener('click', function() {
        if (currentStep > 1) {
            currentStep--;
            updateStepDisplay();
            builderSummary.style.display = 'none';
            nextBtn.style.display = 'inline-block';
        }
    });
    
    // Industry ROI Calculator
    const autoVolume = document.getElementById('auto-volume');
    const autoOEE = document.getElementById('auto-oee');
    const autoValue = document.getElementById('auto-value');
    const autoDowntime = document.getElementById('auto-downtime');
    
    function calculateAutomotiveROI() {
        if (!autoVolume) return; // Exit if elements don't exist
        
        const volume = parseInt(autoVolume.value) || 250000;
        const currentOEE = parseInt(autoOEE.value) || 65;
        const unitValue = parseInt(autoValue.value) || 35000;
        const downtime = parseInt(autoDowntime.value) || 450;
        
        // Calculate improvements
        const oeeImprovement = 15; // 15% improvement typical
        const newOEE = currentOEE + oeeImprovement;
        const additionalCapacity = (volume * (newOEE / currentOEE)) - volume;
        const downtimeReduction = downtime * 0.47; // 47% reduction
        
        // Calculate financial impact
        const additionalRevenue = additionalCapacity * unitValue;
        const downtimeSavings = downtimeReduction * 50000; // $50K/hour downtime cost
        const totalValue = additionalRevenue + downtimeSavings;
        
        // Calculate ROI
        const annualCost = 90000; // $7,500/month Professional
        const roi = ((totalValue - annualCost) / annualCost) * 100;
        const paybackMonths = (annualCost / totalValue) * 12;
        
        // Update display
        const results = document.querySelector('.roi-results');
        if (results) {
            results.querySelector('.result-value').textContent = Math.round(additionalCapacity).toLocaleString();
            results.querySelectorAll('.result-value')[1].textContent = Math.round(downtimeReduction) + ' hours';
            results.querySelectorAll('.result-value')[2].textContent = '$' + (totalValue / 1000000).toFixed(1) + 'M';
            results.querySelectorAll('.result-value')[3].textContent = Math.round(roi) + '%';
            results.querySelectorAll('.result-value')[4].textContent = paybackMonths.toFixed(1) + ' months';
        }
    }
    
    // Add event listeners for ROI calculator
    if (autoVolume) {
        [autoVolume, autoOEE, autoValue, autoDowntime].forEach(input => {
            input.addEventListener('input', calculateAutomotiveROI);
        });
        
        // Calculate initial values
        calculateAutomotiveROI();
    }
    
    // Smooth scroll to sections
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
    
    // Industry card hover effects
    const industryCards = document.querySelectorAll('.industry-card');
    industryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
    });
});
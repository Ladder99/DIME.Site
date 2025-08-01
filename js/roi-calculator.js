// ROI Calculator for DIME Features Page

document.addEventListener('DOMContentLoaded', function() {
    // Get input elements
    const revenueInput = document.getElementById('revenue');
    const downtimeInput = document.getElementById('downtime');
    const defectRateInput = document.getElementById('defect-rate');
    const energySpendInput = document.getElementById('energy-spend');
    
    // Get output elements
    const downtimeSavings = document.getElementById('downtime-savings');
    const qualitySavings = document.getElementById('quality-savings');
    const energySavings = document.getElementById('energy-savings');
    const totalSavings = document.getElementById('total-savings');
    const roiPercent = document.getElementById('roi-percent');
    const payback = document.getElementById('payback');
    
    // DIME impact percentages (based on real customer data)
    const DOWNTIME_REDUCTION = 0.47;  // 47% reduction
    const DEFECT_REDUCTION = 0.89;    // 89% reduction
    const ENERGY_REDUCTION = 0.28;    // 28% reduction
    
    // Assumed costs
    const HOURLY_DOWNTIME_COST_RATE = 0.001; // 0.1% of annual revenue per hour
    const DEFECT_COST_RATE = 0.03;          // Defects cost 3% of revenue
    const ANNUAL_DIME_COST = 90000;         // $7,500/month for Professional
    
    function formatCurrency(amount) {
        if (amount >= 1000000) {
            return '$' + (amount / 1000000).toFixed(2) + 'M';
        } else if (amount >= 1000) {
            return '$' + (amount / 1000).toFixed(0) + 'K';
        }
        return '$' + amount.toFixed(0);
    }
    
    function calculateROI() {
        // Get input values
        const revenue = parseFloat(revenueInput.value) || 100000000;
        const downtimeHours = parseFloat(downtimeInput.value) || 500;
        const defectRate = parseFloat(defectRateInput.value) / 100 || 0.03;
        const energySpend = parseFloat(energySpendInput.value) || 5000000;
        
        // Calculate downtime savings
        const downtimeCostPerHour = revenue * HOURLY_DOWNTIME_COST_RATE;
        const currentDowntimeCost = downtimeHours * downtimeCostPerHour;
        const downtimeSavingsAmount = currentDowntimeCost * DOWNTIME_REDUCTION;
        
        // Calculate quality savings
        const currentDefectCost = revenue * defectRate * DEFECT_COST_RATE;
        const qualitySavingsAmount = currentDefectCost * DEFECT_REDUCTION;
        
        // Calculate energy savings
        const energySavingsAmount = energySpend * ENERGY_REDUCTION;
        
        // Calculate totals
        const totalSavingsAmount = downtimeSavingsAmount + qualitySavingsAmount + energySavingsAmount;
        const roi = ((totalSavingsAmount - ANNUAL_DIME_COST) / ANNUAL_DIME_COST) * 100;
        const paybackMonths = (ANNUAL_DIME_COST / totalSavingsAmount) * 12;
        
        // Update UI
        downtimeSavings.textContent = '→ Save ' + formatCurrency(downtimeSavingsAmount) + '/year';
        qualitySavings.textContent = '→ Save ' + formatCurrency(qualitySavingsAmount) + '/year';
        energySavings.textContent = '→ Save ' + formatCurrency(energySavingsAmount) + '/year';
        totalSavings.textContent = formatCurrency(totalSavingsAmount);
        roiPercent.textContent = Math.round(roi) + '%';
        payback.textContent = paybackMonths.toFixed(1) + ' months';
        
        // Highlight exceptional ROI
        if (roi > 300) {
            roiPercent.style.color = 'var(--success)';
        }
    }
    
    // Add event listeners
    [revenueInput, downtimeInput, defectRateInput, energySpendInput].forEach(input => {
        input.addEventListener('input', calculateROI);
        input.addEventListener('change', calculateROI);
    });
    
    // Calculate initial values
    calculateROI();
    
    // Smooth scroll to calculator when clicking Calculate ROI button
    const roiButtons = document.querySelectorAll('a[href="#roi-calculator"]');
    roiButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const calculator = document.getElementById('roi-calculator');
            calculator.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Highlight the calculator briefly
            calculator.style.backgroundColor = 'var(--neutral-100)';
            setTimeout(() => {
                calculator.style.backgroundColor = '';
            }, 2000);
        });
    });
});
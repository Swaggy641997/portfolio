// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeGPAChart();
    initializeInteractiveElements();
    initializeAnimations();
});

// GPA Chart using Canvas
function initializeGPAChart() {
    const canvas = document.getElementById('gpaChart');
    const ctx = canvas.getContext('2d');
    
    // Chart data
    const data = [
        { day: 'Mon 22', grade: 'C', value: 75 },
        { day: 'Tue 23', grade: 'B', value: 85 },
        { day: 'Wed 24', grade: 'B', value: 82 },
        { day: 'Thu 25', grade: 'A', value: 92 },
        { day: 'Fri 26', grade: 'B', value: 88 }
    ];
    
    // Chart configuration
    const chartConfig = {
        width: canvas.width,
        height: canvas.height,
        padding: 40,
        barWidth: 60,
        maxValue: 100
    };
    
    // Clear canvas
    ctx.clearRect(0, 0, chartConfig.width, chartConfig.height);
    
    // Calculate chart dimensions
    const chartWidth = chartConfig.width - (chartConfig.padding * 2);
    const chartHeight = chartConfig.height - (chartConfig.padding * 2);
    const barSpacing = (chartWidth - (data.length * chartConfig.barWidth)) / (data.length - 1);
    
    // Draw grid lines
    ctx.strokeStyle = '#f1f3f4';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
        const y = chartConfig.padding + (i * chartHeight / 5);
        ctx.beginPath();
        ctx.moveTo(chartConfig.padding, y);
        ctx.lineTo(chartConfig.width - chartConfig.padding, y);
        ctx.stroke();
    }
    
    // Draw grade labels on Y-axis
    ctx.fillStyle = '#6c757d';
    ctx.font = '12px Inter';
    ctx.textAlign = 'right';
    const grades = ['F', 'D', 'C', 'B', 'A'];
    grades.forEach((grade, index) => {
        const y = chartConfig.padding + chartHeight - (index * chartHeight / 4) + 4;
        ctx.fillText(grade, chartConfig.padding - 10, y);
    });
    
    // Draw bars with animation
    data.forEach((item, index) => {
        const x = chartConfig.padding + (index * (chartConfig.barWidth + barSpacing));
        const barHeight = (item.value / chartConfig.maxValue) * chartHeight;
        const y = chartConfig.padding + chartHeight - barHeight;
        
        // Bar gradient
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        if (item.value >= 90) {
            gradient.addColorStop(0, '#2c3e50');
            gradient.addColorStop(1, '#34495e');
        } else {
            gradient.addColorStop(0, '#6c757d');
            gradient.addColorStop(1, '#495057');
        }
        
        // Draw bar
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, chartConfig.barWidth, barHeight);
        
        // Draw day labels
        ctx.fillStyle = '#6c757d';
        ctx.font = '10px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(item.day, x + chartConfig.barWidth / 2, chartConfig.height - 10);
    });
}

// Interactive Elements
function initializeInteractiveElements() {
    // Navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
    
    // Time filter buttons
    const timeFilters = document.querySelectorAll('.time-filter');
    timeFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            timeFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            // Regenerate chart with new data (simulated)
            setTimeout(() => {
                initializeGPAChart();
            }, 100);
        });
    });
    
    // Test day calendar
    const testDays = document.querySelectorAll('.test-day');
    testDays.forEach(day => {
        day.addEventListener('click', function() {
            // Toggle active state
            this.classList.toggle('active');
            
            // Add ripple effect
            addRippleEffect(this);
        });
    });
    
    // Contact items hover effect
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Schedule items
    const scheduleItems = document.querySelectorAll('.schedule-item');
    scheduleItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add selection effect
            scheduleItems.forEach(si => si.classList.remove('selected'));
            this.classList.add('selected');
            
            // Add temporary highlight
            this.style.backgroundColor = '#e3f2fd';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 2000);
        });
    });
    
    // Show all buttons
    const showAllBtns = document.querySelectorAll('.show-all-btn');
    showAllBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Simulate loading more content
            this.textContent = 'Loading...';
            
            setTimeout(() => {
                this.textContent = 'Show all';
                showNotification('More content loaded!');
            }, 1000);
        });
    });
    
    // Add to calendar button
    const calendarBtn = document.querySelector('.add-calendar-btn');
    if (calendarBtn) {
        calendarBtn.addEventListener('click', function() {
            this.textContent = '✓ Added to calendar';
            this.style.backgroundColor = '#d4edda';
            this.style.borderColor = '#c3e6cb';
            this.style.color = '#155724';
            
            setTimeout(() => {
                this.textContent = '📅 Add to calendar';
                this.style.backgroundColor = '';
                this.style.borderColor = '';
                this.style.color = '';
            }, 3000);
        });
    }
    
    // Toggle switch
    const toggleInput = document.querySelector('.toggle input');
    if (toggleInput) {
        toggleInput.addEventListener('change', function() {
            const testDays = document.querySelectorAll('.test-day.active');
            
            if (this.checked) {
                testDays.forEach(day => {
                    day.style.opacity = '1';
                    day.style.transform = 'scale(1)';
                });
            } else {
                testDays.forEach(day => {
                    day.style.opacity = '0.5';
                    day.style.transform = 'scale(0.95)';
                });
            }
        });
    }
}

// Animations
function initializeAnimations() {
    // Fade in animation for cards
    const cards = document.querySelectorAll('.grade-section, .upcoming-tests, .contacts-section, .schedule-section, .events-section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Number counter animation for grade
    animateNumber('.grade-percentage', 87, 2000);
    
    // Typing effect for grade title
    typewriterEffect('.grade-title', 50);
}

// Utility Functions
function addRippleEffect(element) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.marginLeft = '-10px';
    ripple.style.marginTop = '-10px';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function animateNumber(selector, target, duration) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    const start = 0;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (target - start) * easeOutQuart(progress));
        element.textContent = current + '%';
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

function typewriterEffect(selector, speed) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    const text = element.innerHTML;
    element.innerHTML = '';
    element.style.borderRight = '2px solid #007bff';
    
    let i = 0;
    function typeChar() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        } else {
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    setTimeout(typeChar, 500);
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #007bff;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .schedule-item.selected {
        background: rgba(0, 123, 255, 0.05) !important;
        border-left: 3px solid #007bff;
        padding-left: 12px;
    }
    
    .nav-item {
        position: relative;
        overflow: hidden;
    }
    
    .test-day {
        position: relative;
        overflow: hidden;
    }
    
    .contact-item {
        transition: all 0.3s ease;
        padding: 10px;
        border-radius: 8px;
    }
    
    .contact-item:hover {
        background: rgba(0, 123, 255, 0.02);
    }
    
    .grade-section {
        position: relative;
        overflow: hidden;
    }
    
    .grade-section::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, transparent, rgba(0, 123, 255, 0.03), transparent);
        transform: rotate(45deg);
        transition: transform 0.6s ease;
        pointer-events: none;
    }
    
    .grade-section:hover::before {
        transform: rotate(45deg) translateX(100%);
    }
`;
document.head.appendChild(style);

// Real-time clock update
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit'
    });
    
    const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Update any time displays if they exist
    const timeElements = document.querySelectorAll('.current-time');
    timeElements.forEach(element => {
        element.textContent = timeString;
    });
}

// Update clock every minute
setInterval(updateClock, 60000);
updateClock(); // Initial call

// Smooth scrolling for navigation (if needed)
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

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #007bff !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(keyboardStyle);
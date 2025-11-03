/**
 * MINIFARMACIA ANALYTICS DASHBOARD
 * Interactive JavaScript functionality
 * Features: Charts, Animations, Collapsible Sections, Navigation
 */

// Global variables
let charts = {};
let isInitialized = false;

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    if (!isInitialized) {
        initializeApp();
        isInitialized = true;
    }
});

function initializeApp() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Initialize floating button
    initializeFloatingButton();
    
    // Initialize charts when sections become visible
    initializeIntersectionObserver();
    
    // Initialize chart data
    initializeChartData();
    
    console.log('Mini Farmacia Analytics Dashboard initialized successfully');
}

// ========================================
// NAVIGATION
// ========================================

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('.analysis-section, .report-section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ========================================
// SCROLL EFFECTS
// ========================================

function initializeScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Navbar blur effect
        if (scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        }
        
        // Parallax effect for hero background
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground && scrollY < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
    });
}

// ========================================
// FLOATING BUTTON
// ========================================

function initializeFloatingButton() {
    const floatingBtn = document.querySelector('.floating-btn');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            floatingBtn.style.opacity = '1';
            floatingBtn.style.transform = 'translateY(0)';
        } else {
            floatingBtn.style.opacity = '0';
            floatingBtn.style.transform = 'translateY(20px)';
        }
    });
}

function scrollToReport() {
    const reportSection = document.getElementById('reporte');
    if (reportSection) {
        const headerHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = reportSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// ========================================
// COLLAPSIBLE SECTIONS
// ========================================

function toggleCard(button) {
    const card = button.closest('.analysis-card');
    const content = card.querySelector('.card-content');
    const isExpanded = content.style.display === 'block';
    
    // Toggle content visibility
    if (isExpanded) {
        content.style.display = 'none';
        button.classList.remove('active');
        button.innerHTML = button.innerHTML.replace('Ocultar', 'Ver').replace('▼', '▶');
        button.innerHTML = button.innerHTML.replace('Ver análisis detallado', 'Ver análisis detallado').replace('Ver proyecciones detalladas', 'Ver proyecciones detalladas').replace('Ver análisis de mercado', 'Ver análisis de mercado').replace('Ver comparativa competitiva', 'Ver comparativa competitiva').replace('Ver estrategia completa', 'Ver estrategia completa').replace('Ver análisis de canales', 'Ver análisis de canales').replace('Ver análisis FODA detallado', 'Ver análisis FODA detallado').replace('Ver estrategia de portafolio', 'Ver estrategia de portafolio').replace('Ver requerimientos operativos', 'Ver requerimientos operativos').replace('Ver análisis de costos', 'Ver análisis de costos').replace('Ver plan de mitigación completo', 'Ver plan de mitigación completo');
        button.innerHTML = button.innerHTML.replace('▶', '▼');
    } else {
        content.style.display = 'block';
        button.classList.add('active');
        button.innerHTML = button.innerHTML.replace('▼', '▶');
    }
    
    // Initialize charts if not already done
    if (!isExpanded) {
        initializeChartsForCard(card);
    }
}

// ========================================
// INTERSECTION OBSERVER FOR CHARTS
// ========================================

function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                if (!card.classList.contains('charts-initialized')) {
                    initializeChartsForCard(card);
                }
            }
        });
    }, observerOptions);
    
    // Observe all analysis cards
    const analysisCards = document.querySelectorAll('.analysis-card');
    analysisCards.forEach(card => {
        observer.observe(card);
    });
}

// ========================================
// CHART INITIALIZATION
// ========================================

function initializeChartData() {
    // Chart data configuration
    charts.config = {
        colors: {
            primary: '#007AFF',
            secondary: '#5AC8FA',
            success: '#30D158',
            warning: '#FF9500',
            danger: '#FF453A',
            info: '#64D2FF',
            gray: '#8E8E93'
        },
        fonts: {
            family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
        }
    };
}

function initializeChartsForCard(card) {
    const canvasElements = card.querySelectorAll('canvas');
    
    canvasElements.forEach(canvas => {
        const chartId = canvas.id;
        
        if (!charts[chartId]) {
            switch (chartId) {
                case 'financialBarChart':
                    charts[chartId] = createFinancialBarChart(canvas);
                    break;
                case 'financialPieChart':
                    charts[chartId] = createFinancialPieChart(canvas);
                    break;
                case 'salesLineChart':
                    charts[chartId] = createSalesLineChart(canvas);
                    break;
                case 'marketGrowthChart':
                    charts[chartId] = createMarketGrowthChart(canvas);
                    break;
                case 'segmentPieChart':
                    charts[chartId] = createSegmentPieChart(canvas);
                    break;
                case 'competitiveChart':
                    charts[chartId] = createCompetitiveChart(canvas);
                    break;
                case 'marketingFunnelChart':
                    charts[chartId] = createMarketingFunnelChart(canvas);
                    break;
                case 'channelEffectivenessChart':
                    charts[chartId] = createChannelEffectivenessChart(canvas);
                    break;
                case 'operationalChart':
                    charts[chartId] = createOperationalChart(canvas);
                    break;
                case 'costsBreakdownChart':
                    charts[chartId] = createCostsBreakdownChart(canvas);
                    break;
            }
        }
    });
    
    card.classList.add('charts-initialized');
}

// ========================================
// CHART CREATION FUNCTIONS
// ========================================

function createFinancialBarChart(canvas) {
    const ctx = canvas.getContext('2d');
    
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Base ($20K)', 'Inter ($30K)', 'Turbo ($50K)'],
            datasets: [{
                label: 'Inversión Inicial (Miles MXN)',
                data: [20, 30, 50],
                backgroundColor: 'rgba(0, 122, 255, 0.8)',
                borderColor: '#007AFF',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            }, {
                label: 'Ingresos Mensuales Estimados (Miles MXN)',
                data: [35, 50, 80],
                backgroundColor: 'rgba(48, 209, 88, 0.8)',
                borderColor: '#30D158',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Comparación de Paquetes - Inversión vs Ingresos',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    display: true,
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.1)' },
                    ticks: { 
                        callback: function(value) {
                            return '$' + value + 'K';
                        }
                    }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

function createFinancialPieChart(canvas) {
    const ctx = canvas.getContext('2d');
    
    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Resurtido Inventario', 'Personal', 'Servicios', 'Marketing', 'Otros Gastos'],
            datasets: [{
                data: [40, 30, 15, 10, 5],
                backgroundColor: [
                    '#007AFF',
                    '#30D158',
                    '#FF9500',
                    '#FF453A',
                    '#8E8E93'
                ],
                borderWidth: 3,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribución de Costos Operativos Mensuales (%)',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function createSalesLineChart(canvas) {
    const ctx = canvas.getContext('2d');
    
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mes 1', 'Mes 3', 'Mes 6', 'Mes 9', 'Mes 12'],
            datasets: [{
                label: 'Escenario Conservador',
                data: [25, 28, 32, 35, 38],
                borderColor: '#FF9500',
                backgroundColor: 'rgba(255, 149, 0, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }, {
                label: 'Escenario Base',
                data: [30, 38, 45, 50, 55],
                borderColor: '#007AFF',
                backgroundColor: 'rgba(0, 122, 255, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }, {
                label: 'Escenario Optimista',
                data: [40, 55, 70, 75, 80],
                borderColor: '#30D158',
                backgroundColor: 'rgba(48, 209, 88, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Proyección de Ventas Mensuales (Miles MXN)',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.1)' },
                    ticks: { 
                        callback: function(value) {
                            return '$' + value + 'K';
                        }
                    }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

function createMarketGrowthChart(canvas) {
    const ctx = canvas.getContext('2d');
    
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2027', '2029', '2031', '2033'],
            datasets: [{
                label: 'Valor del Mercado (Miles de Millones USD)',
                data: [12.5, 14.2, 16.1, 17.8, 19.8, 22.1, 26.8, 31.2, 34.9, 38.5],
                borderColor: '#007AFF',
                backgroundColor: 'rgba(0, 122, 255, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 3,
                pointBackgroundColor: '#007AFF',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Crecimiento del Mercado Farmacéutico Mexicano',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.1)' },
                    ticks: { 
                        callback: function(value) {
                            return '$' + value + 'B';
                        }
                    }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

function createSegmentPieChart(canvas) {
    const ctx = canvas.getContext('2d');
    
    return new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Pacientes Crónicos', 'Medicamentos OTC', 'Productos de Belleza', 'Suplementos', 'Otros'],
            datasets: [{
                data: [45, 25, 15, 10, 5],
                backgroundColor: [
                    '#007AFF',
                    '#30D158',
                    '#FF9500',
                    '#FF453A',
                    '#8E8E93'
                ],
                borderWidth: 3,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Segmentación de Productos (% de Ventas)',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function createCompetitiveChart(canvas) {
    const ctx = canvas.getContext('2d');
    
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mini Farmacia', 'Similares', 'Del Ahorro', 'Farmacias GI', 'Independiente'],
            datasets: [{
                label: 'Inversión Inicial (Millones MXN)',
                data: [0.035, 1.25, 6.5, 0.8, 1.26],
                backgroundColor: [
                    '#30D158',
                    '#FF9500',
                    '#FF453A',
                    '#007AFF',
                    '#8E8E93'
                ],
                borderWidth: 2,
                borderColor: '#ffffff',
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Comparativa de Inversión - Franquicias Farmacéuticas',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    type: 'logarithmic',
                    grid: { color: 'rgba(0,0,0,0.1)' },
                    ticks: { 
                        callback: function(value) {
                            if (value === 0.035) return '$35K';
                            if (value === 0.8) return '$800K';
                            if (value === 1.25) return '$1.25M';
                            if (value === 6.5) return '$6.5M';
                            return '$' + (value/1000000).toFixed(1) + 'M';
                        }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        maxRotation: 45
                    }
                }
            }
        }
    });
}

function createMarketingFunnelChart(canvas) {
    const ctx = canvas.getContext('2d');
    
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Awareness', 'Interés', 'Consideración', 'Intención', 'Compra'],
            datasets: [{
                label: 'Visitantes/Usuarios',
                data: [100000, 25000, 8000, 3000, 1200],
                backgroundColor: [
                    'rgba(0, 122, 255, 0.9)',
                    'rgba(0, 122, 255, 0.7)',
                    'rgba(0, 122, 255, 0.5)',
                    'rgba(0, 122, 255, 0.3)',
                    'rgba(0, 122, 255, 0.1)'
                ],
                borderColor: '#007AFF',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                title: {
                    display: true,
                    text: 'Embudo de Marketing Digital - Funnel de Conversión',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.1)' },
                    ticks: { 
                        callback: function(value) {
                            return (value/1000).toFixed(0) + 'K';
                        }
                    }
                },
                y: {
                    grid: { display: false }
                }
            }
        }
    });
}

function createChannelEffectivenessChart(canvas) {
    const ctx = canvas.getContext('2d');
    
    return new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Alcance', 'Engagement', 'Conversión', 'Costo', 'ROI'],
            datasets: [{
                label: 'TikTok/YouTube Shorts',
                data: [9, 8, 6, 9, 8],
                borderColor: '#FF453A',
                backgroundColor: 'rgba(255, 69, 58, 0.2)',
                borderWidth: 3,
                pointBackgroundColor: '#FF453A',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5
            }, {
                label: 'Facebook',
                data: [7, 6, 5, 7, 6],
                borderColor: '#007AFF',
                backgroundColor: 'rgba(0, 122, 255, 0.2)',
                borderWidth: 3,
                pointBackgroundColor: '#007AFF',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5
            }, {
                label: 'Website/E-commerce',
                data: [6, 7, 8, 5, 7],
                borderColor: '#30D158',
                backgroundColor: 'rgba(48, 209, 88, 0.2)',
                borderWidth: 3,
                pointBackgroundColor: '#30D158',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Efectividad de Canales de Marketing (Escala 1-10)',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 10,
                    grid: { color: 'rgba(0,0,0,0.1)' },
                    angleLines: { color: 'rgba(0,0,0,0.1)' },
                    pointLabels: { 
                        font: { size: 12, weight: 'bold' }
                    }
                }
            }
        }
    });
}

function createOperationalChart(canvas) {
    const ctx = canvas.getContext('2d');
    
    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Experiencia Retail', 'Conocimientos Farmacológicos', 'Gestión Inventarios', 'Habilidades Digitales', 'Red de Contactos'],
            datasets: [{
                data: [25, 20, 20, 20, 15],
                backgroundColor: [
                    '#007AFF',
                    '#30D158',
                    '#FF9500',
                    '#FF453A',
                    '#8E8E93'
                ],
                borderWidth: 3,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Perfil Ideal del Franquiciado (% Importancia)',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function createCostsBreakdownChart(canvas) {
    const ctx = canvas.getContext('2d');
    
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Renta', 'Personal', 'Resurtido', 'Servicios', 'Marketing', 'Seguros', 'Imprevistos'],
            datasets: [{
                label: 'Costo Mínimo',
                data: [0, 3000, 3000, 500, 500, 200, 500],
                backgroundColor: 'rgba(48, 209, 88, 0.8)',
                borderColor: '#30D158',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            }, {
                label: 'Costo Máximo',
                data: [5000, 8000, 10000, 1500, 2000, 500, 1000],
                backgroundColor: 'rgba(255, 69, 58, 0.8)',
                borderColor: '#FF453A',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Estructura de Costos Operativos Mensuales (MXN)',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.1)' },
                    ticks: { 
                        callback: function(value) {
                            return '$' + (value/1000).toFixed(0) + 'K';
                        }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        maxRotation: 45
                    }
                }
            }
        }
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function scrollToFinanzas() {
    const finanzasSection = document.getElementById('finanzas');
    if (finanzasSection) {
        const headerHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = finanzasSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// ========================================
// WINDOW RESIZE HANDLER
// ========================================

window.addEventListener('resize', function() {
    // Resize all charts when window is resized
    Object.values(charts).forEach(chart => {
        if (chart && typeof chart.resize === 'function') {
            chart.resize();
        }
    });
});

// ========================================
// PAGE LOAD OPTIMIZATION
// ========================================

// Lazy load charts for better performance
function lazyLoadCharts() {
    const cards = document.querySelectorAll('.analysis-card');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !card.classList.contains('charts-initialized')) {
                initializeChartsForCard(card);
            }
        }, index * 200); // Stagger chart loading
    });
}

// Initialize lazy loading after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(lazyLoadCharts, 1000);
});

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', function(e) {
    console.error('Dashboard Error:', e.error);
});

// ========================================
// PERFORMANCE MONITORING
// ========================================

// Monitor performance
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            console.log(`Dashboard loaded in ${loadTime}ms`);
        }, 0);
    });
}

// Export functions for global access
window.toggleCard = toggleCard;
window.scrollToFinanzas = scrollToFinanzas;
window.scrollToReport = scrollToReport;
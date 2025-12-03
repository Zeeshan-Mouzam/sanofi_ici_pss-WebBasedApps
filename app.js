// Register the datalabels plugin
Chart.register(ChartDataLabels);

// Presentation data
const incidentData = {
    "total_incidents": 89,
    "categories": [
        {
            "name": "Data Discrepancy",
            "count": 71
        },
        {
            "name": "Data Duplication",
            "count": 12
        },
        {
            "name": "Data Missing",
            "count": 5
        },
        {
            "name": "Obsolete Data",
            "count": 1
        }
    ],
    "subcategories": [
        {
            "name": "Payer Name Mismatch",
            "count": 40
        },
        {
            "name": "Duplicate Case",
            "count": 12
        },
        {
            "name": "Case - Provider Mismatch",
            "count": 10
        },
        {
            "name": "Indication Mismatch",
            "count": 6
        },
        {
            "name": "Zipcode Mismatch",
            "count": 4
        },
        {
            "name": "Payer Type/ Conversion Group Mismatch",
            "count": 4
        },
        {
            "name": "Provider - Territory Mismatch",
            "count": 3
        },
        {
            "name": "Case Missing",
            "count": 2
        },
        {
            "name": "Territory Mismatch",
            "count": 2
        },
        {
            "name": "CCT ID Mismatch",
            "count": 1
        }
    ],
    "priority": [
        {
            "name": "5 - Very Low",
            "count": 83
        },
        {
            "name": "3 - Moderate",
            "count": 4
        },
        {
            "name": "4 - Low",
            "count": 2
        }
    ],
    "ageing": [
        {
            "name": "1-30 Days",
            "count": 4
        },
        {
            "name": "31-60 Days",
            "count": 4
        },
        {
            "name": "61-90 Days",
            "count": 12
        },
        {
            "name": "91-120 Days",
            "count": 13
        },
        {
            "name": ">120 Days",
            "count": 56
        }
    ],
    "monthly_trend": [
        {
            "month": "2024-12",
            "count": 1
        },
        {
            "month": "2025-01",
            "count": 1
        },
        {
            "month": "2025-03",
            "count": 6
        },
        {
            "month": "2025-04",
            "count": 25
        },
        {
            "month": "2025-05",
            "count": 12
        },
        {
            "month": "2025-06",
            "count": 10
        },
        {
            "month": "2025-07",
            "count": 11
        },
        {
            "month": "2025-08",
            "count": 14
        },
        {
            "month": "2025-09",
            "count": 5
        },
        {
            "month": "2025-10",
            "count": 4
        }
    ],
    "field_impact": [
        {
            "name": "Payer Type incorrect PAYER_NM incorrect",
            "count": 17
        },
        {
            "name": "Payer Type incorrect",
            "count": 9
        },
        {
            "name": "HUB_PATIENT_ID, HUB_SITE_ADDR_1 , IMS_PRESC_ID",
            "count": 8
        },
        {
            "name": "HUB_SITE_ZIP incorrect",
            "count": 6
        },
        {
            "name": "Payer Name incorrect",
            "count": 8
        },
        {
            "name": "IMS_PRESC_ID incorrect",
            "count": 3
        },
        {
            "name": "IMS_CURR_IND_FLG Incorrect",
            "count": 2
        },
        {
            "name": "HUB_PATIENT_ID & NPI is mismatched",
            "count": 2
        },
        {
            "name": "HUB_SITE_ADDR_1 incorrect HUB_SITE_NM incorrect",
            "count": 2
        }
    ],
    "objects": [
        {
            "name": "FCT_DUPI_PAT_VW",
            "count": 87
        },
        {
            "name": "DIM_CUST_FRZ_HCP_PROF_PDRP_CIM",
            "count": 2
        }
    ]
};



// Chart color palette
const chartColors = [
    '#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F',
    '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'
];


// Current slide tracking
let currentSlide = 1;
const totalSlides = 9;


// Navigation functions
function nextSlide() {
    if (currentSlide < totalSlides) {
        document.getElementById(`slide-${currentSlide}`).classList.remove('active');
        currentSlide++;
        document.getElementById(`slide-${currentSlide}`).classList.add('active');
        updateNavigation();
        
        // Create charts when slides become active
        createChartsForSlide(currentSlide);
    }
}


function previousSlide() {
    if (currentSlide > 1) {
        document.getElementById(`slide-${currentSlide}`).classList.remove('active');
        currentSlide--;
        document.getElementById(`slide-${currentSlide}`).classList.add('active');
        updateNavigation();
        
        // Create charts when slides become active
        createChartsForSlide(currentSlide);
    }
}


function updateNavigation() {
    document.getElementById('current-slide').textContent = currentSlide;
    document.querySelector('.prev-btn').disabled = currentSlide === 1;
    document.querySelector('.next-btn').disabled = currentSlide === totalSlides;
}


// Chart creation functions
function createChartsForSlide(slideNumber) {
    switch(slideNumber) {
        case 3:
            createCategoryChart();
            break;
        case 4:
            createSubcategoryChart();
            break;
        case 5:
            createPriorityChart();
            break;
        case 6:
            createAgeingChart();
            break;
        case 7:
            createTrendChart();
            break;
        case 8:
            createFieldImpactChart();
            break;
        case 9:
            createObjectImpactChart();
            break;
    }
}


// Category Chart (Bar)
function createCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx || ctx.chart) return;
    
    ctx.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: incidentData.categories.map(item => item.name),
            datasets: [{
                label: 'Number of Incidents',
                data: incidentData.categories.map(item => item.count),
                backgroundColor: chartColors.slice(0, incidentData.categories.length),
                borderColor: chartColors.slice(0, incidentData.categories.length),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} incidents`;
                        }
                    }
                },
                datalabels: {     // added datalabels
                    anchor: 'end',
                    align: 'end',
                    color: 'black',
                    font: { weight: 'bold' },
                    formatter: function(value) {
                        return value;
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        }
    });
}


// Subcategory Chart (Horizontal Bar)
function createSubcategoryChart() {
    const ctx = document.getElementById('subcategoryChart');
    if (!ctx || ctx.chart) return;
    
    ctx.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: incidentData.subcategories.map(item => item.name),
            datasets: [{
                label: 'Number of Incidents',
                data: incidentData.subcategories.map(item => item.count),
                backgroundColor: chartColors.slice(0, incidentData.subcategories.length),
                borderColor: chartColors.slice(0, incidentData.subcategories.length),
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.x} incidents`;
                        }
                    }
                },
                datalabels: {     // added datalabels
                    anchor: 'end',
                    align: 'end',
                    color: 'black',
                    font: { weight: 'bold' },
                    formatter: function(value) {
                        return value;
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
					suggestedMax: 50
                },
                y: {
                    ticks: {
                        maxTicksLimit: 10
                    }
                }
            }
        }
    });
}


// Priority Chart (Pie)
function createPriorityChart() {
    const ctx = document.getElementById('priorityChart');
    if (!ctx || ctx.chart) return;
    
    ctx.chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: incidentData.priority.map(item => item.name),
            datasets: [{
                data: incidentData.priority.map(item => item.count),
                backgroundColor: chartColors.slice(0, incidentData.priority.length),
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return `${context.label}: ${context.parsed} (${percentage}%)`;
                        }
                    }
                },
                datalabels: {     // added datalabels
                    anchor: 'center',
                    align: 'center',
                    color: 'black',
                    font: { weight: 'bold' },
                    formatter: function(value) {
                        return value;
                    }
                }
            }
        }
    });
}


// Ageing Chart (Stacked Bar)
function createAgeingChart() {
    const ctx = document.getElementById('ageingChart');
    if (!ctx || ctx.chart) return;
    
    ctx.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Incidents by Age'],
            datasets: incidentData.ageing.map((item, index) => ({
                label: item.name,
                data: [item.count],
                backgroundColor: chartColors[index],
                borderColor: chartColors[index],
                borderWidth: 1
            }))
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y} incidents`;
                        }
                    }
                },
                datalabels: {     // added datalabels
                    anchor: 'center',
                    align: 'center',
                    color: 'black',
                    font: { weight: 'bold' },
                    formatter: function(value) {
                        return value;
                    }
                }
            }
        }
    });
}


// Trend Chart (Line)
function createTrendChart() {
    const ctx = document.getElementById('trendChart');
    if (!ctx || ctx.chart) return;
    
    const monthNames = {
        '2024-12': 'Dec 2024',
        '2025-01': 'Jan 2025',
        '2025-02': 'Feb 2025',
        '2025-03': 'Mar 2025',
        '2025-04': 'Apr 2025',
        '2025-05': 'May 2025',
        '2025-06': 'Jun 2025',
        '2025-07': 'Jul 2025',
        '2025-08': 'Aug 2025',
        '2025-09': 'Sep 2025',
        '2025-10': 'Oct 2025'
    };
    
    ctx.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: incidentData.monthly_trend.map(item => monthNames[item.month]),
            datasets: [{
                label: 'Monthly Submissions',
                data: incidentData.monthly_trend.map(item => item.count),
                borderColor: chartColors[0],
                backgroundColor: chartColors[0] + '20',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: chartColors[0],
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} submissions`;
                        }
                    }
                },
                datalabels: {     // added datalabels
                    anchor: 'end',
                    align: 'end',
                    color: 'black',
                    font: { weight: 'bold' },
                    formatter: function(value) {
                        return value;
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        }
    });
}


// Field Impact Chart (Bar)
function createFieldImpactChart() {
    const ctx = document.getElementById('fieldImpactChart');
    if (!ctx || ctx.chart) return;
    
    ctx.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: incidentData.field_impact.map(item => item.name),
            datasets: [{
                label: 'Impact Count',
                data: incidentData.field_impact.map(item => item.count),
                backgroundColor: chartColors.slice(0, incidentData.field_impact.length),
                borderColor: chartColors.slice(0, incidentData.field_impact.length),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} impacted records`;
                        }
                    }
                },
                datalabels: {     // added datalabels
                    anchor: 'center',
                    align: 'center',
                    color: 'black',
                    font: { weight: 'bold' },
                    formatter: function(value) {
                        return value;
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 2
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                        font : {
                            size: 11
                        }
                    }
                }
            }
        }
    });
}


// Object Impact Chart (Bar)
function createObjectImpactChart() {
    const ctx = document.getElementById('objectImpactChart');
    if (!ctx || ctx.chart) return;
    
    ctx.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: incidentData.objects.map(item => item.name),
            datasets: [{
                label: 'Object Impact Count',
                data: incidentData.objects.map(item => item.count),
                backgroundColor: chartColors.slice(0, incidentData.objects.length),
                borderColor: chartColors.slice(0, incidentData.objects.length),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} incidents`;
                        }
                    }
                },
                datalabels: {     // added datalabels
                    anchor: 'center',
                    align: 'center',
                    color: 'black',
                    font: { weight: 'bold' },
                    formatter: function(value) {
                        return value;
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 0,
                        callback: function(value, index) {
                            const label = this.getLabelForValue(value);
                            return label.length > 20 ? label.substring(0, 20) + '...' : label;
                        }
                    }
                }
            }
        }
    });
}


// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousSlide();
    }
});


// Initialize presentation
document.addEventListener('DOMContentLoaded', function() {
    updateNavigation();
    // Create charts for initial slide if needed
    createChartsForSlide(currentSlide);
});

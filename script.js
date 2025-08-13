// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const toggleBall = document.querySelector('.toggle-ball');
const body = document.body;
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const currentTimeElement = document.getElementById('current-time');
const currentDateElement = document.getElementById('current-date');

// Theme Toggle
themeToggle.addEventListener('click', () => {
    body.dataset.theme = body.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', body.dataset.theme);
    updateTheme();
});

function updateTheme() {
    if (body.dataset.theme === 'light') {
        toggleBall.style.transform = 'translateX(30px)';
    } else {
        toggleBall.style.transform = 'translateX(0)';
    }
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
body.dataset.theme = savedTheme;
updateTheme();

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Update current time and date
function updateTime() {
    const now = new Date();
    
    // Time
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    currentTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
    
    // Date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = now.toLocaleDateString('en-US', options);
}

setInterval(updateTime, 1000);
updateTime();

// Section animation on scroll
function checkScroll() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initial state for sections
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

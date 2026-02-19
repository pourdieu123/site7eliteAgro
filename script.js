// ========== MENU MOBILE ==========
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Fermer le menu mobile lorsqu'on clique sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========== SURBRILLANCE DU LIEN ACTIF (scroll) ==========
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========== RÉVÉLATIONS AU SCROLL (ANIMATIONS) ==========
function revealElements() {
    const reveals = document.querySelectorAll('.reveal, .reveal-up, .reveal-slide-left, .reveal-slide-right');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        } 
        // optionnel : retirer la classe si on veut re-cacher en scrollant vers le haut
        // else {
        //     reveals[i].classList.remove('active');
        // }
    }
}

window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);

// ========== EFFET DE PARALLAXE LÉGER SUR LA HERO ==========
window.addEventListener('mousemove', (e) => {
    const leaf = document.querySelector('.leaf');
    const building = document.querySelector('.building');
    const water = document.querySelector('.water');
    if (!leaf || !building || !water) return;
    
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    leaf.style.transform = `translate(${x * 20}px, ${y * 10}px)`;
    building.style.transform = `translate(${-x * 15}px, ${-y * 10}px)`;
    water.style.transform = `translate(${x * 10}px, ${y * 20}px)`;
});

// ========== CHANGEMENT DE STYLE DE LA NAVBAR AU SCROLL ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        navbar.style.background = 'rgba(255,255,255,0.95)';
    } else {
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.03)';
        navbar.style.background = 'rgba(255,255,255,0.85)';
    }
});
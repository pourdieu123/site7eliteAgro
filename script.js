// script.js — 7Elite Terra (toutes les interactions)

// 1) INIT AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// 2) CUSTOM CURSOR
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 3) LOADER
window.addEventListener('load', () => {
    const loader = document.getElementById('loader-wrapper');
    loader.classList.add('loader-hidden');
});

// 4) NAVBAR SCROLL EFFECT
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(7, 16, 12, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(7, 16, 12, 0.7)';
    }
});

// 5) MENU MOBILE
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// 6) ACTIVE LINK ON SCROLL
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
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

// 7) PANEL DÉRIVÉ 7ELITE
const derivesToggle = document.getElementById('derivesToggle');
const derivesPanel = document.getElementById('derivesPanel');
const closeDerives = document.getElementById('closeDerives');

const derivesData = [
    { icon: 'fa-rocket', name: '7Elite Space', desc: 'Nouveaux espaces & orbite' },
    { icon: 'fa-microchip', name: '7Elite Nano', desc: 'Matériaux intelligents' },
    { icon: 'fa-brain', name: '7Elite AI', desc: 'IA décisionnelle' },
    { icon: 'fa-bolt', name: '7Elite Energy', desc: 'Transition énergétique' },
    { icon: 'fa-shield', name: '7Elite Defense', desc: 'Sécurité & résilience' },
    { icon: 'fa-dna', name: '7Elite Bio', desc: 'Biotech environnementale' },
];

function renderDerives() {
    const grid = document.querySelector('.derives-grid');
    grid.innerHTML = derivesData.map(d => `
        <div class="deriv-card" data-name="${d.name}">
            <i class="fas ${d.icon}"></i>
            <h4>${d.name}</h4>
            <p>${d.desc}</p>
        </div>
    `).join('');
    document.querySelectorAll('.deriv-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const name = card.dataset.name;
            const desc = card.querySelector('p').innerText;
            alert(`🔍 ${name} : ${desc} – Entité sœur de 7Elite Terra.`);
        });
    });
}
renderDerives();

derivesToggle.addEventListener('click', (e) => {
    e.preventDefault();
    derivesPanel.classList.toggle('open');
});
closeDerives.addEventListener('click', () => {
    derivesPanel.classList.remove('open');
});

// Remplacer la partie modale dans script.js par ceci :

// 8) GÉNÉRATION DIVISIONS PRINCIPALES
const divisionsData = [
    { icon: 'fa-seedling', title: 'AgroSystems', sub: 'Systèmes de production durables', items: ['systèmes de production durables', 'agriculture intelligente', 'gestion des sols et eau', 'performance et adaptation'] },
    { icon: 'fa-globe', title: 'EcoSystems', sub: 'Écosystèmes & ressources', items: ['gestion intégrée sols/eau/biodiversité', 'restauration milieux dégradés', 'solutions fondées sur nature', 'équilibres écologiques'] },
    { icon: 'fa-city', title: 'Green Cities', sub: 'Villes durables', items: ['aménagement espaces verts', 'résilience climatique urbaine', 'intégration du végétal', 'amélioration cadre de vie'] },
    { icon: 'fa-temperature-high', title: 'Climate', sub: 'Adaptation climatique', items: ['stratégies adaptation', 'plans résilience', 'réduction vulnérabilités', 'politiques transition'] },
    { icon: 'fa-recycle', title: 'Carbon', sub: 'Trajectoires bas carbone', items: ['bilans carbone', 'stratégies bas carbone', 'solutions séquestration', 'accompagnement climat'] },
    { icon: 'fa-hard-hat', title: 'Remediation', sub: 'Dépollution & requalification', items: ['diagnostics pollution', 'gestion sites pollués', 'stratégies dépollution', 'requalification terrains', 'nouveaux usages'] },
    { icon: 'fa-chart-pie', title: 'Environmental Studies', sub: 'Études & ingénierie', items: ['études impact', 'diagnostics territoriaux', 'ingénierie environn.', 'assistance maîtrise ouvrage', 'sécurisation projets'] }
];

const grid = document.getElementById('divisionsGrid');
const modal = document.getElementById('divisionModal');
const modalBody = document.getElementById('modalBody');
const closeButtons = document.querySelectorAll('.modal-close, #modalCloseBtn');

divisionsData.forEach(div => {
    const card = document.createElement('div');
    card.className = 'division-card';
    card.innerHTML = `
        <div class="division-icon"><i class="fas ${div.icon}"></i></div>
        <h3>${div.title}</h3>
        <div class="div-sub">${div.sub}</div>
    `;
    card.addEventListener('click', () => {
        modalBody.innerHTML = `
            <h2><i class="fas ${div.icon}"></i> ${div.title}</h2>
            <h4>${div.sub}</h4>
            <ul>${div.items.map(i => `<li><i class="fas fa-check" style="color:var(--accent);"></i> ${i}</li>`).join('')}</ul>
            <p style="margin-top:1rem;"><strong>Interventions clés</strong> — 7Elite Terra</p>
        `;
        modal.style.display = 'flex';
    });
    grid.appendChild(card);
});

// Fermeture par les boutons
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
});

// Fermeture en cliquant à l'extérieur du contenu
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
// 9) FORMULAIRE
const contactForm = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    feedback.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    setTimeout(() => {
        feedback.innerHTML = '<span style="color:var(--accent);">✓ Message reçu. Un expert vous répondra sous 24h.</span>';
        contactForm.reset();
    }, 1500);
});

// 10) SCROLL DOWN
document.getElementById('scrollDown').addEventListener('click', () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
});

// 11) BOUTON VIDÉO
document.getElementById('showReelBtn').addEventListener('click', (e) => {
    e.preventDefault();
    alert('🎬 Découvrez notre reel institutionnel (simulation). Rendez-vous sur notre chaîne YouTube.');
});
// Initialisation du site
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sliderContainer = document.getElementById('sliderContainer');
    const prevSlideBtn = document.getElementById('prevSlide');
    const nextSlideBtn = document.getElementById('nextSlide');
    const indicators = document.querySelectorAll('.indicator');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    const backToTopBtn = document.getElementById('backToTop');
    const contactBtn = document.getElementById('contactBtn');
    const header = document.querySelector('.header');
    
    // Configuration du slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let slideInterval;
    
    // Initialisation des fonctionnalités
    initNavigation();
    initSlider();
    initForms();
    initScrollEffects();
    initAnimations();
    
    // Gestion de la navigation responsive
    function initNavigation() {
        // Toggle du menu mobile
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Fermer le menu mobile lors du clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
                
                // Mettre à jour l'état actif des liens
                navLinks.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Bouton contact dans la navigation
        contactBtn.addEventListener('click', function() {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            
            // Fermer le menu mobile si ouvert
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Gestion du slider
    function initSlider() {
        // Fonction pour changer de slide
        function goToSlide(index) {
            // Réinitialiser l'intervalle
            clearInterval(slideInterval);
            
            // Masquer la slide actuelle
            slides[currentSlide].classList.remove('active');
            indicators[currentSlide].classList.remove('active');
            
            // Mettre à jour l'index
            currentSlide = (index + totalSlides) % totalSlides;
            
            // Afficher la nouvelle slide
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
            
            // Redémarrer l'intervalle
            startSliderInterval();
        }
        
        // Fonction pour passer à la slide suivante
        function nextSlide() {
            goToSlide(currentSlide + 1);
        }
        
        // Fonction pour passer à la slide précédente
        function prevSlide() {
            goToSlide(currentSlide - 1);
        }
        
        // Démarrer l'intervalle automatique
        function startSliderInterval() {
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        // Événements pour les contrôles du slider
        nextSlideBtn.addEventListener('click', nextSlide);
        prevSlideBtn.addEventListener('click', prevSlide);
        
        // Événements pour les indicateurs
        indicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-index'));
                goToSlide(slideIndex);
            });
        });
        
        // Démarrer le slider automatique
        startSliderInterval();
        
        // Arrêter le slider au survol
        sliderContainer.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        // Reprendre le slider quand la souris quitte
        sliderContainer.addEventListener('mouseleave', function() {
            startSliderInterval();
        });
    }
    
    // Gestion des formulaires
    function initForms() {
        // Formulaire de contact
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Récupérer les valeurs du formulaire
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
                const formMessage = document.getElementById('formMessage');
                
                // Validation simple
                if (!name || !email || !subject || !message) {
                    showFormMessage(formMessage, 'Veuillez remplir tous les champs obligatoires.', 'error');
                    return;
                }
                
                // Simulation d'envoi réussi
                showFormMessage(formMessage, 'Merci ! Votre message a été envoyé. Nous vous répondrons dans les plus brefs délais.', 'success');
                
                // Réinitialiser le formulaire
                contactForm.reset();
                
                // Cacher le message après 5 secondes
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            });
        }
        
        // Formulaire newsletter
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailInput = this.querySelector('input[type="email"]');
                const email = emailInput.value;
                
                if (!email) {
                    alert('Veuillez entrer une adresse email valide.');
                    return;
                }
                
                // Simulation d'inscription réussie
                alert(`Merci de vous être inscrit à notre newsletter avec l'adresse : ${email}`);
                emailInput.value = '';
            });
        }
    }
    
    // Afficher un message dans le formulaire
    function showFormMessage(element, message, type) {
        element.textContent = message;
        element.className = `form-message ${type}`;
        element.style.display = 'block';
    }
    
    // Effets de défilement
    function initScrollEffects() {
        // Gestion du bouton retour en haut
        window.addEventListener('scroll', function() {
            // Afficher/masquer le bouton retour en haut
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
            
            // Effet sur l'en-tête lors du défilement
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Mise à jour des liens actifs dans la navigation
            updateActiveNavLink();
        });
        
        // Bouton retour en haut
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Mise à jour des liens de navigation actifs
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Animations au défilement
    function initAnimations() {
        // Intersection Observer pour les animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);
        
        // Observer les éléments à animer
        const elementsToAnimate = document.querySelectorAll('.service-card, .about-image, .founder-image, .contact-form');
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
        
        // Animation des statistiques
        const stats = document.querySelectorAll('.stat h3');
        stats.forEach(stat => {
            const targetValue = parseInt(stat.textContent);
            let currentValue = 0;
            const increment = targetValue / 50;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    clearInterval(timer);
                    stat.textContent = targetValue + (stat.textContent.includes('+') ? '+' : '');
                } else {
                    stat.textContent = Math.floor(currentValue) + (stat.textContent.includes('+') ? '+' : '');
                }
            }, 50);
        });
    }
    
    // Effet de parallaxe sur le slider
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.slide-image');
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translate3d(0px, ${rate}px, 0px)`;
        });
    });
});
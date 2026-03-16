/* ==================== DATA: TRANSLATIONS ==================== */
const translations = {
    es: {
        "menu_home": "Inicio",
        "menu_about": "Sobre Mí",
        "menu_games": "Juegos",
        "menu_contact": "Contacto",
        "slogan": "Un desarrollador, infinitas posibilidades.",
        "btn_view_games": "Ver Juegos <i class='bx bx-right-arrow-alt'></i>",
        "btn_learn_more": "Conoce Más",
        "about_title": "Sobre Mí",
        "about_text": "Soy un desarrollador independiente dedicado a dar vida a mis propias ideas. Dareca Games es mi cuartel general, donde diseño, programo y experimento con mecánicas para crear experiencias únicas. Mi objetivo es hacer juegos a los que a mí me gustaría jugar.",
        "stat_code": "100% Código",
        "stat_indie": "Indie Dev",
        "stat_passion": "Pasión",
        "games_title": "Juegos",
        "game_status": "Coming Soon",
        "btn_steam": "Añadir a Wishlist en Steam",
        "contact_title": "Contacto",
        "contact_subtitle": "¿Interesado en lo que hacemos? Suscríbete a nuestra newsletter para enterarte de todas las novedades, o envíanos un email.",
        "form_placeholder": "Tu Email",
        "btn_subscribe": "Suscribirse",
        "footer_rights": "Todos los derechos reservados."
    },
    en: {
        "menu_home": "Home",
        "menu_about": "About",
        "menu_games": "Games",
        "menu_contact": "Contact",
        "slogan": "One developer, infinite possibilities.",
        "btn_view_games": "View Games <i class='bx bx-right-arrow-alt'></i>",
        "btn_learn_more": "Learn More",
        "about_title": "About Me",
        "about_text": "I am an independent developer dedicated to bringing my own ideas to life. Dareca Games is my headquarters, where I design, code, and experiment with mechanics to create unique experiences. My goal is to make the games I would like to play.",
        "stat_code": "100% Code",
        "stat_indie": "Indie Dev",
        "stat_passion": "Passion",
        "games_title": "Games",
        "game_status": "Coming Soon",
        "btn_steam": "Add to Wishlist on Steam",
        "contact_title": "Contact",
        "contact_subtitle": "Interested in what we do? Subscribe to our newsletter to hear about all the news, or send us an email.",
        "form_placeholder": "Your Email",
        "btn_subscribe": "Subscribe",
        "footer_rights": "All rights reserved."
    }
};

/* ==================== MENU SHOW / HIDE ==================== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/* Remove menu mobile when a link is clicked */
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* ==================== BACKGROUND HEADER ==================== */
const header = document.getElementById('header');
const scrollHeader = () =>{
    if(window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

/* ==================== SET ACTIVE LINK ON SCROLL ==================== */
const sections = document.querySelectorAll('section[id]');

const scrollActive = () =>{
  	const scrollY = window.pageYOffset;

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 100,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

		if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            if (sectionsClass) {
			    sectionsClass.classList.add('active-link');
            }
		}else{
            if (sectionsClass) {
			    sectionsClass.classList.remove('active-link');
            }
		}
	})
}
window.addEventListener('scroll', scrollActive);


/* ==================== LANGUAGE SWITCHER ==================== */
const langButtons = document.querySelectorAll('.lang-btn');
const elementsToTranslate = document.querySelectorAll('[data-i18n]');

function setLanguage(lang) {
    // Determine target dictionary
    const dict = translations[lang] || translations['es'];
    
    // Update elements
    elementsToTranslate.forEach(el => {
        const key = el.getAttribute('data-i18n');
        
        // Sometimes we translate attributes (like placeholder) vs innerHTML
        if (el.hasAttribute('data-i18n-prop') && el.getAttribute('data-i18n-prop') === 'placeholder') {
            el.placeholder = dict[key];
        } else {
            el.innerHTML = dict[key];
        }
    });

    // Update active class on buttons
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Save preference to localStorage
    localStorage.setItem('dareca_lang', lang);
}

// Add event listeners
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        setLanguage(lang);
    });
});

// Load saved language or default to ES
const savedLang = localStorage.getItem('dareca_lang') || 'es';
setLanguage(savedLang);

/* ==================== CAROUSEL ==================== */
const items = document.querySelectorAll('.carousel__item');
const prevBtn = document.querySelector('.carousel__btn.prev');
const nextBtn = document.querySelector('.carousel__btn.next');
const indicatorsContainer = document.querySelector('.carousel__indicators');
let currentIndex = 0;
let carouselInterval;

// Create indicators
items.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel__dot');
    if (index === 0) dot.classList.add('active');
    
    dot.addEventListener('click', () => {
        goToSlide(index);
        resetInterval();
    });
    
    indicatorsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.carousel__dot');

function updateCarousel() {
    items.forEach((item, index) => {
        item.classList.remove('active');
        dots[index].classList.remove('active');
        if (index === currentIndex) {
            item.classList.add('active');
            dots[index].classList.add('active');
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

if (prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
}

function resetInterval() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, 5000); // 5 sec per slide
}

// Start auto-slide
carouselInterval = setInterval(nextSlide, 5000);

/* ==================== SCROLL REVEAL ANIMATION ==================== */
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
  
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;
  
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal(); // Trigger on load

/* ==================== SET CURRENT YEAR ==================== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ==================== NEWSLETTER FORM MOCK ==================== */
const form = document.getElementById('newsletter-form');
const formMsg = document.getElementById('form-msg');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const currentLang = document.querySelector('.lang-btn.active').getAttribute('data-lang');
        formMsg.textContent = currentLang === 'es' ? "¡Gracias por suscribirte!" : "Thank you for subscribing!";
        formMsg.className = "form__message msg-success";
        form.reset();
        
        setTimeout(() => {
            formMsg.textContent = "";
        }, 5000);
    });
}

/* ==================== PARTICLES JS CONFIG ==================== */
// Initialize particles.js if it exists
if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.1, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#007BFF", "opacity": 0.1, "width": 1 },
            "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.3 } }, "push": { "particles_nb": 2 } }
        },
        "retina_detect": true
    });
}

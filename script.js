/* ══ LOADER ══════════════════════════════════════ */

const cameFromGallery = sessionStorage.getItem('fromGallery') === 'true';
const loaderEl = document.getElementById('loader-name');
'Chetan P Devanuru'.split('').forEach((ch, i) => {
    const s = document.createElement('span');
    s.textContent = ch === ' ' ? '\u00A0' : ch;
    s.style.animationDelay = (i * 0.045) + 's';
    loaderEl.appendChild(s);
});
if (!cameFromGallery) {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.classList.add('hide');
        setTimeout(() => loader.remove(), 750);
    }, 2200);
} else {
    document.getElementById('loader')?.remove();
}



/* ══ SCROLL EVENTS ═══════════════════════════════ */
const progressBar = document.getElementById('scroll-progress');
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    progressBar.style.width = Math.min(pct, 100) + '%';
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    revealElements();
    updateActiveNav();
}, { passive: true });

/* ══ REVEAL ON SCROLL ════════════════════════════ */
function revealElements() {
    const threshold = window.innerHeight - 90;
    document.querySelectorAll(
        '.reveal, .venture-card, .exp-card, .collab-card, .initiative-card, .tl-item, .edu-block'
    ).forEach((el, i) => {
        if (el.getBoundingClientRect().top < threshold) {
            setTimeout(() => el.classList.add('show'), i * 60);
        }
    });
}
revealElements();

/* ══ ACTIVE NAV ══════════════════════════════════ */
const navLinks = document.querySelectorAll('.nav-link');
function updateActiveNav() {
    let current = '';
    document.querySelectorAll('section[id]').forEach(sec => {
        if (sec.getBoundingClientRect().top <= window.innerHeight * 0.35) current = sec.id;
    });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('data-target') === current));
}

/* ══ SMOOTH SCROLL ═══════════════════════════════ */
function smoothTo(id) {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 76, behavior: 'smooth' });
}
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        smoothTo(link.getAttribute('data-target'));
        document.getElementById('navMenu').classList.remove('active');
        document.getElementById('menuToggle').classList.remove('active');
    });
});
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', e => {
        const href = btn.getAttribute('href');
        if (href && href.startsWith('#')) { e.preventDefault(); smoothTo(href.slice(1)); }
    });
});

/* ══ HAMBURGER ═══════════════════════════════════ */
document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('active');
    document.getElementById('menuToggle').classList.toggle('active');
});

/* ══ HERO PARALLAX TILT ══════════════════════════ */
const heroFrame = document.getElementById('heroFrame');
if (heroFrame) {
    document.addEventListener('mousemove', e => {
        const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
        heroFrame.style.transform = `perspective(900px) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg)`;
        heroFrame.style.transition = 'transform 0.15s linear';
    });
}

/* ══ MARQUEE DUPLICATE ═══════════════════════════ */
const track = document.getElementById('marqueeTrack');
if (track) track.innerHTML += track.innerHTML;

/* ══ GALLERY NAV ═════════════════════════════════ */



document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', () => {
        sessionStorage.setItem('fromGallery', 'true');
        sessionStorage.setItem('scrollY', window.scrollY);
        window.location.href = card.getAttribute('data-page');
    });
});

/* ══ CONTROL LOADER + SCROLL ══════════════════════ */


const scrollY = sessionStorage.getItem('scrollY');
history.scrollRestoration = "manual";

if (cameFromGallery && scrollY !== null) {
    document.documentElement.style.scrollBehavior = "auto"; // disable smooth scroll

    window.addEventListener('load', () => {
        window.scrollTo(0, parseInt(scrollY));
    });
}

window.addEventListener('load', () => {
    if (cameFromGallery) {
        sessionStorage.removeItem('scrollY');
        sessionStorage.removeItem('fromGallery');
    }
});



/* ===== SETUP MARQUEE ===== */
function setupMarquee(track) {
    if (track.dataset.ready) return;

    const parentWidth = track.parentElement.offsetWidth;

    while (track.scrollWidth < parentWidth * 2) {
        track.innerHTML += track.innerHTML;
    }

    track.dataset.ready = "true";
}

/* ===== INITIAL LOAD ===== */
document.querySelectorAll('[data-marquee]').forEach(track => {
    if (track.closest('.testimonial-set').classList.contains('active')) {
        setupMarquee(track);
        track.classList.add('animate');
    }
});

/* ===== SWITCH TAB ===== */
function switchTab(id) {

    document.querySelectorAll('.testimonial-set').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.testimonial-tabs button').forEach(b => b.classList.remove('active'));

    const activeSet = document.getElementById('set' + id);
    activeSet.classList.add('active');
    document.querySelectorAll('.testimonial-tabs button')[id - 1].classList.add('active');

    const track = activeSet.querySelector('[data-marquee]');

    setupMarquee(track);

    // restart animation cleanly
    track.classList.remove('animate');
    void track.offsetWidth;
    track.classList.add('animate');
}


function toggleTimeline() {
    const section = document.getElementById("moreTimeline");
    const btn = document.querySelector(".timeline-toggle");

    if (section.style.display === "block") {
        section.style.display = "none";
        btn.style.display = "block";

        // 🔥 smooth scroll back to top of timeline
        window.scrollTo({
            top: document.querySelector(".mobile-timeline").offsetTop - 20,
            behavior: "smooth"
        });

    } else {
        section.style.display = "block";
        btn.style.display = "none";
    }
}
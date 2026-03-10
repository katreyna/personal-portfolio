 // ── Status badge scroll reveal ──────────────────────────────
window.addEventListener('scroll', function () {
    const badge = document.querySelector('.status-badge');
    if (window.scrollY > 100) badge.classList.add('visible');
    else badge.classList.remove('visible');
});

// ── Project cards scroll-in ──────────────────────────────────
const cards = document.querySelectorAll('.project-card');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(
                () => entry.target.classList.add('visible'),
                entry.target.dataset.delay || 0
            );
        }
    });
}, { threshold: 0.1 });

cards.forEach((card, i) => {
    card.dataset.delay = i * 120;
    cardObserver.observe(card);
});

// ── Section heading scroll-in ────────────────────────────────
const headings = document.querySelectorAll('.reveal-heading');
const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            headingObserver.unobserve(entry.target); // fire once
        }
    });
}, { threshold: 0.2 });

headings.forEach(h => headingObserver.observe(h));

// ── Mouse-following glow on project cards ───────────────────
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
    });
});

// ── Mouse-following glow on exp cards ───────────────────────
document.querySelectorAll('.exp-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
    });
});

// ── Carousel ─────────────────────────────────────────────────
const carouselState = {};

function moveCarousel(id, dir) {
    const carousel = document.getElementById(id);
    const imgs = carousel.querySelectorAll('.carousel-img');
    const dots = document.querySelectorAll('#dots-' + id + ' .carousel-dot');

    if (carouselState[id] === undefined) carouselState[id] = 0;

    _goTo(id, imgs, dots, (carouselState[id] + dir + imgs.length) % imgs.length);
}

function goToSlide(id, index) {
    const carousel = document.getElementById(id);
    const imgs = carousel.querySelectorAll('.carousel-img');
    const dots = document.querySelectorAll('#dots-' + id + ' .carousel-dot');
    _goTo(id, imgs, dots, index);
}

function _goTo(id, imgs, dots, next) {
    const current = carouselState[id] || 0;
    if (current === next) return;

    const outgoing = imgs[current];
    const incoming = imgs[next];
    const track = outgoing.closest('.carousel-track');

    // Lock the track height to avoid collapse while outgoing fades
    track.style.height = track.offsetHeight + 'px';

    outgoing.style.position = 'absolute';
    outgoing.style.top = '0';
    outgoing.style.left = '0';
    outgoing.classList.remove('active');
    dots[current].classList.remove('active');

    incoming.classList.add('active');
    dots[next].classList.add('active');
    carouselState[id] = next;

    // Release lock once incoming image has rendered
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            track.style.height = '';
            outgoing.style.position = '';
            outgoing.style.top = '';
            outgoing.style.left = '';
        });
    });
}

// ── Landing parallax ─────────────────────────────────────────
const landingStack = document.querySelector('#landing .name-stack');
if (landingStack) {
    const kat = landingStack.querySelector('.kat');
    const reynosa = landingStack.querySelector('.reynosa');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const limit = window.innerHeight;
        if (scrollY > limit) return;

        const progress = scrollY / limit;
        kat.style.transform = `translateY(${progress * -30}px)`;
        reynosa.style.transform = `translateX(-50%) translateY(${progress * 30}px)`;
    }, { passive: true });
}

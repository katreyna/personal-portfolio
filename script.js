window.addEventListener('scroll', function() {
        const badge = document.querySelector('.status-badge');
        if (window.scrollY > 100) badge.classList.add('visible');
        else badge.classList.remove('visible');
    });

    const cards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), entry.target.dataset.delay || 0);
            }
        });
    }, { threshold: 0.1 });
    cards.forEach((card, i) => {
        card.dataset.delay = i * 120;
        observer.observe(card);
    });

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
            card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
        });
    });

    const carouselState = {};
    function moveCarousel(id, dir) {
        const carousel = document.getElementById(id);
        const imgs = carousel.querySelectorAll('.carousel-img');
        const dots = document.querySelectorAll('#dots-' + id + ' .carousel-dot');
        if (carouselState[id] === undefined) carouselState[id] = 0;
        imgs[carouselState[id]].classList.remove('active');
        dots[carouselState[id]].classList.remove('active');
        carouselState[id] = (carouselState[id] + dir + imgs.length) % imgs.length;
        imgs[carouselState[id]].classList.add('active');
        dots[carouselState[id]].classList.add('active');
    }
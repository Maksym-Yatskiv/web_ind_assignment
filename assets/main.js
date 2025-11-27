(function(){
    // Nav toggle (mobile)
    function initNavToggle(btnId){
        const btn = document.getElementById(btnId);
        const nav = document.querySelector('.main-nav');
        if(!btn || !nav) return;
        btn.addEventListener('click', ()=>{
            const open = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!open));
            nav.style.display = open ? '' : 'flex';
            nav.style.flexDirection = open ? 'row' : 'column';
            nav.style.gap = '.6rem';
            nav.style.background = 'rgba(0,0,0,0.4)';
            nav.style.padding = '.8rem';

        });
    }
    initNavToggle('navToggle'); initNavToggle('navToggle2'); initNavToggle('navToggle3'); initNavToggle('navToggle4');

    // Carousel
    (function(){
        const carousel = document.getElementById('heroCarousel');
        if(!carousel) return;
        const slides = Array.from(carousel.querySelectorAll('.slide'));
        let idx = slides.findIndex(s => s.classList.contains('active')) || 0;
        const interval = 6000;
        let timer = null;
        function show(i){ slides.forEach(s=> s.classList.remove('active')); slides[i].classList.add('active'); idx = i; }
        function next(){ show((idx+1)%slides.length); }
        function prev(){ show((idx-1+slides.length)%slides.length); }
        document.getElementById('nextSlide')?.addEventListener('click', ()=>{ next(); reset(); });
        document.getElementById('prevSlide')?.addEventListener('click', ()=>{ prev(); reset(); });
        function start(){ timer = setInterval(next, interval); }
        function reset(){ clearInterval(timer); start(); }
        carousel.addEventListener('mouseenter', ()=> clearInterval(timer));
        carousel.addEventListener('mouseleave', start);
        start();
    })();


    // Collection filter
    (function(){
        const input = document.getElementById('collectionSearch');
        const typeSel = document.getElementById('collectionType');
        const grid = document.getElementById('collectionsGrid');
        if(!grid) return;
        const cards = Array.from(grid.querySelectorAll('.card'));
        function filter(){
            const q = input?.value.trim().toLowerCase() || '';
            const type = typeSel?.value || '';
            cards.forEach(card=>{
                const title = card.querySelector('.title')?.textContent.toLowerCase() || '';
                const matchesQuery = q === '' || title.includes(q);
                const matchesType = !type || card.dataset.type === type;
                card.style.display = (matchesQuery && matchesType) ? '' : 'none';
            });
        }
        input?.addEventListener('input', filter);
        typeSel?.addEventListener('change', filter);
    })();


    // Contact form (local validation + fake submit)
    (function(){
        const form = document.getElementById('contactForm');
        if(!form) return;
        form.addEventListener('submit', (e)=>{
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            if(!name || !email || !message){ alert('Будь ласка, заповніть усі поля.'); return; }
            // Тут замість реального запиту ми просто показуємо повідомлення
            alert('Дякуємо! Ваше повідомлення надіслано.');
            form.reset();
        });
    })();


})();












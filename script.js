document.addEventListener('DOMContentLoaded', () => {
    const typed = document.getElementById('typedText');
    const titles = ['Software Developer','Java Developer','MCA Student','Web Developer','Problem Solver'];
    let titleIndex = 0, charIndex = 0, deleting = false;

    function typeLoop(){
        if(!typed) return;
        const title = titles[titleIndex];
        typed.textContent = deleting ? title.slice(0, --charIndex) : title.slice(0, ++charIndex);
        if(!deleting && charIndex === title.length){ deleting = true; setTimeout(typeLoop, 1400); return; }
        if(deleting && charIndex === 0){ deleting = false; titleIndex = (titleIndex + 1) % titles.length; setTimeout(typeLoop, 350); return; }
        setTimeout(typeLoop, deleting ? 45 : 85);
    }
    typeLoop();

    const header = document.getElementById('header');
    const nav = document.getElementById('navLinks');
    const menu = document.getElementById('menuIcon');
    const top = document.getElementById('scrollTop');
    const sections = [...document.querySelectorAll('section[id]')];
    const navItems = [...document.querySelectorAll('.nav-links a')];

    menu?.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = menu.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    navItems.forEach(link => link.addEventListener('click', () => {
        nav.classList.remove('active');
        const icon = menu?.querySelector('i');
        if(icon){ icon.classList.add('fa-bars'); icon.classList.remove('fa-xmark'); }
    }));

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const id = link.getAttribute('href');
            const target = document.querySelector(id);
            if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
        });
    });

    function onScroll(){
        header?.classList.toggle('scrolled', window.scrollY > 35);
        top?.classList.toggle('show', window.scrollY > 450);
        const position = window.scrollY + 170;
        let current = 'home';
        sections.forEach(section => {
            if(position >= section.offsetTop && position < section.offsetTop + section.offsetHeight) current = section.id;
        });
        navItems.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();

    top?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
    }, {threshold:0.12});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const form = document.getElementById('contactForm');
    const message = document.getElementById('formMessage');
    form?.addEventListener('submit', e => {
        e.preventDefault();
        message.textContent = 'Please use the email above to contact me directly. This form is currently frontend-only.';
        form.reset();
    });
});

document.documentElement.classList.add('js');

// Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Fade sections in as they scroll into view
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(en => {
            if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
} else {
    revealEls.forEach(el => el.classList.add('visible'));
}

// Highlight the nav link of the section currently on screen
const navLinks = document.querySelectorAll('nav a');
const sections = [...navLinks].map(a => document.querySelector(a.getAttribute('href')));
window.addEventListener('scroll', () => {
    const y = window.scrollY + 120;
    let current = null;
    sections.forEach((s, i) => { if (s && s.offsetTop <= y) current = i; });
    navLinks.forEach((a, i) => a.classList.toggle('active', i === current));
}, { passive: true });

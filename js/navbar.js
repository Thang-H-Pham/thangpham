const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar .right a');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`.navbar a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, { threshold: 0.4 });

sections.forEach(section => observer.observe(section));

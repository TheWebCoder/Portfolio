document.addEventListener('mousemove', (e) => {
    const underlay = document.querySelector('.underlay');
    underlay.style.setProperty('--mouse-x', `${e.clientX}px`);
    underlay.style.setProperty('--mouse-y', `${e.clientY}px`);
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const headerHeight = window.innerWidth >= 1024 ? 96 : 0;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 150;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const isLastSection = index === sections.length - 1;

        if (isLastSection && scrollPosition + windowHeight >= documentHeight - 50) {
            current = section.getAttribute('id');
        } else if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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

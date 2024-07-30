document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Project carousel
    const carousel = document.getElementById('project-carousel');
    const projects = carousel.querySelectorAll('.project-file');
    const prevButton = document.getElementById('prev-project');
    const nextButton = document.getElementById('next-project');
    let currentIndex = 0;

    function updateCarousel() {
        const offset = -currentIndex * 220; // 200px width + 20px gap
        carousel.style.transform = `translateX(${offset}px)`;
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < projects.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Highlight active nav item on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('#navbar a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Skill animations
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        skill.addEventListener('mouseover', () => {
            const animation = skill.dataset.skill.toLowerCase();
            switch(animation) {
                case 'html':
                    skill.style.transform = 'rotate(360deg)';
                    break;
                case 'css':
                    skill.style.transform = 'translateY(-10px)';
                    break;
                case 'javascript':
                    skill.style.transform = 'scale(1.1)';
                    break;
                case 'react':
                    skill.style.transform = 'rotate(180deg)';
                    break;
                case 'node.js':
                    skill.style.transform = 'skew(10deg)';
                    break;
            }
        });
        skill.addEventListener('mouseout', () => {
            skill.style.transform = 'none';
        });
    });

    // Project carousel
    const carousel = document.getElementById('project-carousel');
    const projects = carousel.querySelectorAll('.project-file');
    let currentIndex = 0;

    function updateCarousel() {
        projects.forEach((project, index) => {
            const offset = (index - currentIndex + projects.length) % projects.length;
            const zIndex = projects.length - Math.abs(offset);
            const opacity = 1 - (Math.abs(offset) / projects.length);
            const scale = 1 - (Math.abs(offset) * 0.1);

            project.style.transform = `translateX(${offset * 120}%) scale(${scale})`;
            project.style.zIndex = zIndex;
            project.style.opacity = opacity;
        });
    }

    document.getElementById('next-project').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % projects.length;
        updateCarousel();
    });

    document.getElementById('prev-project').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + projects.length) % projects.length;
        updateCarousel();
    });

    // Initialize carousel
    updateCarousel();

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission (you'll need to implement the backend for this)
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Implement form submission logic here
        console.log('Form submitted');
    });
});
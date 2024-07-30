document.addEventListener('DOMContentLoaded', () => {
    const projectCarousel = document.getElementById('project-carousel');
    const projects = projectCarousel.querySelectorAll('.project-file');
    const prevButton = document.getElementById('prev-project');
    const nextButton = document.getElementById('next-project');
    let currentIndex = 0;

    function updateCarousel() {
        projects.forEach((project, index) => {
            if (index === currentIndex) {
                project.style.transform = 'scale(1.1)';
                project.style.opacity = '1';
            } else {
                project.style.transform = 'scale(0.9)';
                project.style.opacity = '0.7';
            }
        });
    }

    function showNextProject() {
        currentIndex = (currentIndex + 1) % projects.length;
        updateCarousel();
    }

    function showPrevProject() {
        currentIndex = (currentIndex - 1 + projects.length) % projects.length;
        updateCarousel();
    }

    nextButton.addEventListener('click', showNextProject);
    prevButton.addEventListener('click', showPrevProject);

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
});
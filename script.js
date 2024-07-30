document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.project-carousel');
    const prevButton = document.querySelector('.carousel-nav .prev');
    const nextButton = document.querySelector('.carousel-nav .next');

    prevButton.addEventListener('click', () => {
        carousel.scrollBy({ left: -300, behavior: 'smooth' });
    });

    nextButton.addEventListener('click', () => {
        carousel.scrollBy({ left: 300, behavior: 'smooth' });
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.querySelector('.project-grid');
    let isDown = false;
    let startX;
    let scrollLeft;

    projectGrid.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - projectGrid.offsetLeft;
        scrollLeft = projectGrid.scrollLeft;
    });

    projectGrid.addEventListener('mouseleave', () => {
        isDown = false;
    });

    projectGrid.addEventListener('mouseup', () => {
        isDown = false;
    });

    projectGrid.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - projectGrid.offsetLeft;
        const walk = (x - startX) * 2;
        projectGrid.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile swiping
    projectGrid.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - projectGrid.offsetLeft;
        scrollLeft = projectGrid.scrollLeft;
    });

    projectGrid.addEventListener('touchmove', (e) => {
        if (!startX) return;
        const x = e.touches[0].pageX - projectGrid.offsetLeft;
        const walk = (x - startX) * 2;
        projectGrid.scrollLeft = scrollLeft - walk;
        e.preventDefault();
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
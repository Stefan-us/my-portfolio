document.addEventListener('DOMContentLoaded', () => {
    new fullpage('#fullpage', {
        //options here
        autoScrolling: true,
        scrollHorizontally: true,
        navigation: true,
        navigationPosition: 'right',
        scrollingSpeed: 700,
        fitToSection: true,
        scrollOverflow: true,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,
        anchors: ['home', 'projects', 'contact'],
        menu: 'header nav',
        onLeave: (origin, destination, direction) => {
            // Prevent scrolling up from the first section
            if (origin.index === 0 && direction === 'up') {
                return false;
            }
            // Prevent scrolling down from the last section
            if (origin.index === 2 && direction === 'down') {
                return false;
            }
        },
        afterLoad: (origin, destination, direction) => {
            // You can add any additional logic here after a section is loaded
        }
    });

    // Project swiping (if needed)
    const projectGrid = document.querySelector('.project-grid');
    if (projectGrid) {
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
    }
});
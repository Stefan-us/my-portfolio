document.addEventListener('DOMContentLoaded', () => {
    const pages = ['index.html', 'projects.html', 'contact.html'];
    let currentPageIndex = pages.indexOf(window.location.pathname.split('/').pop() || 'index.html');
    
    function initFullPage() {
        new fullpage('#fullpage', {
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
            afterLoad: function(origin, destination, direction) {
                currentPageIndex = pages.indexOf(destination.anchor + '.html');
            }
        });
    }

    function navigateToPage(url) {
        window.location.href = url;
    }

    // Initialize fullPage.js
    initFullPage();

    // Handle navigation clicks
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('href').split('#')[0];
            if (targetPage !== pages[currentPageIndex]) {
                navigateToPage(targetPage);
            }
        });
    });

    // Handle scrolling between pages
    window.addEventListener('wheel', (event) => {
        if (event.deltaY > 0 && currentPageIndex < pages.length - 1) {
            // Scrolling down
            navigateToPage(pages[currentPageIndex + 1]);
        } else if (event.deltaY < 0 && currentPageIndex > 0) {
            // Scrolling up
            navigateToPage(pages[currentPageIndex - 1]);
        }
    }, { passive: false });

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
document.addEventListener('DOMContentLoaded', () => {
    const pages = ['index.html', 'projects.html', 'contact.html'];
    let currentPageIndex = pages.indexOf(window.location.pathname.split('/').pop() || 'index.html');
    let isScrolling = false;
    let lastScrollTime = 0;
    const scrollCooldown = 1000; // 1 second cooldown between scrolls

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
            onLeave: (origin, destination, direction) => {
                if (isScrolling) return false;
                
                const now = new Date().getTime();
                if (now - lastScrollTime < scrollCooldown) return false;
                
                lastScrollTime = now;
                
                if (direction === 'down' && currentPageIndex < pages.length - 1) {
                    navigateToPage(pages[currentPageIndex + 1], direction);
                    return false;
                } else if (direction === 'up' && currentPageIndex > 0) {
                    navigateToPage(pages[currentPageIndex - 1], direction);
                    return false;
                }
                
                return false;
            },
            afterLoad: (origin, destination, direction) => {
                isScrolling = false;
            }
        });
    }

    function navigateToPage(url, direction) {
        if (isScrolling) return;
        isScrolling = true;

        fetch(url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const newDoc = parser.parseFromString(html, 'text/html');
                const newContent = newDoc.querySelector('#fullpage').innerHTML;
                
                const fullpageElement = document.querySelector('#fullpage');
                fullpageElement.style.opacity = 0;
                
                setTimeout(() => {
                    fullpageElement.innerHTML = newContent;
                    fullpageElement.style.opacity = 1;
                    history.pushState(null, '', url);
                    currentPageIndex = pages.indexOf(url);
                    
                    // Reinitialize fullPage.js
                    fullpage_api.destroy('all');
                    initFullPage();
                    
                    // Scroll to the correct section based on the direction
                    if (direction === 'down') {
                        fullpage_api.moveTo(1);
                    } else if (direction === 'up') {
                        fullpage_api.moveTo(fullpage_api.getActiveSection().index + 1);
                    }
                    
                    isScrolling = false;
                }, 300);
            })
            .catch(error => {
                console.error('Error loading page:', error);
                isScrolling = false;
            });
    }

    // Initialize fullPage.js
    initFullPage();

    // Handle navigation clicks
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('href');
            if (targetPage !== pages[currentPageIndex]) {
                navigateToPage(targetPage);
            }
        });
    });

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        const newPage = window.location.pathname.split('/').pop() || 'index.html';
        if (newPage !== pages[currentPageIndex]) {
            navigateToPage(newPage);
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
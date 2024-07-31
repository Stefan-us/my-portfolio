document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navigateToPage(this.getAttribute('href'));
        });
    });

    // Project swiping
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

    // Seamless page navigation
    function navigateToPage(url) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newContent = doc.querySelector('main').innerHTML;
                document.querySelector('main').innerHTML = newContent;
                history.pushState(null, '', url);
                window.scrollTo(0, 0);
            });
    }

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        navigateToPage(window.location.pathname);
    });

    // Infinite scroll effect
    let lastScrollTop = 0;
    let currentPageIndex = 0;
    const pages = ['index.html', 'projects.html', 'contact.html'];

    window.addEventListener('scroll', () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            // Scrolling down
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
                currentPageIndex = (currentPageIndex + 1) % pages.length;
                navigateToPage(pages[currentPageIndex]);
            }
        } else if (st === 0) {
            // Scrolling up to the top
            currentPageIndex = (currentPageIndex - 1 + pages.length) % pages.length;
            navigateToPage(pages[currentPageIndex]);
        }
        lastScrollTop = st <= 0 ? 0 : st;
    }, false);
});
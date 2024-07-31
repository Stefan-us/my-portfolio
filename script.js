document.addEventListener('DOMContentLoaded', () => {
    let currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pages = ['index.html', 'projects.html', 'contact.html'];
    let currentIndex = pages.indexOf(currentPage);

    function loadPage(url, direction) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const newDoc = parser.parseFromString(html, 'text/html');
                const newContent = newDoc.querySelector('main').innerHTML;
                
                const mainContent = document.querySelector('main');
                mainContent.style.opacity = 0;
                
                setTimeout(() => {
                    mainContent.innerHTML = newContent;
                    mainContent.style.opacity = 1;
                    history.pushState(null, '', url);
                    currentPage = url;
                    currentIndex = pages.indexOf(currentPage);
                    setupEventListeners();
                }, 300);
            });
    }

    function handleScroll(event) {
        const direction = event.deltaY > 0 ? 1 : -1;
        
        if (direction === -1 && currentIndex === 0) return; // Prevent scrolling up from index.html
        if (direction === 1 && currentIndex === pages.length - 1) return; // Prevent scrolling down from contact.html
        
        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < pages.length) {
            loadPage(pages[newIndex], direction);
        }
    }

    function setupEventListeners() {
        const throttledHandleScroll = throttle(handleScroll, 1000);
        window.addEventListener('wheel', throttledHandleScroll, { passive: false });

        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetPage = this.getAttribute('href');
                if (targetPage !== currentPage) {
                    loadPage(targetPage);
                }
            });
        });
    }

    function throttle(func, limit) {
        let inThrottle;
        return function(event) {
            if (!inThrottle) {
                func(event);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Initial setup
    setupEventListeners();

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        currentPage = window.location.pathname.split('/').pop() || 'index.html';
        currentIndex = pages.indexOf(currentPage);
        loadPage(currentPage);
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
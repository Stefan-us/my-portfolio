document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#navbar a');

    function setActiveSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            setActiveSection(targetId);
        });
    });

    // Handle scroll-based navigation
    let isScrolling = false;
    let startY;

    document.addEventListener('wheel', (e) => {
        if (!isScrolling) {
            startY = e.pageY;
            isScrolling = true;

            setTimeout(() => {
                const direction = e.pageY > startY ? 1 : -1;
                const activeSection = document.querySelector('section.active');
                let nextSection;

                if (direction === 1) {
                    nextSection = activeSection.nextElementSibling;
                } else {
                    nextSection = activeSection.previousElementSibling;
                }

                if (nextSection && nextSection.tagName === 'SECTION') {
                    setActiveSection(nextSection.id);
                }

                isScrolling = false;
            }, 50);
        }
    });
});
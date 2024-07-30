document.addEventListener('DOMContentLoaded', () => {
    // Initialize skills
    const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'];
    const skillsContainer = document.getElementById('skills-container');
    skills.forEach(skill => {
        const skillBox = document.createElement('div');
        skillBox.className = 'skill-box';
        skillBox.textContent = skill;
        skillsContainer.appendChild(skillBox);
    });

    // Initialize project carousel
    const projects = [
        { name: 'Weather Dashboard', year: 2024 },
        { name: 'E-commerce Platform', year: 2023 },
        { name: 'Social Media App', year: 2022 },
        // Add more projects here
    ];

    const carousel = document.getElementById('project-carousel');
    const totalProjects = projects.length;
    const radius = 300; // Adjust based on your preference
    let angle = 0;

    projects.forEach((project, index) => {
        const folder = document.createElement('div');
        folder.className = 'project-folder';
        folder.textContent = `${project.name} (${project.year})`;
        folder.style.transform = `translateZ(-${radius}px) rotateY(${(index * 360) / totalProjects}deg) translateZ(${radius}px)`;
        carousel.appendChild(folder);

        folder.addEventListener('click', () => openProject(project));
    });

    function rotateCarousel(direction) {
        angle += direction * (360 / totalProjects);
        carousel.style.transform = `translateZ(-${radius}px) rotateY(${angle}deg)`;
    }

    // Add navigation controls
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') rotateCarousel(1);
        if (e.key === 'ArrowRight') rotateCarousel(-1);
    });

    function openProject(project) {
        // Implement project opening logic here
        console.log(`Opening project: ${project.name}`);
        // You can create a modal or navigate to a new page here
    }

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Implement form submission logic here
        console.log('Form submitted');
    });

    // Animate on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.fullscreen-section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;
            if (sectionTop < window.innerHeight && sectionBottom > 0) {
                section.classList.add('in-view');
            } else {
                section.classList.remove('in-view');
            }
        });
    });
});
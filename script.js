document.addEventListener('DOMContentLoaded', () => {
    const projectList = document.querySelector('.project-list');
    const prevButton = document.querySelector('.project-nav .prev');
    const nextButton = document.querySelector('.project-nav .next');
    
    let currentProject = 0;
    const projects = projectList.children;

    function showProject(index) {
        for (let i = 0; i < projects.length; i++) {
            projects[i].style.display = i === index ? 'block' : 'none';
        }
    }

    prevButton.addEventListener('click', () => {
        currentProject = (currentProject - 1 + projects.length) % projects.length;
        showProject(currentProject);
    });

    nextButton.addEventListener('click', () => {
        currentProject = (currentProject + 1) % projects.length;
        showProject(currentProject);
    });

    showProject(currentProject);
});
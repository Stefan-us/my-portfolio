document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }
    });

    // Skills animation
    const skills = document.querySelectorAll('.skill-box');
    skills.forEach(skill => {
        skill.addEventListener('mouseover', () => {
            skill.style.transform = 'scale(1.1) rotate(5deg)';
        });
        skill.addEventListener('mouseout', () => {
            skill.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Project card hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
        });
        card.addEventListener('mouseout', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });

    // Typing effect for hero section
    const heroText = "I'm Stefan Cretu, a passionate developer crafting digital experiences.";
    const heroP = document.querySelector('.hero p');
    let i = 0;
    function typeWriter() {
        if (i < heroText.length) {
            heroP.innerHTML += heroText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    typeWriter();
});
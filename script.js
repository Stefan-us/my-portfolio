document.addEventListener('DOMContentLoaded', function() {
    new fullpage('#fullpage', {
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        anchors: ['home', 'projects', 'contact'],
        navigation: true,
        navigationPosition: 'right',
        scrollOverflow: true,
        autoScrolling: true,
        fitToSection: true,
        scrollBar: false,
        afterLoad: function(origin, destination, direction) {
            console.log("Section loaded:", destination.anchor);
        },
        onLeave: function(origin, destination, direction) {
            console.log("Leaving section:", origin.anchor, "Going to:", destination.anchor, "Direction:", direction);
        },
        scrollingSpeed: 700,
        easing: 'easeInOutCubic',
        sectionsSelector: '.section'
    });

    // Create Lucide icons
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    } else {
        console.error('Lucide library not loaded properly');
    }

    // Color scheme toggle functionality
    const colorToggle = document.createElement('button');
    colorToggle.id = 'color-toggle';
    colorToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Assuming you're using Font Awesome
    document.body.appendChild(colorToggle);

    colorToggle.addEventListener('click', function() {
        document.documentElement.classList.toggle('light-mode');
        this.innerHTML = document.documentElement.classList.contains('light-mode') 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        fullpage_api.reBuild();
    });
});

window.addEventListener('hashchange', function() {
    console.log('Hash changed:', window.location.hash);
});
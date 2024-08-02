document.addEventListener('DOMContentLoaded', function() {
    new fullpage('#fullpage', {
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE', // Replace with your actual key if you have a premium license
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
        sectionsSelector: '.section'  // Add this line to ensure sections are correctly identified
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
    colorToggle.textContent = 'Toggle Light Mode';
    document.body.appendChild(colorToggle);

    colorToggle.addEventListener('click', function() {
        document.documentElement.classList.toggle('light-mode');
        this.textContent = document.documentElement.classList.contains('light-mode') ? 'Toggle Dark Mode' : 'Toggle Light Mode';
        fullpage_api.reBuild();  // Rebuild FullPage.js after changing color scheme
    });
});

window.addEventListener('hashchange', function() {
    console.log('Hash changed:', window.location.hash);
});
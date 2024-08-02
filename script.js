document.addEventListener('DOMContentLoaded', function() {
    new fullpage('#fullpage', {
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
        easing: 'easeInOutCubic'
    });
});

window.addEventListener('hashchange', function() {
    console.log('Hash changed:', window.location.hash);
});

document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});
new fullpage('#fullpage', {
    anchors: ['home', 'projects', 'contact'],
    navigation: true,
    navigationPosition: 'right',
    scrollOverflow: true,
    autoScrolling: true,
    fitToSection: true,
    scrollBar: false,
    afterLoad: function(origin, destination, direction) {
        console.log("Section loaded: " + destination.anchor);
    },
    onLeave: function(origin, destination, direction) {
        console.log("Leaving section: " + origin.index);
    },
    scrollingSpeed: 700, // Adjust this value to change the scrolling speed
    easing: 'easeInOutCubic' // This provides a smooth easing effect
});
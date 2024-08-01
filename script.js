new fullpage('#fullpage', {
    anchors: ['home', 'projects', 'contact'],
    navigation: true,
    navigationPosition: 'right',
    scrollOverflow: true,
    autoScrolling: true,
    fitToSection: true,
    scrollBar: false,
    css3: true,
    easingcss3: 'ease-out',
    afterLoad: function(origin, destination, direction) {
        console.log("Section loaded: " + destination.anchor);
    },
    onLeave: function(origin, destination, direction) {
        console.log("Leaving section: " + origin.index);
    }
});

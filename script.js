new fullpage('#fullpage', {
    anchors: ['home', 'projects', 'contact'],
    navigation: true,
    navigationPosition: 'right',
    scrollOverflow: true,
    autoScrolling: true,
    fitToSection: true,
    scrollBar: false,
    afterLoad: function(origin, destination, direction){
        console.log("Section loaded: " + destination.anchor);
    }
});

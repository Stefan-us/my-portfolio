document.addEventListener('DOMContentLoaded', () => {
    // Ensure Lucide is initialized
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        console.error('Lucide library not loaded properly');
    }

    // Initialize fullPage.js with a license key
    if (typeof fullpage !== 'undefined') {
        new fullpage('#fullpage', {
            licenseKey: 'YOUR_LICENSE_KEY',
            anchors: ['home', 'projects', 'contact'],
            sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE'],
            afterLoad: function(origin, destination, direction){
                console.log("Section loaded: " + destination.anchor);
            },
            onLeave: function(origin, destination, direction){
                console.log("Leaving section: " + origin.anchor + " Going to: " + destination.anchor + " Direction: " + direction);
            }
        });
    } else {
        console.error('Fullpage.js library not loaded properly');
    }
});

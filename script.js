document.addEventListener('DOMContentLoaded', function() {
    new fullpage('#fullpage', {
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        anchors: ['guess-number'],
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

    initGuessNumberGame();
});

function initGuessNumberGame() {
    let targetNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;

    window.checkGuess = function() {
        let guess = document.getElementById('guess').value;
        let message = document.getElementById('message');
        attempts++;

        if (guess == targetNumber) {
            message.textContent = `Congratulations! You guessed the number ${targetNumber} in ${attempts} attempts! You're amazing!`;
            message.style.color = 'var(--highlight-color)';
            document.querySelector('button').disabled = true;
        } else if (guess < targetNumber) {
            message.textContent = "Too low! Try again.";
            message.style.color = 'var(--text-color)';
        } else {
            message.textContent = "Too high! Try again.";
            message.style.color = 'var(--text-color)';
        }
    }
}

window.addEventListener('hashchange', function() {
    console.log('Hash changed:', window.location.hash);
});

document.addEventListener('DOMContentLoaded', function() {
    const colorToggle = document.getElementById('color-toggle');
    
    colorToggle.addEventListener('click', function() {
        document.documentElement.classList.toggle('light-mode');
        this.innerHTML = document.documentElement.classList.contains('light-mode') 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        if (typeof fullpage_api !== 'undefined') {
            fullpage_api.reBuild();
        }
    });
});
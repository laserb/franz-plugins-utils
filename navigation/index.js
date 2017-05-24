const path = require('path');

module.exports = (Franz, options) => {
    initEventListener();
    createNavigationBar();

    // inject franz.css stylesheet
    Franz.injectCSS(path.join(__dirname, 'css', 'buttons.css'));
}

var initEventListener = function() {
    document.addEventListener('keydown', function(event) {
        if(event.ctrlKey) {
            switch(event.keyCode) {
                case 37:
                case 79:
                    window.history.back();
                    break;
                case 39:
                case 73:
                    window.history.forward();
                    break;
                case 85:
                    toggleUrl();
                    break;
            }
        }
    });
}

var navDiv;
var createNavigationBar = function() {
    navDiv = document.createElement('div');
    navDiv.id = "franz-nav";
    document.body.appendChild(navDiv);
    createBackButton();
    createUrlBar();
    createForwardButton();
}

var createBackButton = function() {
    var backButton = document.createElement('button');
    backButton.innerHTML = "&#8249";
    backButton.addEventListener('click', function() {
        window.history.back();
    });
    backButton.id = "franz-back";
    navDiv.appendChild(backButton);
}

var createForwardButton = function() {
    var forwardButton = document.createElement('button');
    forwardButton.innerHTML = "&#8250";
    forwardButton.addEventListener('click', function() {
        window.history.forward();
    });
    forwardButton.id = "franz-forward";
    navDiv.appendChild(forwardButton);
}

var urlBar;
var urlBarSpan;
var createUrlBar = function() {
    var urlContainer = document.createElement('div');
    urlBar = document.createElement('div');
    urlBarSpan = document.createElement('input');
    urlBarSpan.setAttribute("type", "text");
    urlBarSpan.setAttribute("readonly", "readonly");
    urlContainer.id = "franz-url";
    urlBar.style.display = "none";
    urlBar.appendChild(urlBarSpan);
    urlContainer.appendChild(urlBar);
    navDiv.appendChild(urlContainer);
}

var toggleUrl = function() {
    if(urlBar.style.display === "none") {
        showUrl();
    } else {
        hideUrl();
    }
}

var showUrl = function() {
    urlBarSpan.value = window.location.href;
    urlBar.style.display = "block";
}

var hideUrl = function() {
    urlBar.style.display = "none";
}

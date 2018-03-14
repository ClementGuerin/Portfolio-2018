// GLOBAL Var (for help functions)

var mouseX, mouseY;
var widthScreen, heightScreen;
var mouseWheel, lastMouseWheel;
var projectMargin, projectWidth, projectHeight;
var projectSelected = 1;
var projectClicked;
var projectS = document.querySelectorAll('.project'); // Use in multiples functions
var projectListWidth = document.querySelector('.project-list').offsetWidth;
var noRepeat = false;
var indexClick;
var mouseDown, firstClick, lastClick, firstScroll, lastScroll, successScroll;


// Help functions

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function getHeightWidthScreen() {
    widthScreen = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    heightScreen = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

function mouseWheelDetection(e) {
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) { // Check if it's Firefox because FF is stupid
        window.addEventListener('DOMMouseScroll', function (e) {
            mouseWheel = e.detail;
            if (mouseWheel < 0) {
                previousProject();
            } else {
                nextProject();
            }
        });
    } else {
        window.addEventListener('wheel', function (e) {
            mouseWheel = e.wheelDelta;
            if (mouseWheel > 0) {
                previousProject();
            } else if (mouseWheel < 0) {
                nextProject();
            }
        });
    }

    // mouseWheelDetection(); once for start it
};

// Functions

function changeProjectSize() {
    projectWidth = widthScreen / 2;
    projectHeight = projectWidth * 0.5;
    projectMargin = (widthScreen - projectWidth) / 2;

    var projectList = document.querySelector('.project-list');

    projectList.style.marginLeft = projectMargin + "px";
    projectList.style.marginRight = projectMargin + "px";

    for (var i = 0; i < projectS.length; i++) {
        projectS[i].style.width = projectWidth + "px";
        projectS[i].style.height = projectHeight + "px";
        if (i < (projectS.length - 1)) {
            projectS[i].style.marginRight = (projectMargin / 2) + "px";
        }
    }
}

function resetScroll() {
    document.body.scroll({
        top: 0,
        left: 0,
        behavior: 'auto'
    });
}

function resizing() {
    getHeightWidthScreen();
    changeProjectSize();
}

// Projects display

function previousProject() {
    if (noRepeat == false) {
        noRepeat = true; // Set NoRepeat

        if (projectSelected > 1) {
            projectSelected--
            console.log("project Selected : " + projectSelected);

            // Scroll
            document.body.scrollBy({
                left: -((projectWidth) + (projectMargin / 2)),
                behavior: 'smooth'
            });

            // Actions for each project
            checkProject();
        }

        // Timeout for reset NoRepeat
        var waitRepeat = setTimeout(function () {
            noRepeat = false;
        }, 500);
    }
}

function nextProject() {
    if (noRepeat == false) {
        noRepeat = true; // Set NoRepeat

        if (projectS.length > projectSelected) {
            projectSelected++
            console.log("project Selected : " + projectSelected);

            // Scroll
            document.body.scrollBy({
                left: projectWidth + (projectMargin / 2),
                behavior: 'smooth'
            });

            // Actions for each project
            checkProject();
        }

        // Timeout for reset NoRepeat
        var waitRepeat = setTimeout(function () {
            noRepeat = false;
        }, 500);
    }
}

function checkProject() { // I know, it's bad :(
    if (projectSelected == 1) {
        projectS[0].classList.add('project-selected');
        projectS[1].classList.remove('project-selected');
        projectS[2].classList.remove('project-selected');
        projectS[3].classList.remove('project-selected');
        projectS[4].classList.remove('project-selected');
    } else if (projectSelected == 2) {
        projectS[1].classList.add('project-selected');
        projectS[0].classList.remove('project-selected');
        projectS[2].classList.remove('project-selected');
        projectS[3].classList.remove('project-selected');
        projectS[4].classList.remove('project-selected');
    } else if (projectSelected == 3) {
        projectS[2].classList.add('project-selected');
        projectS[0].classList.remove('project-selected');
        projectS[1].classList.remove('project-selected');
        projectS[3].classList.remove('project-selected');
        projectS[4].classList.remove('project-selected');

    } else if (projectSelected == 4) {
        projectS[3].classList.add('project-selected');
        projectS[0].classList.remove('project-selected');
        projectS[1].classList.remove('project-selected');
        projectS[2].classList.remove('project-selected');
        projectS[4].classList.remove('project-selected');

    } else if (projectSelected == 5) {
        projectS[4].classList.add('project-selected');
        projectS[0].classList.remove('project-selected');
        projectS[1].classList.remove('project-selected');
        projectS[2].classList.remove('project-selected');
        projectS[3].classList.remove('project-selected');

    } else {
        alert("Oopsy, Edit checkProject function bro.");
    }
}

function clickProject() {
    for (indexClick = 0; indexClick < projectS.length; indexClick++) {
        projectS[indexClick].addEventListener('mousedown', function () {
            projectSelected = this.dataset.id
            console.log("project Selected : " + projectSelected);

            // Scroll
            document.body.scroll({
                left: (projectWidth + (projectMargin / 2)) * (this.dataset.id - 1),
                behavior: 'smooth'
            });

            // Actions for each project
            checkProject();
        })
    }
}


function giveIDtoProjects() {
    for (var i = 0; i < projectS.length; i++) {
        projectS[i].dataset.id = i + 1; // Give ID
    }
}

function dragProjects(event){
    var projectList = document.querySelector('.project-list');

    projectList.addEventListener('mousedown', function(event){
        if(mouseDown !== true){
            firstClick = event.pageX;
            firstScroll = window.scrollX;
        }
        mouseDown = true;
        console.log('start');
    });

    projectList.addEventListener('mouseup', function(){
        mouseDown = false;
        console.log('stop');

        if(successScroll !== true){
            // Scroll
            document.body.scroll({
                left: ((projectWidth) + (projectMargin / 2)) * (projectSelected-1),
                behavior: 'smooth'
            });
        }
        successScroll = false;
    });

    projectList.addEventListener('mousemove', function(event){
        if(mouseDown == true){
            lastClick = event.pageX;
            lastScroll = window.scrollX;
            var clickDifference = -((lastClick - firstClick));
            // Scroll
            document.body.scrollBy({
                left: clickDifference,
                behavior: 'auto'
            });

            console.log(lastScroll - firstScroll);

            if(lastScroll > firstScroll+300){
                projectSelected++
                console.log("project Selected : " + projectSelected);
                // Scroll
                document.body.scroll({
                    left: ((projectWidth) + (projectMargin / 2)) * (projectSelected-1),
                    behavior: 'smooth'
                });
                mouseDown = false;
                successScroll = true;
                checkProject();

            } else if(lastScroll <= firstScroll-300){
                projectSelected--
                console.log("project Selected : " + projectSelected);
                // Scroll
                document.body.scroll({
                    left: ((projectWidth) + (projectMargin / 2)) * (projectSelected-1),
                    behavior: 'smooth'
                });
                mouseDown = false;
                successScroll = true;
                checkProject();
            }

        }
    });
}

// ************************************************************************** //

// START EXPERIMENTAL


function keyProject(event){
    var key = event.keyCode;
    
    if((key == 37 || key == 100 || key == 81) && projectSelected > 1){ // Left key 
        projectSelected--
        console.log("project Selected : " + projectSelected);
        // Scroll to left
        document.body.scroll({
            left: ((projectWidth) + (projectMargin / 2)) * (projectSelected-1),
            behavior: 'smooth'
        });
        checkProject();
    } else if ((key == 39 || key == 102 || key == 68) && projectSelected < projectS.length){ // Right key
        projectSelected++
        console.log("project Selected : " + projectSelected);
        // Scroll to right
        document.body.scroll({
            left: ((projectWidth) + (projectMargin / 2)) * (projectSelected-1),
            behavior: 'smooth'
        });
        checkProject();
    }
    
}

window.addEventListener('keydown', keyProject);


// END EXPERIMENTAL

// ************************************************************************** //

window.addEventListener('resize', resizing);


// Start function (END)

function startFunctions() {
    resizing();
    mouseWheelDetection();
    loaded();
    giveIDtoProjects();
    checkProject();
    clickProject();
    dragProjects();
}

function loaded() {
    window.addEventListener('load', function () {
        var wait = setTimeout(resetScroll, 100);
    })
}

startFunctions();
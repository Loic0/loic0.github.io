let is_big = new Array(document.querySelectorAll('.project').length).fill(0);

let one_already_big = 0;
let is_personal_project = 1;

window.onresize = move;

const project_center = document.getElementById("center-project-circle");
const project_switch = document.getElementById("switch-project-type");

// #132F63, #FABB5A, #F7F1EA, #F6554D


document.getElementById("project-contener").addEventListener("click", on_personal_project_click);
document.getElementById("school-contener").addEventListener("click", on_school_project_click);
document.getElementById("switch-project-type").addEventListener("click", toggle_project_type);
document.getElementById("bottom-contener").addEventListener("click", exit_full_screen_project);


function toggle_project_type() {
    is_personal_project = (is_personal_project == 0);

    if (is_personal_project) {
        on_personal_project_click();
    }
    else {
        on_school_project_click();
    }
}

/*
project_center.addEventListener("mouseenter", function( event ) {   
    event.target.style.background = "purple";
  }, false);
  project_center.addEventListener("mouseleave", function( event ) {   
    event.target.style.background = "";
  }, false);*/

function on_personal_project_click() {
    project_center.textContent = "Personal Projects";
    project_center.style.background = '#317AC1';

    project_switch.textContent = "School Projects";
    project_switch.style.background = '#5c91c5';
    is_personal_project = 1;
}

function on_school_project_click() {
    project_center.textContent = "School Projects";
    project_center.style.background = '#5c91c5';

    project_switch.textContent = "Personal Projects";
    project_switch.style.background = '#317AC1';
    is_personal_project = 0;
}


function exit_full_screen_project() {

    if (one_already_big) {

        document.querySelectorAll('.project').forEach((project, index) => {

            if (is_big[index]) {
                project.click();
            }
        });
    }
    
}

function move() {
    document.querySelectorAll('.project').forEach((project, index) => {

        let angle = index * (360 / document.querySelectorAll('.project').length) - 90;  
        
        let project_default_height = window.innerHeight * 0.15;
        let project_default_width = window.innerWidth * 0.15;

        let center_circle = document.getElementById('center-project-circle');
        let bottom_box = document.getElementById('bottom-contener');
        
        let center_circle_radius = center_circle.offsetWidth / 2;
        let distance_from_circle = bottom_box.offsetHeight * 0.31; 

        function placeRectangle() {
            const x = (center_circle_radius + distance_from_circle) * Math.cos(angle * Math.PI / 180);
            const y = (center_circle_radius + distance_from_circle) * Math.sin(angle * Math.PI / 180);
            project.style.left = `${x + center_circle.offsetLeft + center_circle_radius - project_default_width / 2}px`;
            project.style.top = `${y + center_circle.offsetTop + center_circle_radius - project_default_height / 2}px`;
        }

        placeRectangle();

        if (is_big[index]) {
            project.style.left = `${center_circle.offsetLeft + center_circle_radius - project_default_width / 2}px`;
            project.style.top = `${center_circle.offsetTop + center_circle_radius - project_default_height / 2}px`;
        }
    });
}

move();

document.querySelectorAll('.project').forEach((project, index) => {
    let angle = index * (360 / document.querySelectorAll('.project').length) - 90;  

    project.addEventListener('click', function() {

        event.stopPropagation();
        let is_animating = true;
        let distance_from_center;
        let move_speed = 30;

        let project_default_height = window.innerHeight * 0.15;
        let project_default_width = window.innerWidth * 0.15;
        
        let center_circle = document.getElementById('center-project-circle');
        let bottom_box = document.getElementById('bottom-contener');
        let center_circle_radius = center_circle.offsetWidth / 2;
        let distance_from_circle = bottom_box.offsetHeight * 0.31;

        if ((one_already_big == 0) || (is_big[index])) {
            is_big[index] = (is_big[index] == 0);
            one_already_big = (one_already_big == 0);
            project.style.zIndex = 2 * is_big[index];

            if (is_big[index]) {
                distance_from_center = distance_from_circle + center_circle_radius;
            } else {
                distance_from_center = 0;
            }

            function move_project() {
                if (is_big[index]) {
                    distance_from_center -= move_speed;
                } else {
                    distance_from_center += move_speed;
                }

                if (distance_from_center < 0) {
                    distance_from_center = 0;
                    is_animating = false;
                } else if (distance_from_center > distance_from_circle + center_circle_radius) {
                    distance_from_center = distance_from_circle + center_circle_radius;
                    is_animating = false;
                }

                const x = distance_from_center * Math.cos(angle * Math.PI / 180);
                const y = distance_from_center * Math.sin(angle * Math.PI / 180);
                project.style.left = `${x + center_circle.offsetLeft + center_circle_radius - project_default_width / 2}px`;
                project.style.top = `${y + center_circle.offsetTop + center_circle_radius - project_default_height / 2}px`;

                if (is_animating) {
                    requestAnimationFrame(move_project);
                }
            }

            move_project();

            if (is_big[index]) {
                project.style.transform = "scale(5.7)";
                project.style.querySelectorAll




            } else {
                project.style.opacity = 1;
                project.style.transform = "scale(1)";
            }
        }

        document.getElementsByClassName('project')[index].classList.toggle('active');
        
    });

    
});





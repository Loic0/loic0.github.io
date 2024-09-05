
let is_big = [0, 0, 0, 0, 0, 0]
let one_already_big = 0;

document.querySelectorAll('.project').forEach((project, index) => {
    let angle = index * 60;  

    const project_default_height = window.innerHeight * 0.15;
    const project_default_width = window.innerWidth * 0.15;
    
    const center_circle = document.getElementById('center-project-circle');
    const center_circle_radius = center_circle.offsetWidth / 2;
    const distance_from_circle = window.innerHeight * 0.30; 
    function placeRectangle() {
        const x = (center_circle_radius + distance_from_circle) * Math.cos(angle * Math.PI / 180);
        const y = (center_circle_radius + distance_from_circle) * Math.sin(angle * Math.PI / 180);
        project.style.left = `${x + center_circle.offsetLeft + center_circle_radius - project_default_width / 2}px`;
        project.style.top = `${y + center_circle.offsetTop + center_circle_radius - project_default_height / 2}px`;
    }
    placeRectangle();

    project.addEventListener('click', function() {
        let is_animating = true;
        let distance_from_center;
        let move_speed = 30;


        if ((one_already_big == 0) || (is_big[index])) {
            
            is_big[index] = (is_big[index] == 0);
            one_already_big = (one_already_big == 0);
            project.style.zIndex = 2 * is_big[index];

            if (is_big[index]) {
                distance_from_center = distance_from_circle + center_circle_radius;
            }
            else {
                distance_from_center = 0;
            }
            

            function move_project() {


                if (is_big[index]) {
                    distance_from_center -= move_speed;
                }
                else {
                    distance_from_center += move_speed;
                }
                
                if (distance_from_center < 0) {
                    distance_from_center = 0;
                    is_animating = false;
                }
                else if (distance_from_center > distance_from_circle + center_circle_radius) {
                    distance_from_center = distance_from_circle + center_circle_radius;
                    is_animating = false;
                }

                
                const x = (distance_from_center) * Math.cos(angle * Math.PI / 180);
                const y = (distance_from_center) * Math.sin(angle * Math.PI / 180);
                project.style.left = `${x + center_circle.offsetLeft + center_circle_radius - project_default_width / 2}px`;
                project.style.top = `${y + center_circle.offsetTop + center_circle_radius - project_default_height / 2}px`;

                if (is_animating) {
                    requestAnimationFrame(move_project);
                }
            }

            move_project();

            if (is_big[index]) {
                project.style.opacity = 0.9
                project.style.transform = "scale(5.7)"
            }
            else {
                project.style.opacity = 1
                project.style.transform = "scale(1)"
            }

        }
        
    });

    
});

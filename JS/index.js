'use strict';

// Parráfos ocultos.
function mostrarOculto() {
    let textoOculto = document.querySelector('.texto-oculto');
    let botonMostrar = document.getElementById('mostrarTexto');

    if (textoOculto.classList.contains('oculto')) {
        textoOculto.classList.remove('oculto');
        botonMostrar.innerHTML = 'Mostrar menos';
    } else {
        textoOculto.classList.add('oculto');
        botonMostrar.innerHTML = 'Mostrar más';
    }
}

let userAdmin = {email: "admin@admin.com", contraseña: "Admin1234"};
let stateSesion = JSON.parse(sessionStorage.getItem("EstadoDeSesion")) || false;
let user = JSON.parse(sessionStorage.getItem("userActivo")) || "";
let linkAdmin = document.getElementById("linkAdmin");
let userBtn = document.getElementById("userBtn");
let exitBtn = document.getElementById("exitBtn");


const closeSesion = () => {
    if (stateSesion) {
        stateSesion = false;
        sessionStorage.setItem("EstadoDeSesion", JSON.stringify(stateSesion))
        localStorage.removeItem("user")
        window.location.replace("index.html")
    } else {
        window.location.reload();
    }
}

if (stateSesion) {
    if (user.email === userAdmin.email &&
        user.contraseña === userAdmin.contraseña) {
        linkAdmin.className = "nav-link btn btn-light"
        exitBtn.className = "btn"
        userBtn.className = "btn-user btn"
        userBtn.innerHTML = "Admin"
        userBtn.removeAttribute("href");
        exitBtn.addEventListener("click", closeSesion);
    } else {
        exitBtn.className = "btn text-ligth"
        userBtn.className = "btn-user btn text-ligth"
        userBtn.innerHTML = user.userNombreUsuario;
        userBtn.removeAttribute("href")
        exitBtn.addEventListener("click", closeSesion);
    }
}

// efecto de fondo.

particlesJS(
    {
        "particles": {
            "number": {
                "value": 180,
                "density": {
                    "enable": true,
                    "value_area": 500
                }
            },
            "color": {
                "value": "#fff"
            },
            "shape": {
                "type": "star",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 1,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 4,
                    "size_min": 0.3,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 600
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": true,
                    "mode": "repulse"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 250,
                    "size": 0,
                    "duration": 2,
                    "opacity": 0,
                    "speed": 3
                },
                "repulse": {
                    "distance": 400,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    }
);

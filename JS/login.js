'use strict';
/*const registroForm = document.getElementById('formRegistro');
registroForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('idNombre').value;
    const email = document.getElementById('idEmail').value;
    const contraseña = document.getElementById('idContraseña').value;

    const Usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const userRegistrado = Usuarios.find(usuario => usuario.email === email)

    if (userRegistrado) {
        return alert('El usuario ya esta registrado');
    } else {

    Usuarios.push({
        nombre: nombre,
        email: email,
        contraseña: contraseña
    });
}
    localStorage.setItem('usuarios', JSON.stringify(Usuarios));
    alert('Registrado');
    

    $('#modalLogin').modal('show');
});
*/



// Login
/*
const loginForm = document.getElementById('formLogin');
loginForm.addEventListener('submit', (e) => {   
    e.preventDefault();

    const nombre = document.getElementById('idUsuarioLogin').value
    const contraseña = document.getElementById('idContraseñaLogin').value

    const Usuarios = JSON.parse(localStorage.getItem('Usuarios')) || [];
    const userValidado = Usuarios.find(usuario => usuario.nombre === nombre && usuario.contraseña === contraseña)

    if (!userValidado) {
        return alert('usuario o contraseña incorrectos')
    } 


    alert(`Bienvendio ${userValidado.nombre}`)
    
    window.location.href = 'index.html'

})
*/


// Script para animacion de formularios login y register

document.getElementById('btn-registrarse').addEventListener('click', register);
document.getElementById('btn-iniciar-sesion').addEventListener('click', iniciarSesion);
window.addEventListener('resize', anchoPag);

let formLoginRegister = document.getElementById('login-register');
let formularioLogin = document.getElementById('formulario-login');
let formularioRegister = document.getElementById('formulario-register');
let cajaTraseraLogin = document.getElementById('cajaLogin');
let cajaTraseraRegister = document.getElementById('cajaRegister');



function anchoPag() {

    if (window.innerWidth > 850) {
        cajaTraseraLogin.style.display = "block";
        cajaTraseraRegister.style.display = "block";
    }else {
        cajaTraseraRegister.style.display = "block";
        cajaTraseraRegister.style.opacity = "1";
        cajaTraseraLogin.style.display = "none";
        formularioLogin.style.display = "block";
        formularioRegister.style.display = "none";
        formLoginRegister.style.left = "0px";
    }
}

anchoPag();


function register() {
    if (window.innerWidth > 850) {
        formularioRegister.style.display = "block";
        formLoginRegister.style.left = "410px";
        formularioLogin.style.display = "none";
        cajaTraseraRegister.style.opacity = "0";
        cajaTraseraLogin.style.opacity = "1";
    } else {
        formularioRegister.style.display = "block";
        formLoginRegister.style.left = "0px";
        formularioLogin.style.display = "none";
        cajaTraseraRegister.style.display = "none";
        cajaTraseraLogin.style.display = "block";
        cajaTraseraLogin.style.opacity = "1";
    }
    

}

function iniciarSesion() {

    if (window.innerWidth > 850) {
        formularioRegister.style.display = "none";
        formLoginRegister.style.left = "10px";
        formularioLogin.style.display = "block";
        cajaTraseraRegister.style.opacity = "1";
        cajaTraseraLogin.style.opacity = "0";
    } else {
        formularioRegister.style.display = "none";
        formLoginRegister.style.left = "0px";
        formularioLogin.style.display = "block";
        cajaTraseraRegister.style.display = "block";
        cajaTraseraLogin.style.display = "none";
    }

}

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
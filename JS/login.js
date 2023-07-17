'use strict';

let adminUser = {email: "admin@admin.com", contraseña: "Admin1234", admin: "true"};

const registroForm = document.getElementById('formulario-register');
const formLogin = document.getElementById('formulario-login');
const btnInicio = document.getElementById('btnLogin');
let inicioSesion = false;



// Función para validar ingreso al botón Ingresar
const ingresoUser = (e) => {
    e.preventDefault();

    let inputEmailLogin = document.getElementById('inputEmailLogin');
    let inputContraseñaLogin = document.getElementById('inputContraseñaLogin');

    if (inputEmailLogin.value === adminUser.email && inputContraseñaLogin.value === adminUser.contraseña) {
        // Código para administrador
        inicioSesion = true;
        sessionStorage.setItem("EstadoDeSesion", JSON.stringify(inicioSesion));
        localStorage.setItem("adminUser", JSON.stringify(adminUser));
        sessionStorage.setItem("userActivo", JSON.stringify(adminUser));

        Swal.fire({
            icon: 'success',
            title: 'Bienvenido Admin!',
            text: 'Iniciando sesión...',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
        }).then(() => {
            window.location.replace('index.html');
        });
        return;
    } else {
        const Usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const resultado = Usuarios.find(
            (user) =>
                user.userEmailRegister === inputEmailLogin.value &&
                user.userContraseñaRegister === inputContraseñaLogin.value
        );

        if (resultado !== undefined) {
            // Código para usuario común
            inicioSesion = true;
            sessionStorage.setItem("EstadoDeSesion", JSON.stringify(inicioSesion));
            localStorage.setItem("userComun", JSON.stringify(resultado));
            sessionStorage.setItem("userActivo", JSON.stringify(resultado));

            Swal.fire({
                icon: 'success',
                title: 'Bienvenido Usuario!',
                text: 'Iniciando sesión...',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            }).then(() => {
                window.location.replace('index.html');
            });
        } else {
            // Código para email o contraseña incorrectos
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Email o contraseña incorrectos!',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            }).then(() => {
                window.location.reload();
            });
        }
    }

    if (inputEmailLogin.value === "" || inputContraseñaLogin.value === "") {
        // Código para campos incompletos
        Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: 'Completa los campos!',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
        });
    }
};


btnInicio.addEventListener('click', ingresoUser);


// Validar acceso a la página admin.html
if (window.location.href.includes("admin.html")) {
    const adminUser = JSON.parse(localStorage.getItem('adminUser'));
    if (!adminUser) {
        window.location.href = "index.html";
    }
}


// Registro de usuarios
registroForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userNombreCompleto = document.getElementById('inputNombreCompleto').value;
    const userEmailRegister = document.getElementById('inputEmail').value;
    const userNombreUsuario = document.getElementById('inputUser').value;
    const userContraseñaRegister = document.getElementById('inputContraseña').value;

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValido.test(userEmailRegister)) {
        return Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingresa un email válido.'
        });
    }

    // Validación de la contraseña
    if (userContraseñaRegister.length < 6 || userContraseñaRegister.length > 8) {
        return Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La contraseña debe tener entre 6 y 8 caracteres.'
        });
    }

    const Usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const userRegistrado = Usuarios.find(usuario => usuario.userEmailRegister === userEmailRegister);

    if (userRegistrado) {
        return Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El usuario ya está registrado'
        });
    } else {
        Usuarios.push({
            userNombreCompleto: userNombreCompleto,
            userEmailRegister: userEmailRegister,
            userNombreUsuario: userNombreUsuario,
            userContraseñaRegister: userContraseñaRegister
        });
    }

    localStorage.setItem('usuarios', JSON.stringify(Usuarios));

    Swal.fire({
        icon: 'success',
        title: 'Registrado',
        text: 'Usuario registrado exitosamente.',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
    }).then(() => {
        window.location.href = 'login.html';
    });
});




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
};

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

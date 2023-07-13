'use strict';

let adminUser = {email: "admin@admin.com", contraseña: "Admin1234"};

const registroForm = document.getElementById('formulario-register');
const formLogin = document.getElementById('formulario-login');
const btnInicio = document.getElementById('btnLogin');
let inicioSesion = false;

// Función para validar ingreso al botón Ingresar
const ingresoUser = (e) => {
    e.preventDefault();

    let parrafoError = document.getElementById('parrafoError');
    let inputEmailLogin = document.getElementById('inputEmailLogin');
    let inputContraseñaLogin = document.getElementById('inputContraseñaLogin');

    if (inputEmailLogin.value === adminUser.email &&
        inputContraseñaLogin.value === adminUser.contraseña) {
        inicioSesion = true;
        parrafoError.innerHTML = `<p class="text-center text-succes text-uppercase">${"Bienvenido Admin!"}</p>`;

        sessionStorage.setItem("EstadoDeSesion", JSON.stringify(inicioSesion));
        localStorage.setItem("adminUser", JSON.stringify(adminUser));
        sessionStorage.setItem("userActivo", JSON.stringify(adminUser));

        window.setTimeout(function(){
            window.location.replace('index.html');
        }, 2000);
        return;
    } else {
        const Usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const resultado = Usuarios.find(
            (user) =>
                user.userEmailRegister === inputEmailLogin.value &&
                user.userContraseñaRegister === inputContraseñaLogin.value
        );

        if (resultado !== undefined) {
            inicioSesion = true;
            parrafoError.innerHTML = `<p class="text-center text-succes text-uppercase">${"Bienvenido Usuario!"}</p>`;
            sessionStorage.setItem("EstadoDeSesion", JSON.stringify(inicioSesion));
            localStorage.setItem("userComun", JSON.stringify(resultado));
            sessionStorage.setItem("userActivo", JSON.stringify(resultado));
            window.setTimeout(function (){
                window.location.replace('index.html')
            }, 2000)
        } else {
            parrafoError.innerHTML = `<p class="text-center text-succes text-uppercase">${"Email o contraseña incorrectos!"}</p>`;
            window.setTimeout(function(){
                window.location.reload();
            }, 2000);
        }

        if (inputEmailLogin.value === "" || inputContraseñaLogin.value === "") {
            parrafoError.innerHTML = `<p class="text-center text-succes text-uppercase">${"Completa los campos!"}</p>`;
        }
    }
};

btnInicio.addEventListener('click', ingresoUser);

// Registro de usuarios
registroForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userNombreCompleto = document.getElementById('inputNombreCompleto').value;
    const userEmailRegister = document.getElementById('inputEmail').value;
    const userNombreUsuario = document.getElementById('inputUser').value;
    const userContraseñaRegister = document.getElementById('inputContraseña').value;

    const Usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const userRegistrado = Usuarios.find(usuario => usuario.userEmailRegister === userEmailRegister);

    if (userRegistrado) {
        return alert('El usuario ya está registrado');
    } else {
        Usuarios.push({
            userNombreCompleto: userNombreCompleto,
            userEmailRegister: userEmailRegister,
            userNombreUsuario: userNombreUsuario,
            userContraseñaRegister: userContraseñaRegister
        });
    }

    localStorage.setItem('usuarios', JSON.stringify(Usuarios));
    alert('Registrado');
    window.location.href = 'login.html';
});


let userAdmin = {email: "admin@admin.com", contraseña: "Admin1234"};
let stateSesion = JSON.parse(sessionStorage.getItem("EstadoDeSesion")) || false;
let user = JSON.parse(sessionStorage.getItem("userActivo")) || "";
let linkAdmin = document.getElementById("linkAdmin");
let userBtn = document.getElementById("userBtn");
let exitBtn = document.getElementById("exitBtn");

if (stateSesion) {
    if (user.email === userAdmin.email &&
        user.contraseña === userAdmin.contraseña) {
        linkAdmin.className = "nav-link btn btn-ligh"
        exitBtn.className = "btn text-ligth"
        userBtn.className = "btn-user btn text-ligth"
        userBtn.removeAttribute("href");
        exitBtn.addEventListener("click", closeSesion);
    } else {
        exitBtn.className = "btn text-ligth"
        userBtn.className = "btn-user btn text-ligth"
        userBtn.innerHTML = user.nombre;
        userBtn.removeAttribute("href")
        exitBtn.addEventListener("click", closeSesion);
    }
}

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

// particlesJS(
//     {
//         "particles": {
//             "number": {
//                 "value": 180,
//                 "density": {
//                     "enable": true,
//                     "value_area": 500
//                 }
//             },
//             "color": {
//                 "value": "#fff"
//             },
//             "shape": {
//                 "type": "star",
//                 "stroke": {
//                     "width": 0,
//                     "color": "#000000"
//                 },
//                 "polygon": {
//                     "nb_sides": 5
//                 },
//                 "image": {
//                     "src": "img/github.svg",
//                     "width": 100,
//                     "height": 100
//                 }
//             },
//             "opacity": {
//                 "value": 1,
//                 "random": true,
//                 "anim": {
//                     "enable": true,
//                     "speed": 1,
//                     "opacity_min": 0,
//                     "sync": false
//                 }
//             },
//             "size": {
//                 "value": 3,
//                 "random": true,
//                 "anim": {
//                     "enable": false,
//                     "speed": 4,
//                     "size_min": 0.3,
//                     "sync": false
//                 }
//             },
//             "line_linked": {
//                 "enable": false,
//                 "distance": 150,
//                 "color": "#ffffff",
//                 "opacity": 0.4,
//                 "width": 1
//             },
//             "move": {
//                 "enable": true,
//                 "speed": 1,
//                 "direction": "none",
//                 "random": true,
//                 "straight": false,
//                 "out_mode": "out",
//                 "bounce": false,
//                 "attract": {
//                     "enable": false,
//                     "rotateX": 600,
//                     "rotateY": 600
//                 }
//             }
//         },
//         "interactivity": {
//             "detect_on": "canvas",
//             "events": {
//                 "onhover": {
//                     "enable": true,
//                     "mode": "bubble"
//                 },
//                 "onclick": {
//                     "enable": true,
//                     "mode": "repulse"
//                 },
//                 "resize": true
//             },
//             "modes": {
//                 "grab": {
//                     "distance": 400,
//                     "line_linked": {
//                         "opacity": 1
//                     }
//                 },
//                 "bubble": {
//                     "distance": 250,
//                     "size": 0,
//                     "duration": 2,
//                     "opacity": 0,
//                     "speed": 3
//                 },
//                 "repulse": {
//                     "distance": 400,
//                     "duration": 0.4
//                 },
//                 "push": {
//                     "particles_nb": 4
//                 },
//                 "remove": {
//                     "particles_nb": 2
//                 }
//             }
//         },
//         "retina_detect": true
//     }
// );
'use strict';

let adminUser = {email: "admin@admin.com", contraseña: "Admin1234", admin: "true"};

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
        parrafoError.innerHTML = `<p class="text-center text-success text-uppercase mt-3">${"Bienvenido Admin!"}</p>`;

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
            parrafoError.innerHTML = `<p class="text-center text-success text-uppercase mt-3">${"Bienvenido Usuario!"}</p>`;
            sessionStorage.setItem("EstadoDeSesion", JSON.stringify(inicioSesion));
            localStorage.setItem("userComun", JSON.stringify(resultado));
            sessionStorage.setItem("userActivo", JSON.stringify(resultado));
            window.setTimeout(function (){
                window.location.replace('index.html')
            }, 2000)
        } else {
            parrafoError.innerHTML = `<p class="text-center text-danger text-uppercase mt-3">${"Email o contraseña incorrectos!"}</p>`;
            window.setTimeout(function(){
                window.location.reload();
            }, 2000);
        }

        if (inputEmailLogin.value === "" || inputContraseñaLogin.value === "") {
            parrafoError.innerHTML = `<p class="text-center text-warning text-uppercase mt-3">${"Completa los campos!"}</p>`;
        }
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
        return alert('Por favor, ingresa un email válido.');
    }

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

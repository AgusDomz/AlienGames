'use strict';
const registroForm = document.getElementById('formRegistro');
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



// Login
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
"use strict";
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
        linkAdmin.className = "nav-link btn btn-ligh"
        exitBtn.className = "btn text-ligth"
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



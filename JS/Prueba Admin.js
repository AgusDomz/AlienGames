

const cuerpoTabla = document.getElementById('usuarios');
const myModal = new bootstrap.Modal(document.getElementById('modalUsuario'));
let usuariosUpdate = null;

let usuarios = [];


// Cargar Usuarios
const cargarUsuariosLS = () => {

    const usuariosStorage = localStorage.getItem('usuarios');
    usuarios = JSON.parse(usuariosStorage);

};


// Almacenar Usuarios
const almacenarUsuariosLS = () => {

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}





window.mostrarModal = (codigo) => {

    codigoUpdate = codigo;
    let index = codigo.findIndex((item) => item.codigo == codigoUpdate);
    document.getElementById('idNombreModal').value = codigo[index].nombre;
    document.getElementById('idEmailModal').value = codigo[index].email;
    document.getElementById('idContraseñaModal').value = codigo[index].contraseña;

    myModal.show();
};




const cargarTabla = () => {

    userTableBody.innerHTML = "";

    usuarios.map((item) => {

        const fila = document.createElement('tr');



        const celdas = `
        <tr>
            <td>${item.nombre}</td>
            <td>${item.email}</td>
            <td>${item.contraseña}</td>
            <td>
                <div class="d-flex gap-3 justify-content-center">
                    <button class="btn btn-outline-danger" onclick="borrarJuego(${item.codigo})"><i class="fa-solid fa-trash fa-beat-fade"></i></button>
                </div>
            </td> 
        </tr>
        `


        fila.innerHTML = celdas;
        userTableBody.append(fila)
    });
};


// Funcion para eliminar un usuario
window.borrarJuego = (contraseña) => {
    let index = usuarios.findIndex((item) => item.contraseña == contraseña);

    // Alert Copado
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons
        .fire({
            title: 'Estas seguro/a?',
            text: "Mira que es un juegazo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, borralo!',
            cancelButtonText: 'No, me lo quedo!',
            reverseButtons: true
        })
        .then((result) => {
            if (result.isConfirmed) {
                usuarios.splice(index, 1);
                cargarTabla();
                almacenarUsuariosLS();

                swalWithBootstrapButtons.fire({
                    title: 'Borrado!',
                    text: 'GAME OVER.',
                    icon: 'success'
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: 'Cancelado!',
                    text: 'Hiciste bien joven Padawan :)',
                    icon: 'error'
                });
            }
        });
};















cargarUsuariosLS();
cargarTabla();


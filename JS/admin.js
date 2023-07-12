'use strict';
import { Juego } from "../JS/clases.js";



const cuerpoTabla = document.getElementById('cuerpoTabla');
const myModal = new bootstrap.Modal(document.getElementById('modalJuego'));

let codigoUpdate = null;

let datos = [];

const cargarDatosLS = () => {

    const datosStorage = localStorage.getItem('datos');
    datos = datosStorage ? JSON.parse(datosStorage) : [];

};

const almacenarDatosLS = () => {

    localStorage.setItem('datos', JSON.stringify(datos));
}



window.mostrarModal = (codigo) => {

    codigoUpdate = codigo;
    let index = datos.findIndex((item) => item.codigo == codigoUpdate);

    document.getElementById('idCodigoModal').value = datos[index].codigo;
    document.getElementById('idNombreModal').value = datos[index].nombre;
    document.getElementById('idCategoriaModal').value = datos[index].categoria;
    document.getElementById('idDescripcionModal').value = datos[index].descripcion;
    document.getElementById('idPublicadoModal').value = datos[index].publicado;

    myModal.show();
};


// Funcion para editar un juego
const actualizarJuego = (e) => {
    e.preventDefault();
    let index = datos.findIndex((item) => item.codigo == codigoUpdate);

    datos[index].codigo = document.getElementById('idCodigoModal').value;
    datos[index].nombre = document.getElementById('idNombreModal').value;
    datos[index].categoria = document.getElementById('idCategoriaModal').value;
    datos[index].descripcion = document.getElementById('idDescripcionModal').value;
    datos[index].publicado = document.getElementById('idPublicadoModal').checked;

    cargarTabla();
    almacenarDatosLS();
    myModal.hide();
};



// Funcion para actualizar la tabla con los contenidos agregados
const cargarTabla = () => {

    cuerpoTabla.innerHTML = "";

    datos.map((item) => {

        const fila = document.createElement('tr');



        const celdas = `
        <tr>
            <th>${item.codigo}</th>
            <td>${item.nombre}</td>
            <td>${item.categoria}</td>
            <td>${item.descripcion}</td>
            <td>
                <div>
                    <input class="form-check-input" type="checkbox" onchange="actualizarEstado(${item.codigo})" ${item.publicado ? 'checked' : ''}>
                </div>
            </td>
            <td>
                <div class="d-flex gap-3 justify-content-center">
                    <button class="btn btn-outline-warning" onclick="mostrarModal(${item.codigo})"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button class="btn btn-outline-danger" onclick="borrarJuego(${item.codigo})"><i class="fa-solid fa-trash fa-beat-fade"></i></button>
                </div>
            </td> 
        </tr>
        `


        fila.innerHTML = celdas;
        cuerpoTabla.append(fila)
    });
};


// Funcion para agregar un juego
const agregarJuego = (e) => {
    e.preventDefault();

    let nombre = document.getElementById("idNombre").value;
    let categoria = document.getElementById("idCategoria").value;
    let descripcion = document.getElementById("idDescripcion").value;
    let publicado = document.getElementById("idPublicado").checked;

    let nuevoCodigo;
    let codigoExistente = true;

    while (codigoExistente) {
        nuevoCodigo = Math.floor(Math.random() * 10000);
        codigoExistente = datos.some((item) => item.codigo === nuevoCodigo);
    }

    datos.push(new Juego(nuevoCodigo, nombre, categoria, descripcion, publicado));

    document.getElementById("idForm").reset();

    cargarTabla();
    almacenarDatosLS();

    let modalAgregar = document.getElementById("exampleModal");
    let bootstrapModal = bootstrap.Modal.getInstance(modalAgregar);
    bootstrapModal.hide();


    // Alert Copado
    Swal.fire({
        icon: 'success',
        title: 'Juego agregado',
        text: 'El juego se ha agregado a la base de datos.',
        timer: 2000,
        timerProgressBar: false,
        showConfirmButton: false
    });
};


// Funcion para eliminar un juego
window.borrarJuego = (codigo) => {
    let index = datos.findIndex((item) => item.codigo == codigo);


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
                datos.splice(index, 1);
                cargarTabla();
                almacenarDatosLS();

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




cargarDatosLS();
cargarTabla();


document.getElementById('idForm').addEventListener('submit', agregarJuego);
document.getElementById('idFormModal').addEventListener('submit', actualizarJuego);

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
                "value": "#00ff00"
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
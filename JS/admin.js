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


const actualizarJuego = (e) => {
    e.preventDefault();
    let index = datos.findIndex((item) => item.codigo == codigoUpdate);

    datos[index].codigo = document.getElementById('idCodigoModal').value;
    datos[index].nombre = document.getElementById('idNombreModal').value;
    datos[index].categoria = document.getElementById('idCategoriaModal').value;
    datos[index].descripcion = document.getElementById('idDescripcionModal').value;
    datos[index].publicado = document.getElementById('idPublicadoModal').value;

    cargarTabla();  
    almacenarDatosLS();
    myModal.hide();
};

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
            <td>${item.publicado}</td>
            <td>
                <div class="d-flex gap-2">
                    <button class="btn btn-outline-warning" onclick="mostrarModal(${item.codigo})">Editar</button>
                    <button class="btn btn-outline-danger" onclick="borrarJuego(${item.codigo})">Borrar</button>
                </div>
            </td> 
        </tr>
        `

        fila.innerHTML = celdas;
        cuerpoTabla.append(fila)
    });
};


const agregarJuego = (e) => {
    e.preventDefault();

    let codigo = document.getElementById('idCodigo').value
    let nombre = document.getElementById('idNombre').value
    let categoria = document.getElementById('idCategoria').value
    let descripcion = document.getElementById('idDescripcion').value
    let publicado = document.getElementById('idPublicado').value


    datos.push(new Juego(codigo, nombre, categoria, descripcion, publicado))

    document.getElementById('idForm').reset();

    cargarTabla();
    almacenarDatosLS();
};


window.borrarJuego = (codigo) => {

    let index = datos.findIndex((item) => item.codigo == codigo)

    let validar = confirm(`Estas seguro/a que deseas eliminar ${datos[index].nombre}?, es un juegazo...`);

    if (validar) {
        datos.splice(index, 1);
        cargarTabla();
        almacenarDatosLS();
    }
};

cargarDatosLS();
cargarTabla();


document.getElementById('idForm').addEventListener('submit', agregarJuego);
document.getElementById('idFormModal').addEventListener('submit', actualizarJuego);
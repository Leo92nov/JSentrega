let usuariosRecuperados = localStorage.getItem("arrayDeUsuarios")
let Usuarios = JSON.parse(usuariosRecuperados)
let totalinversion

const usuarioOn = localStorage.getItem("usuarioOn");
const usuarioLoggeado = JSON.parse(usuarioOn);

const carterasJSON = localStorage.getItem("arrayDeCarteras");
const Carteras = JSON.parse(carterasJSON);

let OrdenesJSON = localStorage.getItem("arrayDeOrdenes");
let Ordenes = JSON.parse(OrdenesJSON);

const indexUsuario = Usuarios.findIndex(usuario => usuario.nombreUsuario === usuarioLoggeado.nombreUsuario);

const OrdenesOn = Ordenes[indexUsuario]

function mostrarOrdenes(OrdenesOn){
    
    const contenedorOrdenes = document.getElementById("divMisOrdenes")

    OrdenesOn.forEach(e =>{
        const ordenes = document.createElement("section")
        ordenes.classList.add("sectionMisOrdenes")
        ordenes.style.borderBottom = "1px solid grey";

        ordenes.innerHTML = `
            <section>${e.Nombre}</section>
            <section>${e.ticker}</section>
            <section>$${e.precio}</section>
            <section>${e.cantidad}</section>
            <section class="ordenesUsuario">${e.orden}</section>
           
        `
    
        contenedorOrdenes.appendChild(ordenes);

        const tipoOrden = ordenes.querySelector(".ordenesUsuario");
        if (e.orden === "compra") {
            tipoOrden.style.color = "green";
        } else if (e.orden === "venta") {
            tipoOrden.style.color = "red";
        }
    });
}



const colorOrdenes = document.getElementsByClassName("ordenesUsuario")


if (OrdenesOn && OrdenesOn.length > 0) {
    mostrarOrdenes(OrdenesOn);
} else {
    const ordenesVacia = document.createElement("section");
    ordenesVacia.classList.add("noHayOrdenes");
    ordenesVacia.innerHTML = `<span>No existen órdenes que mostrar</span>`;
    contenedorOrdenes.appendChild(ordenesVacia);
}



const CarteraOn = Carteras[indexUsuario]

function mostrarInversiones(CarteraOn){

    const contenedorInversiones = document.getElementById("divInversiones");

    CarteraOn.forEach((e) => {
        const lineas = document.createElement("section");
        lineas.classList.add("sectionInversion")
        lineas.style.borderBottom = "1px solid grey";

        lineas.innerHTML = `
            <section>${e.Nombre}</section>
            <section>${e.ticker}</section>
            <section>$${e.precio}</section>
            <section>${e.cantidad}</section>
            <section>$${e.cantidad * e.precio}</section>
            <section class="inversionesVenderComprar"><a href="./ordenes.html" class="inversionesComprar">Comprar</a><a href="./ordenes.html" class="inversionesVender">Vender</a></section>
        `;

        contenedorInversiones.appendChild(lineas);
    });
}

const MiCartera = mostrarInversiones(CarteraOn);
const totalInversion = CarteraOn.reduce((acumulador, e) => {
    return acumulador + (e.cantidad * e.precio);
}, 0);

const totalInversiones = document.getElementById("spanTotalInvertido")
 totalInversiones.innerText = "$" + totalInversion
 

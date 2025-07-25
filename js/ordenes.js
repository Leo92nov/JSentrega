let usuarioJSON = localStorage.getItem("usuarioOn");
let usuarioLoggeado = JSON.parse(usuarioJSON);


let arrayDeUsuarios = localStorage.getItem('arrayDeUsuarios')
let usuarios = JSON.parse(arrayDeUsuarios)


let carterasJSON = localStorage.getItem('arrayDeCarteras')
let carteras = JSON.parse(carterasJSON)

let carteraJSON = localStorage.getItem("carteraOn");
let carteraOn = JSON.parse(carteraJSON);

let cedearAUtilizar = localStorage.getItem("cedearAUsar")
let cedearAUsar = JSON.parse(cedearAUtilizar)

const OrdenesJSON = localStorage.getItem("arrayDeOrdenes");
const OrdenesTotales = JSON.parse(OrdenesJSON).flat();


const cedearAOperar = document.getElementById("cedearAOperar");
const cedearAOperarNombre = document.getElementById("cedearAOperarNombre");
const cantidadCedearOperar = document.getElementById("cantidadCedearOperar");
const precioCedearOperar = document.getElementById("precioCedearOperar");
const tipoOperacion = document.getElementById("tipoOperacion");
const precioTotalOperar = document.getElementById("precioTotalOperar");
const confirmarOperacion = document.getElementById("confirmarOperacion");
const idOperacion = document.getElementById("idOperacion");

function mostrarMensajeOrdenesNuevas(mensaje, tipo = "error") {
    const errorDePrecioTotal = document.getElementById("errorDePrecioTotal");
    errorDePrecioTotal.textContent = mensaje;

    if (tipo === "ok") {

        errorDePrecioTotal.classList.add("mensaje-ok");
    } else {
        errorDePrecioTotal.classList.add("mensajeError");
    }
}
function errorDeEjecucionOrdenes(mensaje, tipo = "error") {
    const errorDeEjecucionOrdenes = document.getElementById("errorDeEjecucionOrdenes");
    errorDeEjecucionOrdenes.textContent = mensaje;

    if (tipo === "ok") {

        errorDeEjecucionOrdenes.classList.add("mensaje-ok");
    } else {
        errorDeEjecucionOrdenes.classList.add("mensajeError");
    }
}

function actualizarPrecioTotal() {
    let cantidad = parseInt(cantidadCedearOperar.value);
    let precio = parseInt(precioCedearOperar.value);
    let valorTotal = cantidad * precio;
    precioTotalOperar.value = valorTotal;
}

cantidadCedearOperar.addEventListener("input", actualizarPrecioTotal);
precioCedearOperar.addEventListener("input", actualizarPrecioTotal);


function encontrarCedearEnCartera() {
    return carteraOn.find(cedear => cedear.ticker === cedearAOperar.value.trim());
}

let cedearApuntadoCartera = encontrarCedearEnCartera();


let tickerAbuscar = document.getElementById("inputCEDEAR");
let tickersABuscar = document.getElementById("tickersABuscar")

tickerAbuscar.addEventListener("input", () => {
    const busquedaOrden = tickerAbuscar.value.toLowerCase();
    const ordenesVentaCargar = document.getElementById("ordenesVentaCargar");
    const ordenesCompraCargar = document.getElementById("ordenesCompraCargar");
    const idOperacion = document.getElementById("idOperacion");
    ordenesVentaCargar.innerHTML = "";
    ordenesCompraCargar.innerHTML = "";

    tickersABuscar.innerHTML = "";
    if (busquedaOrden === "") {
        return;
    }

    const tickers = OrdenesTotales.filter(orden =>
        orden.ticker.toLowerCase().includes(busquedaOrden) && orden.usuario !== usuarioLoggeado.nombreUsuario);

    tickers.forEach(orden => {
        const li = document.createElement("li");
        li.textContent = orden.ticker;
        tickersABuscar.appendChild(li);

        li.addEventListener("click", () => {
            tickerAbuscar.value = orden.ticker;
            tickersABuscar.innerHTML = "";

            const ordenesFiltradas = OrdenesTotales.filter(orden =>
                orden.ticker === tickerAbuscar.value &&
                orden.usuario !== usuarioLoggeado.nombreUsuario
            );

            ordenesFiltradas.forEach(orden => {
                const ordenes = document.createElement("li");
                ordenes.textContent = orden.ticker;
                ordenes.className = "ordenEnCaja";
                ordenes.innerHTML = `
                    <div>${orden.cantidad}</div>
                    <div>${orden.precio}</div>
                `

                ordenes.addEventListener("click", () => {
                    cedearAOperar.value = orden.ticker;
                    cedearAOperarNombre.value = orden.Nombre;
                    cantidadCedearOperar.value = orden.cantidad;
                    precioCedearOperar.value = orden.precio;
                    tipoOperacion.value = orden.orden;
                    precioTotalOperar.value = orden.precio * orden.cantidad;
                    idOperacion.value = orden.id;
                });
                if (orden.orden === "venta") {
                    ordenesVentaCargar.appendChild(ordenes);
                } else if (orden.orden === "compra") {
                    ordenesCompraCargar.appendChild(ordenes);
                }
            });

        });

    })

})



function actualizarYEliminarOrden(ordenes, id, cantidadARestar) {
    const index = ordenes.findIndex(orden => orden.id === id);
    if (index === -1) return;

    ordenes[index].cantidad -= parseInt(cantidadARestar);

    if (ordenes[index].cantidad <= 0) {
        ordenes.splice(index, 1);
    }
}

function eliminarActivosDeCarteraEnCero(carteraOn, ticker, cantidadARestar) {
    const index = carteraOn.findIndex(activo => activo.ticker === ticker);
    if (index === -1) return;

    carteraOn[index].cantidad -= parseInt(cantidadARestar);

    if (carteraOn[index].cantidad <= 0) {
        carteraOn.splice(index, 1);
    }
}

confirmarOperacion.addEventListener("click", (event) => {

    event.preventDefault();
    let cedearApuntadoCartera = carteraOn.find(cedear => cedear.ticker === cedearAOperar.value.trim());

    if (parseInt(precioTotalOperar.value) > usuarioLoggeado.liquidez) {

        errorDeEjecucionOrdenes("Imposble realizar la operacion, fondos insuficientes");

        return;
    }


    if (!cedearApuntadoCartera && tipoOperacion.value === "venta") {

        usuarioLoggeado.liquidez -= parseInt(precioTotalOperar.value);
        class NuevoCedear {
            constructor(Nombre, ticker, precio, cantidad, usuario) {
                this.Nombre = Nombre,
                    this.ticker = ticker,
                    this.precio = precio,
                    this.cantidad = cantidad,
                    this.usuario = usuario

            }
        }
        const NuevoCedearCartera = new NuevoCedear(cedearAOperarNombre.value, cedearAOperar.value, parseInt(precioCedearOperar.value), parseInt(cantidadCedearOperar.value), usuarioLoggeado.nombreUsuario);


        usuarioLoggeado.liquidez -= parseInt(precioTotalOperar.value);

        const ordenCompletada = OrdenesTotales.find(orden => orden.id === idOperacion.value);
        const usuarioEmisor = usuarios.find(usuario => usuario.nombreUsuario === ordenCompletada.usuario);
        usuarioEmisor.liquidez += parseInt(precioTotalOperar.value);

        let usuariosJSON = JSON.stringify(usuarios);
        localStorage.setItem("arrayDeUsuarios", usuariosJSON);
        let usuarioOn = JSON.stringify(usuarioLoggeado);
        localStorage.setItem("usuarioOn", usuarioOn);

        carteraOn.push(NuevoCedearCartera);

        const carteralog = JSON.stringify(carteraOn);
        localStorage.setItem("carteraOn", carteralog);

        function agruparOrdenesPorUsuario(ordenes) {
            const agrupadas = {};

            ordenes.forEach(orden => {
                if (!agrupadas[orden.usuario]) {
                    agrupadas[orden.usuario] = [];
                }
                agrupadas[orden.usuario].push(orden);
            });

            return Object.values(agrupadas);
        }


        actualizarYEliminarOrden(OrdenesTotales, idOperacion.value, cantidadCedearOperar.value);

        const OrdenesAgrupadas = agruparOrdenesPorUsuario(OrdenesTotales);
        const OrdenesJSON = JSON.stringify(OrdenesAgrupadas);
        localStorage.setItem("arrayDeOrdenes", OrdenesJSON);

        Swal.fire({
            title: "Compra ejecutada con éxito!!",
            icon: "success",
            draggable: true
        }).then(() => {
            window.location.href = "../index.html";
        });

    } else if (cedearApuntadoCartera && tipoOperacion.value === "venta") {

        usuarioLoggeado.liquidez -= parseInt(precioTotalOperar.value);
        cedearApuntadoCartera.cantidad += parseInt(cantidadCedearOperar.value);

        const ordenCompletada = OrdenesTotales.find(orden => orden.id === idOperacion.value);
        const usuarioEmisor = usuarios.find(usuario => usuario.nombreUsuario === ordenCompletada.usuario);
        usuarioEmisor.liquidez += parseInt(precioTotalOperar.value);

        let usuariosJSON = JSON.stringify(usuarios);
        localStorage.setItem("arrayDeUsuarios", usuariosJSON);

        let carteraonJSON = JSON.stringify(carteraOn)
        localStorage.setItem("carteraOn", carteraonJSON)

        let usuarioOn = JSON.stringify(usuarioLoggeado);
        localStorage.setItem("usuarioOn", usuarioOn);


        const CarterasJSON = JSON.stringify(carteras);
        localStorage.setItem("arrayDeCarteras", CarterasJSON);


        function agruparOrdenesPorUsuario(ordenes) {
            const agrupadas = {};

            ordenes.forEach(orden => {
                if (!agrupadas[orden.usuario]) {
                    agrupadas[orden.usuario] = [];
                }
                agrupadas[orden.usuario].push(orden);
            });

            return Object.values(agrupadas);
        }


        actualizarYEliminarOrden(OrdenesTotales, idOperacion.value, cantidadCedearOperar.value);

        const OrdenesAgrupadas = agruparOrdenesPorUsuario(OrdenesTotales);
        const OrdenesJSON = JSON.stringify(OrdenesAgrupadas);
        localStorage.setItem("arrayDeOrdenes", OrdenesJSON);


        Swal.fire({
            title: "Compra ejecutada con éxito!!",
            icon: "success",
            draggable: true
        }).then(() => {
            window.location.href = "../index.html";
        });
    }







    if (!cedearApuntadoCartera && tipoOperacion.value === "compra") {
        mostrarMensajeOrdenesNuevas("No puedes vender un activo que no posees");
        return;
    }

    if (tipoOperacion.value === "compra" && parseInt(cantidadCedearOperar.value) > cedearApuntadoCartera.cantidad) {

        mostrarMensajeOrdenesNuevas("no posees la cantidad de activos suficientes para realizar la operación");
        return;

    } else if (cedearApuntadoCartera && tipoOperacion.value === "compra") {

        usuarioLoggeado.liquidez += parseInt(precioTotalOperar.value);
        cedearApuntadoCartera.cantidad -= parseInt(cantidadCedearOperar.value);

        eliminarActivosDeCarteraEnCero(carteraOn, cedearAOperar.value, cantidadCedearOperar.value);


        const ordenCompletada = OrdenesTotales.find(orden => orden.id === idOperacion.value);
        const usuarioEmisor = usuarios.find(usuario => usuario.nombreUsuario === ordenCompletada.usuario);
        usuarioEmisor.liquidez -= parseInt(precioTotalOperar.value);




        let usuariosJSON = JSON.stringify(usuarios);
        localStorage.setItem("arrayDeUsuarios", usuariosJSON);
        let usuarioOn = JSON.stringify(usuarioLoggeado);
        localStorage.setItem("usuarioOn", usuarioOn);

        const CarterasJSON = JSON.stringify(carteras);
        localStorage.setItem("arrayDeCarteras", CarterasJSON);


        function agruparOrdenesPorUsuario(ordenes) {
            const agrupadas = {};

            ordenes.forEach(orden => {
                if (!agrupadas[orden.usuario]) {
                    agrupadas[orden.usuario] = [];
                }
                agrupadas[orden.usuario].push(orden);
            });

            return Object.values(agrupadas);

        }

        actualizarYEliminarOrden(OrdenesTotales, idOperacion.value, cantidadCedearOperar.value);

        const OrdenesAgrupadas = agruparOrdenesPorUsuario(OrdenesTotales);
        const OrdenesJSON = JSON.stringify(OrdenesAgrupadas);
        localStorage.setItem("arrayDeOrdenes", OrdenesJSON);

        Swal.fire({
            title: "Venta ejecutada con éxito!!",
            icon: "success",
            draggable: true
        }).then(() => {
            window.location.href = "../index.html";
        });
    }
})




let ultimoId = OrdenesTotales[OrdenesTotales.length - 1].id
let usuarioParaNuevaOrden = usuarioLoggeado.nombreUsuario
let cedearOrdenaOperar

const crearOrden = document.getElementById("crearOrden");
const operacionVenta = document.getElementById("operacionVenta");
const operacionCompra = document.getElementById("operacionCompra");
const nombreEmpresaNuevaOrden = document.getElementById("nombreEmpresaNuevaOrden");
const tickerNuevaOrden = document.getElementById("tickerNuevaOrden");
const cantidadNuevaOrden = document.getElementById("cantidadNuevaOrden");
const precioCedearNuevaOrden = document.getElementById("precioCedearNuevaOrden");
const botonRealizarOperacion = document.getElementById("botonRealizarOperacion");
const RresultadosNuevaOrden = document.getElementById("RresultadosNuevaOrden");
const precioTotalCedearOrden = document.getElementById("precioTotalCedearOrden");

let tipoDeOperacion;

if (!cedearAUsar) {
    nombreEmpresaNuevaOrden.value = ""
    tickerNuevaOrden.value = ""
} else {
    nombreEmpresaNuevaOrden.value = cedearAUsar.Nombre
    tickerNuevaOrden.value = cedearAUsar.ticker
}
function mostrarMensajeOrdenesNuevas(mensaje, tipo = "error") {
    const errorDePrecioTotal = document.getElementById("errorDePrecioTotal");
    errorDePrecioTotal.textContent = mensaje;

    if (tipo === "ok") {

        errorDePrecioTotal.classList.add("mensaje-ok");
    } else {
        errorDePrecioTotal.classList.add("mensajeError");
    }
}


operacionCompra.addEventListener("click", () => {
    operacionCompra.classList.add("operacionCompraActiva")
    operacionVenta.classList.remove("operacionVentaActiva")

    if (operacionCompra.classList.contains("operacionCompraActiva")) {
        tipoDeOperacion = "compra"
    }
    return tipoDeOperacion
})

operacionVenta.addEventListener("click", () => {
    operacionVenta.classList.add("operacionVentaActiva")
    operacionCompra.classList.remove("operacionCompraActiva")

    if (operacionVenta.classList.contains("operacionVentaActiva")) {
        tipoDeOperacion = "venta"
    }
    return tipoDeOperacion
})



nombreEmpresaNuevaOrden.addEventListener("input", () => {

    async function mostrarSugerencia() {
        const responseCedear = await fetch('../db/dataCedears.json')
        const sugerido = await responseCedear.json()
        const texto = nombreEmpresaNuevaOrden.value.toLowerCase();

        RresultadosNuevaOrden.innerHTML = "";
        if (texto === "") {
            return
        }

        const sugeridos = sugerido.filter(cedear =>
            cedear.Nombre.toLowerCase().includes(texto)
        )

        sugeridos.forEach(cedear => {
            const lista = document.createElement("li")
            lista.textContent = cedear.Nombre
            lista.addEventListener("click", () => {
                nombreEmpresaNuevaOrden.value = cedear.Nombre
                tickerNuevaOrden.value = cedear.ticker
                RresultadosNuevaOrden.innerHTML = ""

            })
            RresultadosNuevaOrden.appendChild(lista);
        })
    }
    mostrarSugerencia()
});




function precioTotalOrden() {
    let ammount = parseInt(cantidadNuevaOrden.value) || 0;
    let price = parseInt(precioCedearNuevaOrden.value) || 0;
    let totalPrice = ammount * price;

    precioTotalCedearOrden.value = totalPrice;
}


cantidadNuevaOrden.addEventListener("input", precioTotalOrden)
precioCedearNuevaOrden.addEventListener("input", precioTotalOrden)



botonRealizarOperacion.addEventListener("click", () => {
    class NuevaOrden {
        static id = ++ultimoId
        constructor(nombreEmpresaNuevaOrden, tickerNuevaOrden, precioCedearNuevaOrden, cantidadNuevaOrden, tipoDeOperacion, ultimoId, usuarioParaNuevaOrden, precioTotalCedearOrden) {
            this.Nombre = nombreEmpresaNuevaOrden.value,
                this.ticker = tickerNuevaOrden.value,
                this.precio = precioCedearNuevaOrden.value
            this.cantidad = cantidadNuevaOrden.value,
                this.orden = tipoDeOperacion,
                this.precioTotal = precioTotalCedearOrden.value,
                this.id = ultimoId,
                this.usuario = usuarioParaNuevaOrden

        }
    }




    if (nombreEmpresaNuevaOrden.value === "" || tickerNuevaOrden.value === "" || precioCedearNuevaOrden.value === "" || cantidadNuevaOrden.value === "") {
        mostrarMensajeOrdenesNuevas("Todos los campos son obligatorios!!")
        return
    } else if (tipoDeOperacion === undefined) {
        mostrarMensajeOrdenesNuevas("Seleccione el tipo de operacion!!")
        return
    }


    if (tipoDeOperacion === "compra" && usuarioLoggeado.liquidez < precioTotalCedearOrden.value) {

        mostrarMensajeOrdenesNuevas("No posee el dinero suficiente para crear la orden!!")
        return
    }

    let cedearDeOperacionOrden = carteraOn.find(cedear => cedear.ticker === tickerNuevaOrden.value)

    if (tipoDeOperacion === "venta" && cedearDeOperacionOrden === undefined) {
        mostrarMensajeOrdenesNuevas("No posee el activo que intenta vender!!")
        return;
    }

    if (tipoDeOperacion === "venta" && (cedearDeOperacionOrden.cantidad < cantidadNuevaOrden.value)) {
        mostrarMensajeOrdenesNuevas("No posee la cantidad que desea vender!!")
        return
    }


    let nuevaOrdenCreada = new NuevaOrden(nombreEmpresaNuevaOrden, tickerNuevaOrden, precioCedearNuevaOrden, cantidadNuevaOrden, tipoDeOperacion, ultimoId, usuarioParaNuevaOrden, precioTotalCedearOrden)
    OrdenesTotales.push(nuevaOrdenCreada)

    function agruparOrdenesPorUsuario(ordenes) {
        const agrupadas = {};

        ordenes.forEach(orden => {
            if (!agrupadas[orden.usuario]) {
                agrupadas[orden.usuario] = [];
            }
            agrupadas[orden.usuario].push(orden);
        });

        return Object.values(agrupadas);

    }


    const OrdenesAgrupadas = agruparOrdenesPorUsuario(OrdenesTotales);
    const OrdenesJSON = JSON.stringify(OrdenesAgrupadas);
    localStorage.setItem("arrayDeOrdenes", OrdenesJSON);

    let mensajeFinal = tipoDeOperacion === "compra"
        ? "Orden de compra enviada con éxito!!"
        : "Orden de venta enviada con éxito!!";

    Swal.fire({
        title: mensajeFinal,
        icon: "success",
        draggable: true
    }).then(() => {
        window.location.href = "../index.html";
    });

})

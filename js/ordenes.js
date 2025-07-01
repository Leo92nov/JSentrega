let usuariosJSON = localStorage.getItem("arrayDeUsuarios")
let usuarios = JSON.parse(usuariosJSON)
console.log(usuarios);

let carterasJSON = localStorage.getItem("arrayDeCarteras")
carteras = JSON.parse(carterasJSON)
console.log(carteras);

let usuarioJSON = localStorage.getItem("usuarioOn")
let usuarioLoggeado = JSON.parse(usuarioJSON)

console.log(usuarioLoggeado);

const indexUsuario = usuarios.findIndex(usuario => usuario.nombreUsuario === usuarioLoggeado.nombreUsuario);
const carteraON = carteras[indexUsuario]
console.log(carteraON);



const OrdenesJSON = localStorage.getItem("arrayDeOrdenes")
const OrdenesTotales = JSON.parse(OrdenesJSON).flat()

const cedearAOperar = document.getElementById("cedearAOperar")
const cedearAOperarNombre = document.getElementById("cedearAOperarNombre")
const cantidadCedearOperar = document.getElementById("cantidadCedearOperar")
const precioCedearOperar = document.getElementById("precioCedearOperar") 
const tipoOperacion = document.getElementById("tipoOperacion")
const precioTotalOperar = document.getElementById("precioTotalOperar")
const confirmarOperacion = document.getElementById("confirmarOperacion")
const idOperacion = document.getElementById("idOperacion")

console.log(OrdenesTotales);

let cedearABuscar = document.getElementById("inputCEDEAR")
let busqueda = document.getElementById("botonBusquedaCajaDeCPuntas")

busqueda.addEventListener("click", () =>{
    const busquedaOrden = cedearABuscar.value.toLowerCase()
    busqueda.disabled = true;
    const ordenesFiltradas = OrdenesTotales.filter(OrdenesTotales => OrdenesTotales.ticker.toLowerCase().includes(busquedaOrden) && OrdenesTotales.usuario !== usuarioLoggeado.nombreUsuario);
    const ordenesVentaCargar = document.getElementById("ordenesVentaCargar")
    const ordenesCompraCargar = document.getElementById("ordenesCompraCargar")
    const idOperacion = document.getElementById("idOperacion")
    ordenesVentaCargar.innerHTML = ""

    ordenesFiltradas.forEach(orden =>{
        const ordenes = document.createElement("div")
        ordenes.className ="ordenEnCaja"
        ordenes.innerHTML = `
        <div>${orden.cantidad}</div>
        <div>${orden.precio}</div>
        `
        
        if(orden.orden === "venta"){
            ordenesVentaCargar.appendChild(ordenes)
        }else if (orden.orden === "compra") {
            ordenesCompraCargar.appendChild(ordenes)
        }
        
        
        ordenes.addEventListener("click", () => {
            cedearAOperar.value = orden.ticker;
            cedearAOperarNombre.value = orden.Nombre
            cantidadCedearOperar.value = orden.cantidad;
            precioCedearOperar.value = orden.precio;
            tipoOperacion.value = orden.orden;
            precioTotalOperar.value = orden.precio * orden.cantidad
            idOperacion.value = orden.id

        });
    })

})


cedearABuscar.addEventListener("input", () => {
    document.getElementById("ordenesVentaCargar").innerHTML = "";
    document.getElementById("ordenesCompraCargar").innerHTML = "";
    busqueda.disabled = false;
});


confirmarOperacion.addEventListener("click", (event) => {
    event.preventDefault();
    cedearApuntadoCartera = carteraON.find(cedear => cedear.ticker === cedearAOperar.value)
    console.log(carteraON);
    
    if (precioTotalOperar.value > usuarioLoggeado.liquidez) {
        alert("No se puede realizar la operacion")

    }else if (cedearApuntadoCartera){

        usuarioLoggeado.liquidez -= parseInt(precioTotalOperar.value)
        cedearApuntadoCartera.cantidad += parseInt(cantidadCedearOperar.value)
        console.log(carteraON);
        carteras[indexUsuario] = carteraON

        const ordenCompletada = OrdenesTotales.find(orden => orden.id === idOperacion.value);
        const usuarioEmisor = usuarios.find(usuario => usuario.nombreUsuario === ordenCompletada.usuario);
        usuarioEmisor.liquidez += parseInt(precioTotalOperar.value);

        console.log(usuarioEmisor);
        





        usuarios[indexUsuario] = usuarioLoggeado;
        let usuariosJSON = JSON.stringify(usuarios)
        localStorage.setItem("arrayDeUsuarios", usuariosJSON)
        let usuarioON = JSON.stringify(usuarioLoggeado)
        localStorage.setItem("usuarioOn", usuarioON)

        const CarterasJSON = JSON.stringify(carteras)
        localStorage.setItem("arrayDeCarteras", CarterasJSON)



        const indexOrdenTerminada = OrdenesTotales.findIndex(orden => orden.id === idOperacion.value);

        OrdenesTotales.splice(indexOrdenTerminada, 1)
        const OrdenesJSON = JSON.stringify(OrdenesTotales)
        localStorage.setItem("arrayDeOrdenes", OrdenesJSON)


        alert("operacion realizada con exito")
       /*  window.location.replace("../pages/ordenes.html") */

    }else if(!cedearApuntadoCartera){

        usuarioLoggeado.liquidez -= parseInt(precioTotalOperar.value);
        class NuevoCedear{
            constructor(nombre, ticker, precio, cantidad, usuario){
                this.nombre = nombre,
                this.ticker = ticker,
                this.precio = precio,
                this.cantidad = cantidad,
                this.usuario = usuario
                
            }
        }
        const NuevoCedearCartera = new NuevoCedear( cedearAOperarNombre.value, cedearAOperar.value, parseInt(precioCedearOperar.value), parseInt(cantidadCedearOperar.value), usuarioLoggeado.nombreUsuario)
        carteraON.push(NuevoCedearCartera)
        console.log(carteraON);
        carteras[indexUsuario] = carteraON
        const CarterasJSON = JSON.stringify(carteras)
        localStorage.setItem("arrayDeCarteras", CarterasJSON)
        alert("operacion realizada con exito")
        window.location.replace("../pages/ordenes.html")
    }

    console.log(usuarioLoggeado);
})

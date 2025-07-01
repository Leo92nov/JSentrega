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

function actualizarPrecioTotal(){
    let cantidad = parseInt(cantidadCedearOperar.value)
    let precio = parseInt(precioCedearOperar.value)
    let valorTotal = cantidad * precio
    precioTotalOperar.value = valorTotal
}

cantidadCedearOperar.addEventListener("input", actualizarPrecioTotal)
precioCedearOperar.addEventListener("input", actualizarPrecioTotal)

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


function actualizarYEliminarOrden(ordenes, id, cantidadARestar) {
    const index = ordenes.findIndex(orden => orden.id === id);
    if (index === -1) return;
    
    ordenes[index].cantidad -= parseInt(cantidadARestar);
    
    if (ordenes[index].cantidad <= 0) {
        ordenes.splice(index, 1);
    }
}

 function eliminarActivosDeCarteraEnCero(carteraON, ticker, cantidadARestar) {
    const index = carteraON.findIndex(activo => activo.ticker === ticker);
    if (index === -1) return;

    carteraON[index].cantidad -= parseInt(cantidadARestar);

    if (carteraON[index].cantidad <= 0) {
        carteraON.splice(index, 1);
    }
}

confirmarOperacion.addEventListener("click", (event) => {
    
    
    event.preventDefault();
    cedearApuntadoCartera = carteraON.find(cedear => cedear.ticker === cedearAOperar.value)
    console.log(carteraON);
    
    if (parseInt(precioTotalOperar.value) > usuarioLoggeado.liquidez) {
        alert("No se puede realizar la operación");
        return;
    }
    
    if (cedearApuntadoCartera && tipoOperacion.value === "venta"){
        
        //Actualiza la informacion de comprador
        usuarioLoggeado.liquidez -= parseInt(precioTotalOperar.value)
        cedearApuntadoCartera.cantidad += parseInt(cantidadCedearOperar.value)
        carteras[indexUsuario] = carteraON
        
        //actualiza la Liquidez del emisor
        const ordenCompletada = OrdenesTotales.find(orden => orden.id === idOperacion.value);
        const usuarioEmisor = usuarios.find(usuario => usuario.nombreUsuario === ordenCompletada.usuario);
        usuarioEmisor.liquidez += parseInt(precioTotalOperar.value);
        
        //lleva los datos nuevos del usuario loggeado al localstorage
        
        usuarios[indexUsuario] = usuarioLoggeado;
        let usuariosJSON = JSON.stringify(usuarios)
        localStorage.setItem("arrayDeUsuarios", usuariosJSON)
        let usuarioON = JSON.stringify(usuarioLoggeado)
        localStorage.setItem("usuarioOn", usuarioON)
        
        //lleva los datos actualizados de las carteras al localstorage
        const CarterasJSON = JSON.stringify(carteras)
        localStorage.setItem("arrayDeCarteras", CarterasJSON)
        
        //Actualiza las ordenes globales eliminando la orden recien ejecutada
        
        function agruparOrdenesPorUsuario(ordenes) {
            const agrupadas = {};
            
            ordenes.forEach(orden => {
                if (!agrupadas[orden.usuario]) {
                    agrupadas[orden.usuario] = [];
                }
                agrupadas[orden.usuario].push(orden);
            });
            
            return Object.values(agrupadas); // Devuelve array de arrays
        }
        
        
        actualizarYEliminarOrden(OrdenesTotales, idOperacion.value, cantidadCedearOperar.value);
        
        const OrdenesAgrupadas = agruparOrdenesPorUsuario(OrdenesTotales);
        const OrdenesJSON = JSON.stringify(OrdenesAgrupadas);
        localStorage.setItem("arrayDeOrdenes", OrdenesJSON);
        
        
        alert("operacion realizada con exito")
        /*  window.location.replace("../pages/ordenes.html") */
        
    }else if(!cedearApuntadoCartera && tipoOperacion.value === "venta"){
        
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
        
        
        //actualiza informacion de comprador
        usuarioLoggeado.liquidez -= parseInt(precioTotalOperar.value)
        cedearApuntadoCartera.cantidad += parseInt(cantidadCedearOperar.value)
        carteras[indexUsuario] = carteraON
        
        
        //Actualiza info de emisor de Orden
        const ordenCompletada = OrdenesTotales.find(orden => orden.id === idOperacion.value);
        const usuarioEmisor = usuarios.find(usuario => usuario.nombreUsuario === ordenCompletada.usuario);
        usuarioEmisor.liquidez += parseInt(precioTotalOperar.value);
        
        
        //Actualiza indformacion de usuarios en localStorage
        usuarios[indexUsuario] = usuarioLoggeado;
        let usuariosJSON = JSON.stringify(usuarios)
        localStorage.setItem("arrayDeUsuarios", usuariosJSON)
        let usuarioON = JSON.stringify(usuarioLoggeado)
        localStorage.setItem("usuarioOn", usuarioON)
        
        
        
        //Actualizando cartera comprador
        
        carteraON.push(NuevoCedearCartera)
        carteras[indexUsuario] = carteraON
        const CarterasJSON = JSON.stringify(carteras)
        localStorage.setItem("arrayDeCarteras", CarterasJSON)
        
        //Actualiza las ordenes eliminando la orden ejecutada
        function agruparOrdenesPorUsuario(ordenes) {
            const agrupadas = {};
            
            ordenes.forEach(orden => {
                if (!agrupadas[orden.usuario]) {
                    agrupadas[orden.usuario] = [];
                }
                agrupadas[orden.usuario].push(orden);
            });
            
            return Object.values(agrupadas); // Devuelve array de arrays
        }
        
        
        
        actualizarYEliminarOrden(OrdenesTotales, idOperacion.value, cantidadCedearOperar.value);
        
        const OrdenesAgrupadas = agruparOrdenesPorUsuario(OrdenesTotales);
        const OrdenesJSON = JSON.stringify(OrdenesAgrupadas);
        localStorage.setItem("arrayDeOrdenes", OrdenesJSON);
        
        alert("operacion realizada con exito")
        
        
        window.location.replace("../pages/ordenes.html")
    }
    
    if(!cedearApuntadoCartera && tipoOperacion.value === "compra"){
        alert("No puedes vender un activo que no posees")
        return
    }
    
    if(parseInt(cantidadCedearOperar.value) > cedearApuntadoCartera.cantidad){
        
        alert("no tienes tants")
        return
        
    }else if(cedearApuntadoCartera && tipoOperacion.value === "compra"){
        
        //Actualiza la informacion de comprador
        usuarioLoggeado.liquidez += parseInt(precioTotalOperar.value)
        cedearApuntadoCartera.cantidad -= parseInt(cantidadCedearOperar.value)
        carteras[indexUsuario] = carteraON
    
            eliminarActivosDeCarteraEnCero(carteraON, cedearAOperar.value, cantidadCedearOperar.value)
        
                            //actualiza la Liquidez del emisor
            const ordenCompletada = OrdenesTotales.find(orden => orden.id === idOperacion.value);
            const usuarioEmisor = usuarios.find(usuario => usuario.nombreUsuario === ordenCompletada.usuario);
            usuarioEmisor.liquidez -= parseInt(precioTotalOperar.value);
    
                            //lleva los datos nuevos del usuario loggeado al localstorage
    
            usuarios[indexUsuario] = usuarioLoggeado;
            let usuariosJSON = JSON.stringify(usuarios)
            localStorage.setItem("arrayDeUsuarios", usuariosJSON)
            let usuarioON = JSON.stringify(usuarioLoggeado)
            localStorage.setItem("usuarioOn", usuarioON)
    
                        //lleva los datos actualizados de las carteras al localstorage
            const CarterasJSON = JSON.stringify(carteras)
            localStorage.setItem("arrayDeCarteras", CarterasJSON)
    
                        //Actualiza las ordenes globales eliminando la orden recien ejecutada
    
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
    
    
            alert("operacion realizada con exito")
           /*  window.location.replace("../pages/ordenes.html") */
        }
    })

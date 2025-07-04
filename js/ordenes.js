let usuariosJSON = localStorage.getItem("arrayDeUsuarios");
let usuarios = JSON.parse(usuariosJSON);

let carterasJSON = localStorage.getItem("arrayDeCarteras");
let carteras = JSON.parse(carterasJSON);

let usuarioJSON = localStorage.getItem("usuarioOn");
let usuarioLoggeado = JSON.parse(usuarioJSON);

let CedearsTotales =[
    {nombre: "Apple Inc", ticker: "AAPL"},
    {nombre: "Coca cola company", ticker: "KO"},
    {nombre: "Berkshire Hathaway Inc", ticker: "BRK-B"},
    {nombre: "Realty Income Corporation", ticker: "O"},
    {nombre: "Verizon Communications Inc", ticker: "VZ"},
    {nombre: "Lockheed Martin", ticker: "LMT"},
    {nombre: "Advanced Micro Devices Inc", ticker: "AMD"},
    {nombre: "Intel Corporation", ticker: "INTC"},
    {nombre: "Amazon.com Inc", ticker: "AMZN"}
]

const indexUsuario = usuarios.findIndex(usuario => usuario.nombreUsuario === usuarioLoggeado.nombreUsuario);
const carteraON = carteras[indexUsuario];



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

function mostrarMensaje(mensaje, tipo = "error") {
    const contenedor = document.getElementById("IngresoError");
    contenedor.textContent = mensaje;

    if (tipo === "ok") {
        contenedor.classList.add("mensaje-ok");
    } else {
        contenedor.classList.add("mensaje-error");
    }
}

function actualizarPrecioTotal(){
    let cantidad = parseInt(cantidadCedearOperar.value);
    let precio = parseInt(precioCedearOperar.value);
    let valorTotal = cantidad * precio;
    precioTotalOperar.value = valorTotal;
}

cantidadCedearOperar.addEventListener("input", actualizarPrecioTotal);
precioCedearOperar.addEventListener("input", actualizarPrecioTotal);



let cedearABuscar = document.getElementById("inputCEDEAR");
let busqueda = document.getElementById("botonBusquedaCajaDeCPuntas");

function mostrarMensaje(mensaje, tipo = "error") {
    const contenedor = document.getElementById("mensajedeError");
    contenedor.textContent = mensaje;

    if (tipo === "ok") {
        contenedor.classList.add("mensaje-ok");
    } else {
        contenedor.classList.add("mensaje-error");
    }
}

busqueda.addEventListener("click", () =>{
    const busquedaOrden = cedearABuscar.value.toLowerCase();
    busqueda.disabled = true;
    const ordenesFiltradas = OrdenesTotales.filter(OrdenesTotales => OrdenesTotales.ticker.toLowerCase().includes(busquedaOrden) && OrdenesTotales.usuario !== usuarioLoggeado.nombreUsuario);
    const ordenesVentaCargar = document.getElementById("ordenesVentaCargar");
    const ordenesCompraCargar = document.getElementById("ordenesCompraCargar");
    const idOperacion = document.getElementById("idOperacion");
    ordenesVentaCargar.innerHTML = "";

    ordenesFiltradas.forEach(orden =>{
        const ordenes = document.createElement("div");
        ordenes.className ="ordenEnCaja";
        ordenes.innerHTML = `
        <div>${orden.cantidad}</div>
        <div>${orden.precio}</div>
        `
        
        if(orden.orden === "venta"){
            ordenesVentaCargar.appendChild(ordenes);
        }else if (orden.orden === "compra") {
            ordenesCompraCargar.appendChild(ordenes);
        }
        
        
        ordenes.addEventListener("click", () => {
            cedearAOperar.value = orden.ticker;
            cedearAOperarNombre.value = orden.Nombre;
            cantidadCedearOperar.value = orden.cantidad;
            precioCedearOperar.value = orden.precio;
            tipoOperacion.value = orden.orden;
            precioTotalOperar.value = orden.precio * orden.cantidad;
            idOperacion.value = orden.id;

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
    cedearApuntadoCartera = carteraON.find(cedear => cedear.ticker === cedearAOperar.value);
    
    if (parseInt(precioTotalOperar.value) > usuarioLoggeado.liquidez) {

        mostrarMensaje("Imposble realizar la operacion, fondos insuficientes");

        return;
    }
    
    if (cedearApuntadoCartera && tipoOperacion.value === "venta"){
        
        usuarioLoggeado.liquidez -= parseInt(precioTotalOperar.value);
        cedearApuntadoCartera.cantidad += parseInt(cantidadCedearOperar.value);
        carteras[indexUsuario] = carteraON;
        
        
        const ordenCompletada = OrdenesTotales.find(orden => orden.id === idOperacion.value);
        const usuarioEmisor = usuarios.find(usuario => usuario.nombreUsuario === ordenCompletada.usuario);
        usuarioEmisor.liquidez += parseInt(precioTotalOperar.value);
        
        
        usuarios[indexUsuario] = usuarioLoggeado;
        let usuariosJSON = JSON.stringify(usuarios);
        localStorage.setItem("arrayDeUsuarios", usuariosJSON);
        let usuarioON = JSON.stringify(usuarioLoggeado);
        localStorage.setItem("usuarioOn", usuarioON);
        
       
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
        
        
      mostrarMensaje("operación realizada con exito!!!");
        window.location.replace("../pages/inicio.html");
        
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
        const NuevoCedearCartera = new NuevoCedear( cedearAOperarNombre.value, cedearAOperar.value, parseInt(precioCedearOperar.value), parseInt(cantidadCedearOperar.value), usuarioLoggeado.nombreUsuario);
        
 
        usuarioLoggeado.liquidez -= parseInt(precioTotalOperar.value);
        cedearApuntadoCartera.cantidad += parseInt(cantidadCedearOperar.value);
        carteras[indexUsuario] = carteraON;
        

        const ordenCompletada = OrdenesTotales.find(orden => orden.id === idOperacion.value);
        const usuarioEmisor = usuarios.find(usuario => usuario.nombreUsuario === ordenCompletada.usuario);
        usuarioEmisor.liquidez += parseInt(precioTotalOperar.value);
        
    
        usuarios[indexUsuario] = usuarioLoggeado;
        let usuariosJSON = JSON.stringify(usuarios);
        localStorage.setItem("arrayDeUsuarios", usuariosJSON);
        let usuarioON = JSON.stringify(usuarioLoggeado);
        localStorage.setItem("usuarioOn", usuarioON);
          
        
        carteraON.push(NuevoCedearCartera);
        carteras[indexUsuario] = carteraON;
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
        
        mostrarMensaje("Operacion realizada con exito!!");
        
        
        window.location.replace("../pages/ordenes.html");
    }
    
    if(!cedearApuntadoCartera && tipoOperacion.value === "compra"){
        mostrarMensaje("No puedes vender un activo que no posees");
        return;
    }
    
    if(parseInt(cantidadCedearOperar.value) > cedearApuntadoCartera.cantidad){
        
        mostrarMensaje("no posees la cantidad de activos suficientes para realizar la operación");
        return;
        
    }else if(cedearApuntadoCartera && tipoOperacion.value === "compra"){
        
        usuarioLoggeado.liquidez += parseInt(precioTotalOperar.value);
        cedearApuntadoCartera.cantidad -= parseInt(cantidadCedearOperar.value);
        carteras[indexUsuario] = carteraON;
    
            eliminarActivosDeCarteraEnCero(carteraON, cedearAOperar.value, cantidadCedearOperar.value);
        
            
            const ordenCompletada = OrdenesTotales.find(orden => orden.id === idOperacion.value);
            const usuarioEmisor = usuarios.find(usuario => usuario.nombreUsuario === ordenCompletada.usuario);
            usuarioEmisor.liquidez -= parseInt(precioTotalOperar.value);
    
    
    
            usuarios[indexUsuario] = usuarioLoggeado;
            let usuariosJSON = JSON.stringify(usuarios);
            localStorage.setItem("arrayDeUsuarios", usuariosJSON);
            let usuarioON = JSON.stringify(usuarioLoggeado);
            localStorage.setItem("usuarioOn", usuarioON);
    
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
    
            mostrarMensaje("operacion realizada con exito!!");
            window.location.replace("../pages/ordenes.html");
        }
    })














    const crearOrden = document.getElementById("crearOrden");
    const operacionVenta = document.getElementById("operacionVenta");
    const operacionCompra = document.getElementById("operacionCompra");
    const nombreEmpresaNuevaOrden = document.getElementById("nombreEmpresaNuevaOrden");
    const tickerNuevaOrden = document.getElementById("tickerNuevaOrden");
    const cantidadNuevaOrden = document.getElementById("cantidadNuevaOrden");
    const precioCedearNuevaOrden = document.getElementById("precioCedearNuevaOrden");
    const botonRealizarOperacion = document.getElementById("botonRealizarOperacion");
    const RresultadosNuevaOrden = document.getElementById("RresultadosNuevaOrden");
    let tipoDeOperacion 


    operacionCompra.addEventListener("click", ()=>{
        operacionCompra.classList.add("operacionCompraActiva")
        operacionVenta.classList.remove ("operacionVentaActiva")
    })

    operacionVenta.addEventListener("click", () =>{
        operacionVenta.classList.add("operacionVentaActiva")
        operacionCompra.classList.remove("operacionCompraActiva")

    })

    nombreEmpresaNuevaOrden.addEventListener("input", () =>{

        const texto = nombreEmpresaNuevaOrden.value.toLowerCase();
        RresultadosNuevaOrden.innerHTML = "";

        if(texto === ""){
            return
        }

        const sugeridos = CedearsTotales.filter(cedear =>
            cedear.nombre.toLowerCase().includes(texto)
        )

        sugeridos.forEach(cedear =>{
            const lista = document.createElement("li")
            lista.textContent = cedear.nombre
            lista.addEventListener("click", () =>{
                nombreEmpresaNuevaOrden.value = cedear.nombre
                tickerNuevaOrden.value = cedear.ticker
                RresultadosNuevaOrden.innerHTML = ""
            })
            RresultadosNuevaOrden.appendChild(lista);
        })
    })



   /*  nombreEmpresaNuevaOrden.addEventListener("input", () => {
  const texto = nombreEmpresaNuevaOrden.value.toLowerCase();
  RresultadosNuevaOrden.innerHTML = "";

  if (texto === "") return;

  const sugeridos = CedearsTotales.filter(cedear =>
    cedear.nombre.toLowerCase().includes(texto)
  );

  sugeridos.forEach(cedear => {
    const lista = document.createElement("li");
    lista.textContent = cedear.nombre;
    lista.addEventListener("click", () => {
      nombreEmpresaNuevaOrden.value = cedear.nombre;
      tickerNuevaOrden.value = cedear.ticker;
      RresultadosNuevaOrden.innerHTML = ""; // Ocultar sugerencias
    });
    RresultadosNuevaOrden.appendChild(lista);
  });
  
}); */
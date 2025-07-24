let usuariosRecuperados = localStorage.getItem("arrayDeUsuarios")
let Usuarios = JSON.parse(usuariosRecuperados)

const usuarioOn = localStorage.getItem("usuarioOn");
const usuarioLoggeado = JSON.parse(usuarioOn);
console.log(usuarioLoggeado);

const carteraJSON = localStorage.getItem("carteraOn");
const carteraOn = JSON.parse(carteraJSON);

console.log(carteraOn);

const totalInversion = carteraOn.reduce((acumulador, e) => {
    return acumulador + (e.cantidad * e.precio);
}, 0);



let OrdenesJSON = localStorage.getItem("arrayDeOrdenes");
let Ordenes = JSON.parse(OrdenesJSON);

console.log(usuarioLoggeado.nombreUsuario);

let totalInvertidoCedears = 0;
let liquidezUsuario = usuarioLoggeado.liquidez;
let totalInversionEnBroker = 0;

console.log(liquidezUsuario +totalInversion);

for (const obj of carteraOn) {
  totalInvertidoCedears += obj.cantidad * obj.precio;
}

let totalInvertidoBroker = totalInvertidoCedears + usuarioLoggeado.liquidez
console.log(totalInvertidoBroker);

let inputNombreUsuarioPrestamo = document.getElementById("inputNombreUsuarioPrestamo")
let numeroDocumento = document.getElementById("numeroDocumento")
let cantidadDeseadaPrestamo = document.getElementById("cantidadDeseadaPrestamo")
let plazoTotalMesesprestamo = document.getElementById("plazoTotalMesesprestamo")
let calcularPrestamo = document.getElementById("calcularPrestamo")
let totalPrestamoPosible = document.getElementById("totalPrestamoPosible")
let devolverPorCuota = document.getElementById("devolverPorCuota")
let tasaMensualPrestamo = document.getElementById("tasaMensualPrestamo")
let totalADevolver = document.getElementById("totalADevolver")
let recibirPrestamoBoton = document.getElementById("recibirPrestamoBoton")
let tasaMes = 0.02


calcularPrestamo.addEventListener("click", (event) => {
  event.preventDefault();
  if(inputNombreUsuarioPrestamo.value === usuarioLoggeado.nombreUsuario && numeroDocumento.value === usuarioLoggeado.DNI){
  }else{
   alert("campos incompletos o incorrectos")
   return
  }
 
  if(plazoTotalMesesprestamo.value > 12){
    tasaMes = 0.04
  }else if(plazoTotalMesesprestamo.value <= 0){
    alert("mes incorreto")
    return
  }
  function calcularPrestamo(cantidadDeseadaPrestamo){
    let parcial = (parseInt(cantidadDeseadaPrestamo.value) * (tasaMes * plazoTotalMesesprestamo.value))
    return parcial + parseInt(cantidadDeseadaPrestamo.value)
  }
  let prestamoCalculado = calcularPrestamo(cantidadDeseadaPrestamo, plazoTotalMesesprestamo)
  totalPrestamoPosible.value = cantidadDeseadaPrestamo.value

  devolverPorCuota.value = (totalPrestamoPosible.value / plazoTotalMesesprestamo.value).toFixed(2)
  
 let tasaMensual = (tasaMes * 100) + "%"

 
 tasaMensualPrestamo.value = tasaMensual 
 totalADevolver.value = prestamoCalculado
})

recibirPrestamoBoton.addEventListener("click", (event) =>{
  event.preventDefault();

 if (parseInt(totalADevolver.value) > parseInt(totalInversion + usuarioLoggeado.liquidez)){
    alert("es demasiado")
    return
  }else if(!usuarioLoggeado.deuda){
    let deuda = parseInt(totalADevolver.value)
    usuarioLoggeado.deuda = deuda
    console.log(usuarioLoggeado);
    let usuarioPrestamo = JSON.stringify(usuarioLoggeado)
    localStorage.setItem("usuarioOn", usuarioPrestamo)
    alert("Prestamo Otorgado!!!")
  }else{
    alert("Hasta que no canceles tu deuda actual no podes solicitar otro presatmo")
  }

})
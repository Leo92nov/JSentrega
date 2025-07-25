let usuariosRecuperados = localStorage.getItem("arrayDeUsuarios")
let Usuarios = JSON.parse(usuariosRecuperados)

const usuarioOn = localStorage.getItem("usuarioOn");
const usuarioLoggeado = JSON.parse(usuarioOn);

const carteraJSON = localStorage.getItem("carteraOn");
const carteraOn = JSON.parse(carteraJSON);

const totalInversion = carteraOn.reduce((acumulador, e) => {
  return acumulador + (e.cantidad * e.precio);
}, 0);

function mostrarMensajeErrorPrestamo(mensaje, tipo = "error") {
  const errorDePrecioTotal = document.getElementById("errorDePrecioTotal");
  errorDePrecioTotal.textContent = mensaje;

  errorDePrecioTotal.classList.remove("mensaje-ok", "mensajeError");

  if (tipo === "ok") {
    errorDePrecioTotal.classList.add("mensaje-ok");
  } else {
    errorDePrecioTotal.classList.add("mensajeError");
  }
}
function mostrarMensajeOrdenesNuevas(mensaje, tipo = "error") {
  const errorDePrecioTotal = document.getElementById("errorDePrestamoTotal");
  errorDePrecioTotal.textContent = mensaje;

  errorDePrecioTotal.classList.remove("mensaje-ok", "mensajeError");

  if (tipo === "ok") {
    errorDePrecioTotal.classList.add("mensaje-ok");
  } else {
    errorDePrecioTotal.classList.add("mensajeError");
  }
}

let OrdenesJSON = localStorage.getItem("arrayDeOrdenes");
let Ordenes = JSON.parse(OrdenesJSON);


let totalInvertidoCedears = 0;
let liquidezUsuario = usuarioLoggeado.liquidez;
let totalInversionEnBroker = 0;


for (const obj of carteraOn) {
  totalInvertidoCedears += obj.cantidad * obj.precio;
}

let totalInvertidoBroker = totalInvertidoCedears + usuarioLoggeado.liquidez

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
let checkBoxPrestamo = document.getElementById("checkBoxPrestamo")

inputNombreUsuarioPrestamo.value = usuarioLoggeado.nombreUsuario
numeroDocumento.value = usuarioLoggeado.DNI
calcularPrestamo.addEventListener("click", (event) => {
  event.preventDefault();
  if (
    inputNombreUsuarioPrestamo.value !== usuarioLoggeado.nombreUsuario ||
    numeroDocumento.value !== usuarioLoggeado.DNI
  ) {
    mostrarMensajeErrorPrestamo("Campos incompletos o incorrectos!!");
    return;
  } else if (parseInt(cantidadDeseadaPrestamo.value) < 20000) {
    mostrarMensajeErrorPrestamo("Seleccione un monto mayor a $20.000");
    return;
  }

  if (plazoTotalMesesprestamo.value > 12) {
    tasaMes = 0.04
  } else if (plazoTotalMesesprestamo.value <= 6) {
    mostrarMensajeErrorPrestamo("Seleccion de meses incorrecto!!")
    return
  }
  function calcularPrestamo(cantidadDeseadaPrestamo) {
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

checkBoxPrestamo.addEventListener("change", (e) => {

  if (checkBoxPrestamo.checked) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: "¿Está seguro?",
      text: "No podrá realizar extracciones de dinero si tiene una deuda con el broker.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Acepto",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "¡Excelente!",
          text: "Su préstamo está listo",
          icon: "success"
        });
      } else {
        checkBoxPrestamo.checked = false;
      }
    });
  }
});

recibirPrestamoBoton.addEventListener("click", (event) => {
  if (checkBoxPrestamo.checked) {

  } else {
    mostrarMensajeOrdenesNuevas("Habilite su garantia antes de continuar")
    return
  }
  event.preventDefault();


  if (parseInt(totalADevolver.value) > parseInt(totalInversion + usuarioLoggeado.liquidez)) {
    mostrarMensajeOrdenesNuevas("Su peticion excede su capacidad de pago!!")
    return
  } else if (!usuarioLoggeado.deuda) {
    let deuda = parseInt(totalADevolver.value)
    usuarioLoggeado.deuda = deuda
    usuarioLoggeado.deudaBruta = cantidadDeseadaPrestamo.value
    usuarioLoggeado.liquidez = usuarioLoggeado.liquidez + deuda
    let usuarioPrestamo = JSON.stringify(usuarioLoggeado)
    localStorage.setItem("usuarioOn", usuarioPrestamo)
    Swal.fire({
      title: "Prestamo Otorgado!!",
      icon: "success",
      draggable: true
    }).then(() => {
      window.location.href = "../index.html";
    })
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Cancele su deuda antes de aplicar para otro prestamo!!",
    });
  }

})

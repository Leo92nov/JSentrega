const usuarios = [
    {nombre: "Leonardo", nombreUsuario: "36765496", contrasena: "starplatinum", ahorros: 265000, numeroCcomitente: 54687879},
    {nombre: "Diego", nombreUsuario: "diego", contrasena: "brando", ahorros: 295000, numeroCcomitente: 54687880},
    {nombre: "Pablo", nombreUsuario: "pablin", contrasena: "guitarra", ahorros: 25000, numeroCcomitente: 54687881},
    {nombre: "Alejandro", nombreUsuario: "ale", contrasena: "discordia", ahorros: 465000, numeroCcomitente: 54687882},
    {nombre: "Santiago", nombreUsuario: "santi", contrasena: "martin", ahorros: 65000, numeroCcomitente: 54687883},
    {nombre: "Juan", nombreUsuario: "juan", contrasena: "pablo", ahorros: 5000, numeroCcomitente: 54687884},
    {nombre: "Gabriel", nombreUsuario: "gabi", contrasena: "sosa", ahorros: 635000, numeroCcomitente: 54687885,}
]

let usuarioIngresado = document.querySelector("#usuario");
let contrasenaIngresada = document.querySelector("#contrasena")
let intentos = 0


const ingreso = document.getElementById("ingresoBoton")
 
    ingreso.addEventListener("click", (event) => {
        event.preventDefault();
        let usuarioExistente = false

        for (const usuario of usuarios) {
            if(usuarioIngresado.value === usuario.nombreUsuario && contrasenaIngresada.value === usuario.contrasena){
                
                alert("bienvenido " + usuario.nombre)
                usuarioExistente = true
                window.location.href = "../index.html"
                break
            }
        }
        if(!usuarioExistente){
            intentos += 1;
            console.log(intentos);
                
            alert("Datos incorrectos, intenta nuevamente")

            if (intentos === 3){
            window.location.replace("https://es.javascript.info/forms-submit")
            }
        } 
    })
            
    const registro = document.getElementById("registro")

    registro.addEventListener("click", () => {
        window.location.href = "../pages/crearUsuario.html"
    })







/* let apellido = "perez";
let contrasena = prompt("Ingrese su contraseña");
let login = false
let intentos

while (intentos < 3) {
    


}
const SueldosAhorrados = [25000, 24000, 26000, 23000, 27000, 25000, 20000, 30000, 40000, 10000 ];

for (let i = 0; i < 3; i ++) {
    const user =  usuarios.find(u => u.nombreUsuario === usuario)

    if (usuario === user.nombreUsuario  && contrasena === user.contrasena) {
        login = true
        alert ("Bienvenido sr " + apellido + ".");
        break;
    }else{
        alert("Datos incorrectos, le quedan " + (2 - i) + " intentos.");
    }
}




let ahorros = 250000;
let sueldo = 45000;
let gastoFijo = 20000;
let gastoVariable = parseInt(prompt("Ingresa en números cuántos fueron los gastos variables del mes"));
let mesesDeCobro = 12;
let gastos = gastoFijo + gastoVariable;
let porcentajeDeAhorros;
let cantidadAhorro;
if (gastos > sueldo) {
    alert("CUIDADO, ESTAS PERDIENDO DINERO, ESTE MES NO PODES AHORRAR");

}else{
    porcentajeDeAhorros = prompt("¿Qué porcentaje de tu sueldo vas a ahorrar este mes?");
}
console.log(ahorros);

function sueldoNeto (sueldo, gastoFijo, gastoVariable) { 
    let resultado = sueldo - (gastoFijo + gastoVariable);
    return resultado;
}

let sueldoLimpio = sueldoNeto(sueldo, gastoFijo, gastoVariable);

console.log(sueldoLimpio);

alert("Su sueldo neto de este mes es de " + sueldoLimpio);


let opcion = parseInt(prompt("Eliga la opcion que desee: \n1 - Sumar Sueldo al ahorro \n2 - Anualizar sueldo neto sin ahorros \n3 - Porcentaje de gastos sobre el sueldo \n4 - Calcular ahorro de este mes \n5 - Salir"));

while (opcion !== 5) {


    const sumarSueldo = (ahorrosActuales, sueldoNeto) => ahorrosActuales + sueldoNeto;
    const sueldoNetoAnualizado = (sueldoNeto, meses) => sueldoNeto * meses;
    const porcentuarGastos = (gastos, sueldo) => (gastos * 100) / sueldo;
    const cantidadAAhorrar = (sueldoNeto, porcentaje) => (sueldoNeto * porcentaje) / 100;

    switch (opcion) {
        case 1:
            ahorros = sumarSueldo(ahorros, sueldoLimpio);
            alert("Ahorros actualizados: " + ahorros);
            break;

        case 2:
            let anualizado = sueldoNetoAnualizado(sueldoLimpio, mesesDeCobro);
            alert("Sueldo neto anualizado: $" + anualizado);
            break;

        case 3:
            let porcentajeGastos = porcentuarGastos(gastos, sueldo);
            alert("Tus gastos representan el " + porcentajeGastos + "% de tu sueldo.");
            break;

        case 4:
            cantidadAhorro = cantidadAAhorrar(sueldoLimpio, porcentajeDeAhorros);
            if (isNaN(cantidadAhorro)) {
                alert("Este mes no podes ahorrar");
                break;
            }else{
            alert("Vas a ahorrar este mes: $" + cantidadAhorro);
            }
            break;

        case 5:
            alert("Gracias por usar el programa.");
            break;

        default:
            alert("Opción seleccionada incorrecta.");
    }
    opcion = parseInt(prompt("Eliga la opcion que desee: \n1 - Sumar Sueldo al ahorro \n2 - Anualizar sueldo neto sin ahorros \n3 - Porcentaje de gastos sobre el sueldo \n4 - Calcular ahorro de este mes \n5 - Salir"));
}

if (!isNaN(cantidadAhorro)) {
    let ahorrar = prompt("¿querés ahorrar el excedente de tu sueldo? si/no");

    if(ahorrar === "si"){
        SueldosAhorrados.push(cantidadAhorro);
        console.log("tu lista de sueldos ahorrados se ve asi " + SueldosAhorrados);
    }else if (ahorrar === "no"){
        alert("Este mes no ahorrás");
    }
} else {
    alert("No calculaste el ahorro este mes, no se puede guardar.");
}

console.log(SueldosAhorrados);

alert("Gracias");

 */
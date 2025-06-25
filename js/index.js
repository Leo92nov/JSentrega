let usuariosRecuperados = localStorage.getItem("arrayDeUsuarios")
let Usuarios = JSON.parse(usuariosRecuperados)


if (Usuarios) {
    console.log("ya cargados");
    
}else{

    const ArrUsuarios = [
        {nombre: "Leonardo", nombreUsuario: "36765496", contrasena: "starplatinum", ahorros: 265000, numeroCcomitente: 54687879, palabraSecreta: "Fantástico"},
        {nombre: "Diego", nombreUsuario: "diego", contrasena: "brando", ahorros: 295000, numeroCcomitente: 54687880, palabraSecreta: "Financiera"},
        {nombre: "Pablo", nombreUsuario: "pablin", contrasena: "guitarra", ahorros: 25000, numeroCcomitente: 54687881, palabraSecreta: "8Mile"},
        {nombre: "Alejandro", nombreUsuario: "ale", contrasena: "discordia", ahorros: 465000, numeroCcomitente: 54687882, palabraSecreta: "Desodorante"},
        {nombre: "Santiago", nombreUsuario: "santi", contrasena: "martin", ahorros: 65000, numeroCcomitente: 54687883, palabraSecreta: "Octógono"},
        {nombre: "Juan", nombreUsuario: "juan", contrasena: "pablo", ahorros: 5000, numeroCcomitente: 54687884, palabraSecreta: "Terraforma"},
        {nombre: "Gabriel", nombreUsuario: "gabi", contrasena: "sosa", ahorros: 635000, numeroCcomitente: 54687885, palabraSecreta: "Ascención"}
    ]

console.log("recien cargados");

let usuariosJSON = JSON.stringify(ArrUsuarios)
localStorage.setItem("arrayDeUsuarios", usuariosJSON)
Usuarios = ArrUsuarios
}





let usuarioIngresado = document.querySelector("#usuario");
let contrasenaIngresada = document.querySelector("#contrasena")
let intentos = 0
let usuarioLogueado 
let usuarioLogueadoJSON


const ingreso = document.getElementById("ingresoBoton")
 
    ingreso.addEventListener("click", (event) => {
        event.preventDefault();
        let usuarioExistente = false

        for (const usuario of Usuarios) {

            if(usuarioIngresado.value === usuario.nombreUsuario && contrasenaIngresada.value === usuario.contrasena){

                alert("bienvenido " + usuario.nombre);
                usuarioExistente = true;
                usuarioLogueado = usuario;
                usuarioLogueadoJSON = JSON.stringify(usuarioLogueado);
                localStorage.setItem("usuario ON", usuarioLogueadoJSON);
                window.location.href = "./pages/inicio.html";
                break
            }
        }
        
        if(!usuarioExistente){
            alert("Datos incorrectos, intenta nuevamente");
        }
    })
            
    const registro = document.getElementById("registro")

    registro.addEventListener("click", () => {
        window.location.href = "./pages/registro.html"
    })


const ContrasenaOlvidada = document.getElementById("contrasenaOlvidada")
ContrasenaOlvidada.addEventListener("click", () => {
    window.location.href = "./pages/recuperacion.html"
})
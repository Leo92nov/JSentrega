let usuariosRecuperados = localStorage.getItem("arrayDeUsuarios")
let Usuarios = JSON.parse(usuariosRecuperados)

let CarterasJSON = localStorage.getItem("arrayDeCarteras")
let Carteras = JSON.parse(CarterasJSON)


if(Carteras){
    console.log("carteras ya cargadas");
    
}else{
    console.log("carteras recien cargadas");
    
    const Carteras = [
        [
            {Nombre: "Apple Inc.", ticker: "AAPL", precio: 2500, cantidad: 60},
            {Nombre: "Coca cola company.", ticker: "KO", precio: 1550, cantidad: 25},
            {Nombre: "Berkshire Hathaway Inc", ticker: "BRK-B", precio: 3100, cantidad: 31},
            {Nombre: "Realty Income Corporation", ticker: "O", precio: 680, cantidad: 22},
            {Nombre: "Verizon Communications Inc", ticker: "VZ", precio: 1580, cantidad: 12},
            {Nombre: "Lockheed Martin.", ticker: "LMT", precio: 2600, cantidad: 70},
            {Nombre: "Advanced Micro Devices Inc", ticker: "AMD", precio: 1990, cantidad: 37},
            {Nombre: "Intel Corporation", ticker: "INTC", precio: 1450, cantidad: 42},
            {Nombre: "Amazon.com Inc", ticker: "AMZN", precio: 550, cantidad: 60}
        ],
        [
            {Nombre: "Apple Inc.", ticker: "AAPL", precio: 2500, cantidad: 10},
            {Nombre: "Coca cola company.", ticker: "KO", precio: 1550, cantidad: 35},
            {Nombre: "Berkshire Hathaway Inc", ticker: "BRK-B", precio: 3100, cantidad: 61},
            {Nombre: "Verizon Communications Inc", ticker: "VZ", precio: 1580, cantidad: 12},
            {Nombre: "Lockheed Martin.", ticker: "LMT", precio: 2600, cantidad: 70},
            {Nombre: "Advanced Micro Devices Inc", ticker: "AMD", precio: 1990, cantidad: 107},
            {Nombre: "Amazon.com Inc", ticker: "AMZN", precio: 550, cantidad: 60}
        ],
        [
            {Nombre: "Coca cola company.", ticker: "KO", precio: 1550, cantidad: 25},
            {Nombre: "Berkshire Hathaway Inc", ticker: "BRK-B", precio: 3100, cantidad: 34},
            {Nombre: "Verizon Communications Inc", ticker: "VZ", precio: 1580, cantidad: 22},
            {Nombre: "Lockheed Martin.", ticker: "LMT", precio: 2600, cantidad: 170},
            {Nombre: "Advanced Micro Devices Inc", ticker: "AMD", precio: 1990, cantidad: 67},
            {Nombre: "Intel Corporation", ticker: "INTC", precio: 1450, cantidad: 42},
            {Nombre: "Amazon.com Inc", ticker: "AMZN", precio: 550, cantidad: 51}
        ],
        [
            {Nombre: "Apple Inc.", ticker: "AAPL", precio: 2500, cantidad: 20},
            {Nombre: "Coca cola company.", ticker: "KO", precio: 1550, cantidad: 5},
            {Nombre: "Realty Income Corporation", ticker: "O", precio: 680, cantidad: 22},
            {Nombre: "Verizon Communications Inc", ticker: "VZ", precio: 1580, cantidad: 2},
            {Nombre: "Lockheed Martin.", ticker: "LMT", precio: 2600, cantidad: 7},
            {Nombre: "Advanced Micro Devices Inc", ticker: "AMD", precio: 1990, cantidad: 7},
            {Nombre: "Intel Corporation", ticker: "INTC", precio: 1450, cantidad: 4},
            {Nombre: "Amazon.com Inc", ticker: "AMZN", precio: 550, cantidad: 9}
        ],
        [
            {Nombre: "Apple Inc.", ticker: "AAPL", precio: 2500, cantidad: 60},
            {Nombre: "Amazon.com Inc", ticker: "AMZN", precio: 550, cantidad: 60}
        ],
        [
            {Nombre: "Coca cola company.", ticker: "KO", precio: 1550, cantidad: 45},
            {Nombre: "Berkshire Hathaway Inc", ticker: "BRK-B", precio: 3100, cantidad: 21},
            {Nombre: "Realty Income Corporation", ticker: "O", precio: 680, cantidad: 55},
            {Nombre: "Lockheed Martin.", ticker: "LMT", precio: 2600, cantidad: 21},
            {Nombre: "Amazon.com Inc", ticker: "AMZN", precio: 550, cantidad: 33}
        ],
        [
            {Nombre: "Coca cola company.", ticker: "KO", precio: 1550, cantidad: 125},
            {Nombre: "Realty Income Corporation", ticker: "O", precio: 680, cantidad: 232},
            {Nombre: "Verizon Communications Inc", ticker: "VZ", precio: 1580, cantidad: 12},
            {Nombre: "Lockheed Martin.", ticker: "LMT", precio: 2600, cantidad: 700},
        ]
    ]
    const CarterasJSON = JSON.stringify(Carteras)
    localStorage.setItem("arrayDeCarteras", CarterasJSON)
}







if (Usuarios) {
    console.log("ya cargados");
    
}else{

    const ArrUsuarios = [
        {nombre: "Leonardo", nombreUsuario: "36765496", contrasena: "starplatinum", liquidez: 265000, palabraSecreta: "Fantástico"},
        {nombre: "Diego", nombreUsuario: "diego", contrasena: "brando", liquidez: 295000, palabraSecreta: "Financiera"},
        {nombre: "Pablo", nombreUsuario: "pablin", contrasena: "guitarra", liquidez: 25000, palabraSecreta: "8Mile"},
        {nombre: "Alejandro", nombreUsuario: "ale", contrasena: "discordia", liquidez: 465000, palabraSecreta: "Desodorante"},
        {nombre: "Santiago", nombreUsuario: "santi", contrasena: "martin", liquidez: 65000, palabraSecreta: "Octógono"},
        {nombre: "Juan", nombreUsuario: "juan", contrasena: "pablo", liquidez: 5000, palabraSecreta: "Terraforma"},
        {nombre: "Gabriel", nombreUsuario: "gabi", contrasena: "sosa", liquidez: 635000, palabraSecreta: "Ascención"}
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

            if(usuarioIngresado.value === "" || contrasenaIngresada.value === ""){
                alert("Campos vacios")
                break

            }else if(usuarioIngresado.value  === usuario.nombreUsuario && contrasenaIngresada.value === usuario.contrasena){

                alert("bienvenido " + usuario.nombre);
                usuarioExistente = true;
                usuarioLogueado = usuario;
                usuarioLogueadoJSON = JSON.stringify(usuarioLogueado);
                localStorage.setItem("usuarioOn", usuarioLogueadoJSON);
                window.location.href = "./pages/inicio.html";
                break
            }
        }
        
        if (!usuarioExistente && usuarioIngresado.value !== "" && contrasenaIngresada.value !== "") {
            alert("Datos incorrectos, intenta nuevamente");
        }
      
    }
)
            
    const registro = document.getElementById("registro")

    registro.addEventListener("click", () => {
        window.location.href = "./pages/registro.html"
    })


const ContrasenaOlvidada = document.getElementById("contrasenaOlvidada")
ContrasenaOlvidada.addEventListener("click", () => {
    window.location.href = "./pages/recuperacion.html"
})
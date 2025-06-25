let usuariosRecuperados = localStorage.getItem("arrayDeUsuarios")
let Usuarios = JSON.parse(usuariosRecuperados)
const carterasJSON = localStorage.getItem("arrayDeCarteras")
const Carteras = JSON.parse(carterasJSON)
console.log(Usuarios);
const UsuarioCreado =[]
const carteraNueva = []



let usuarioRegistradoJSON
const NuevoNombre = document.getElementById("registroNombre")
const NuevoUsuario = document.getElementById("registroUsuario")
const ContraseñaUsuarioNuevo = document.getElementById("registroContrasena")
const RepetirContraseña = document.getElementById("repetirContrasena")
const PalabraSecreta = document.getElementById("palabraSecreta")
const Boton = document.getElementById("botonRegistro")

let usuarioRegistrado


class crearUsuario{
    constructor(NuevoNombre, NuevoUsuario, ContraseñaUsuarioNuevo, PalabraSecreta){
        this.nombre = NuevoNombre.value,
        this.nombreUsuario = NuevoUsuario.value,
        this.contrasena = ContraseñaUsuarioNuevo.value,
        this.palabraSecreta = PalabraSecreta.value
    }
}

class crearCartera{
    constructor(Nombre, Ticker, Precio, Cantidad){
        this.nombre = Nombre,
        this.ticker = Ticker,
        this.precio = Precio,
        this.cantidad = Cantidad

    }
}

Boton.addEventListener("click", (event)=>{
    event.preventDefault();
   
    const usuarioExistente = Usuarios.find(e => e.nombreUsuario === NuevoUsuario.value)

    
    if(usuarioExistente){
        alert("Nombre de usuario ya utilizado!! Por favor elija otro.")
    }
    else if(ContraseñaUsuarioNuevo.value !== RepetirContraseña.value){
        alert("Las contraseñas no coinciden!!")
    }else
    {
    const usuarioRegistrado = new crearUsuario(NuevoNombre, NuevoUsuario, ContraseñaUsuarioNuevo, PalabraSecreta);
    const carteraNueva = new crearCartera(Nombre, Ticker, Precio, Cantidad)

    Carteras.push(carteraNueva)
    const Carteras = JSON.stringify(Carteras)
    localStorage.setItem("arrayDeCarteras", CarterasJSON)

    Usuarios.push(usuarioRegistrado)
    Usuarios = JSON.stringify(Usuarios)
    localStorage.setItem("arrayDeUsuarios", Usuarios)
    console.log(UsuarioCreado);
    alert("Registro Exitoso! Redireccionando...")
    window.location.replace("../index.html")
    }

})






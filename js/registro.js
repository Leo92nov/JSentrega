let usuariosRecuperados = localStorage.getItem("arrayDeUsuarios")
let Usuarios = JSON.parse(usuariosRecuperados)
let carterasJSON = localStorage.getItem("arrayDeCarteras")
let Carteras = JSON.parse(carterasJSON)
console.log(Carteras);

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
    constructor(NuevoNombre, NuevoUsuario, ContraseñaUsuarioNuevo, PalabraSecreta, liquidez){
        this.nombre = NuevoNombre.value,
        this.nombreUsuario = NuevoUsuario.value,
        this.contrasena = ContraseñaUsuarioNuevo.value,
        this.palabraSecreta = PalabraSecreta.value
        this.liquidez = liquidez
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
    const usuarioRegistrado = new crearUsuario(NuevoNombre, NuevoUsuario, ContraseñaUsuarioNuevo, PalabraSecreta, 0);
    const carteraNueva = new crearCartera(0, 0, 0, 0)
    console.log(carteraNueva);
    

    Carteras.push(carteraNueva)
    let CarterasJSON = JSON.stringify(Carteras)
    console.log(Carteras);
    
    localStorage.setItem("arrayDeCarteras", CarterasJSON)

    Usuarios.push(usuarioRegistrado)
    Usuarios = JSON.stringify(Usuarios)
    localStorage.setItem("arrayDeUsuarios", Usuarios)
    console.log(UsuarioCreado);
    alert("Registro Exitoso! Redireccionando...")
    window.location.replace("../index.html")
    }

})






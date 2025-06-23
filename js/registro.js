let usuariosRecuperados = localStorage.getItem("arrayDeUsuarios")
const Usuarios = JSON.parse(usuariosRecuperados)
console.log(Usuarios);
const UsuarioCreado =[]




let usuarioRegistradoJSON
const NuevoNombre = document.getElementById("registroNombre")
const NuevoUsuario = document.getElementById("registroUsuario")
const ContraseñaUsuarioNuevo = document.getElementById("registroContrasena")
const RepetirContraseña = document.getElementById("repetirContrasena")
const Boton = document.getElementById("botonRegistro")
let usuarioRegistrado


class crearUsuario{
    constructor(NuevoNombre, NuevoUsuario, ContraseñaUsuarioNuevo){
        this.Nombre = NuevoNombre.value,
        this.Usuario = NuevoUsuario.value,
        this.Contraseña = ContraseñaUsuarioNuevo.value
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
    const usuarioRegistrado = new crearUsuario(NuevoNombre, NuevoUsuario, ContraseñaUsuarioNuevo);

    UsuarioCreado.push(usuarioRegistrado)
    usuarioRegistradoJSON = JSON.stringify(UsuarioCreado[0])
    localStorage.setItem("usuario nuevo", usuarioRegistradoJSON)
    console.log(UsuarioCreado);
    alert("Registro Exitoso! Redireccionando...")
    window.location.replace("./inicio.html")

    }

})






let UsuarioCreado = []
console.log(UsuarioCreado);

const NuevoNombre = document.getElementById("registroNombre")
const NuevoUsuario = document.getElementById("registroUsuario")
const ContraseñaUsuarioNuevo = document.getElementById("registroContrasena")
const RepetirContraseña = document.getElementById("repetirContrasena")
const Boton = document.getElementById("botonRegistro")

class crearUsuario{
    constructor(NuevoNombre, NuevoUsuario, ContraseñaUsuarioNuevo){
        this.Nombre = NuevoNombre.value,
        this.Usuario = NuevoUsuario.value,
        this.Contraseña = ContraseñaUsuarioNuevo.value
    }
}


Boton.addEventListener("click", (event)=>{
    event.preventDefault();
    const usuarioRegistrado = new crearUsuario(NuevoNombre, NuevoUsuario, ContraseñaUsuarioNuevo);
    UsuarioCreado.push(usuarioRegistrado)
})
console.log(UsuarioCreado);





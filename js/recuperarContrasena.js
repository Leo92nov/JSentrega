let usuariosRecuperados = localStorage.getItem("arrayDeUsuarios")
const usuariosJSON = JSON.parse(usuariosRecuperados)
console.log(usuariosJSON);

const BotonRecuperar = document.getElementById("botonRecuperar")
const nombreUsuario = document.getElementById("nombreRecuperacion")
const palabraSecreta = document.getElementById("palabraSecreta")
const NuevaContrasena = document.getElementById("nuevaContrasena")
const RepetirNuevaContrasena = document.getElementById("repetirNuevaContrasena")



BotonRecuperar.addEventListener("click", (event) =>{
    event.preventDefault();

    let usuarioPassRecuperar = usuariosJSON.find(e => e.nombreUsuario === nombreUsuario.value);
    console.log(usuarioPassRecuperar);

    const index = usuariosJSON.findIndex(usuarioPassRecuperar => usuarioPassRecuperar.nombreUsuario === nombreUsuario.value);
    console.log(index);


    if(palabraSecreta.value === usuarioPassRecuperar.palabraSecreta && NuevaContrasena.value === RepetirNuevaContrasena.value){

        usuarioPassRecuperar.contrasena = RepetirNuevaContrasena.value

        usuariosJSON[index].contrasena = usuarioPassRecuperar.contrasena
        
        const Usuarios = JSON.stringify(usuariosJSON)
        localStorage.setItem("arrayDeUsuarios", Usuarios)

        console.log(usuarioPassRecuperar);
        
        alert("Contraseña actualizada")

       window.location.replace("../index.html")

    }else{

        alert("Error, verifique los datos ingresados")
    }

})



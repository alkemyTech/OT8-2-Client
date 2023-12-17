let contrasenia = document.getElementById("contrasenia");
let contrasenia2 = document.getElementById("contrasenia2");
let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let edad = document.getElementById("edad");
let correoElectronico = document.getElementById("correoElectronico");

function cambiarColorContrasenia(){
    if (contrasenia.value === contrasenia2.value){
        contrasenia2.style.borderColor="green";
      } else {
        contrasenia2.style.borderColor="red";
      }
}

let buttonRegistro = document.getElementById("buttonRegistro");

buttonRegistro.addEventListener("click", async () => {
        if ((contrasenia.value == contrasenia2.value) && (edad.value >= 18)){
            try{
                const response = await axios.post("/registerback", {
                    firstName : nombre.value,
                    lastName : apellido.value,
                    email : correoElectronico.value,
                    password : contrasenia2.value
                });
                if(response.status === 200){
                    window.open("http://localhost:3000/login", "_self");
                } else if (response.status === 403){
                    alert("0 - Debe ingresar Usuario y Clave Correctas");
                }
            } catch(error){
                console.log(response);
                alert("2 - Debe ingresar Usuario y Clave Correctas");
            }
        } else {
            alert("3 - Debe ingresar Usuario mayor de 18 y Clave Correctas");
        }
    
    });

let buttonLog = document.getElementById("buttonLog");


console.log("hello world!");
let correo = document.getElementById("inputEmail");
let contrasenia = document.getElementById("inputPassword");

buttonLog.addEventListener("click", async () => {
    try{
        const response = await axios.post("/loginback", {
            email: correo.value,
            password: contrasenia.value
            });
            
            if(response.status === 200){
                window.open("http://localhost:3000/", "_self");
                sessionStorage.setItem("token", "Bearer " + response.data.token);
                sessionStorage.setItem("userName", response.data.firstName + " " + response.data.lastName);
            } else if (response.status === 403){
                alert("0 - Debe ingresar Usuario y Clave Correctas");
            }
    } catch(error){
        alert("2 - Debe ingresar Usuario y Clave Correctas");
    }
    });


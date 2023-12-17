const express = require('express');
const bodyParser = require('body-parser');
const { fetchData, postData } = require("./src/service/apiService");
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/login', (req, res) => {
  res.sendFile(path.join( __dirname , 'public' , 'login.html'));
});

app.post("/loginback", async (req, res) => {
try{
  const data = req.body;
 
 // console.log(data);
   const response = await postData("auth/login",{
    email: data.email,
    password: data.password
  }); 
  console.log(response.status);
  if(response.status === 403){
    alert("ingrese la clave y la contraseña correcta")
  }
 
 if(response.data.token){
  sessionStorage.setItem("token", "Bearer " + response.data.token)
 }
 res.json(response);
} catch(error){
  console.log(error)
}
});

app.get('/', (req, res) => {
  res.sendFile(path.join( __dirname , 'public' , 'index.html'));
});



app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
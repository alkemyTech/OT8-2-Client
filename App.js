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


app.get('/plazoFijo', (req, res) => {
  res.sendFile(path.join( __dirname , 'public/plazoFijo' , 'plazoFijo.html'));
});
app.get('/cargarSaldo', (req, res) => {
  res.sendFile(path.join( __dirname , 'public/cargarSaldo' , 'cargarSaldo.html'));
});

app.get('/accountback', async (req, res) => {
    try {
        const request = req.query
        console.log("TOKEEEEEEEENNNNNN: "+request.token)
        const responce = await fetchData("/accounts", request.token)

        res.json(responce)
    }catch (e){
        console.log(e)
    }
})

app.post("/loginback", async (req, res) => {
try{
  const data = req.body;
   const response = await postData("auth/login",{
    email: data.email,
    password: data.password
  });
  res.json(response);
} catch(error){
  if(error.response.status === 403){
    res.status(403).json({error: "Error 403"});
  } else {
    console.log(error)
  }
}
});

app.post("/registerback", async (req, res) => {
  try{
    const data = req.body;
     const response = await postData("auth/register",{
      firstName : data.firstName,
      lastName : data.lastName,
      email : data.email,
      password : data.password
    });
    res.json(response);
  } catch(error){
    if(error.response.status === 403){
      res.status(403).json({error: "Error 403"});
    } else {
      console.log(error)
    }
  }
  });

app.get('/transactionback',async (req, res) => {
    try {
        const request = req.query
        console.log("TOKEEEEEEEENNNNNN: "+request.token)
        const responce = await fetchData("/accounts/balance", request.token)
        res.json(responce)
    }catch (e) {
        console.log(e)
    }
});

app.post('/depositback',async (req, res) => {
  try {
      const request = req.body
      console.log(request)
      const response = await postData("/transactions/deposit", {
        accountId : request.accountId,
        amount: request.amount,
        description: request.description
      } )
      console.log(response)
      res.json(response)
  }catch (e) {
      console.log(e)
  }
});


app.get('/', (req, res) => {
  res.sendFile(path.join( __dirname , 'public' , 'home.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
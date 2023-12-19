let monto = document.getElementById("monto");
let concepto = document.getElementById("concepto");
let depositobtn = document.getElementById("depositobtn");

 depositobtn.addEventListener( 'click', async()=>{
    console.log("done")
    const accountId = sessionStorage.getItem('accountId')
    const response = await axios.post('/depositback',{
        accountId : accountId,
        amount: monto.value,
        description: concepto.value
    })
    
})


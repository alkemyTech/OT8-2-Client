const cardAccount = document.getElementById("cardAccount")
const inicionBtn = document.getElementById("pills-inicio-tab")

let userName = document.getElementById('userName');
userName.textContent = sessionStorage.getItem("userName");

inicionBtn.addEventListener("click", async () => {
    cardAccount.innerHTML = "";
    console.log("Hola que tral")
    const token = sessionStorage.getItem("token");
    const response = await axios.get('/accountback', {
        params: {
            token: token
        }
    })


    response.data.map(account => {

        const card = `
        <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"> Saldo en ${account.currency + ': ' + account.balance}</h5>
            <p class="card-text"> Informacion de Cuenta.</p>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#account-${account.aaccountId}">
            Realizar Depósito en ${account.currency}
          </button>          
          <div class="modal fade" id="account-${account.aaccountId}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Depositar</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      
      <form id="cargaPagosForm">
        <div>
          <label for="monto">Monto:</label>
          <input type="number" id="monto" name="amount" placeholder="$" min="0" step="0.01">
        </div>
        <div>
          <label for="concepto">Concepto:</label>
          <input type="text" id="descripcion" name="description" maxlength="100" required>
        </div>
        
      </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
       
        <button id="depositobtn" type="button" class="btn btn-primary" account-id="${account.aaccountId}" data-bs-toggle="modal" data-bs-target="#account-${account.aaccountId}">
    Realizar Depósito en ${account.currency}
        </button>
        
        </div>
    </div>
  </div>
</div>
          </div>
        </div>
      </div>
      
      `

        cardAccount.innerHTML += card;

        const depositBtn = document.getElementById("depositobtn")
        const inputMonto = document.getElementById("monto")
        const inputConsepto = document.getElementById("descripcion")


        depositBtn.addEventListener('click', async (event) => {
            const target = event.target
            console.log(target)
            const accountId = target.getAttribute("account-id");
            if (accountId){
                console.log("ACCOUNT IDDDDDDDDDD: " + accountId)
            }else {
                console.log("NONONO, invesil")
            }
            const response = await axios.post("/depositback", {
                accountId: accountId,
                amount: inputMonto.value,
                description: inputConsepto.value
            })
            console.log("RESPUESTAAAAAAAAAAA: " + response)
            inicionBtn.click();
        })
    })
})




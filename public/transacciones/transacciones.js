
const invoqueTransactios = document.getElementById("pills-transacciones-tab")
const tbodyTransaction = document.getElementById("transactions-back")
const accountArsElement = document.getElementById("accountArs")
const accountUsdElement = document.getElementById("accountUsd")

invoqueTransactios.addEventListener("click", async () => {
    const token = sessionStorage.getItem("token");
    const response = await axios.get("/transactionback",{
        params: {
            token: token
        }
    });

    console.log(response.data)

    accountArsElement.innerHTML = "$ " + response.data.accountArs
    accountUsdElement.innerHTML = "U$D " + response.data.accountUsd

    response.data.history.map((tran) => {
        const rowTransaction = `<tr class="table-active"><td>${tran.transactionDate}</td><td>${tran.description}</td><td>${tran.type}</td><td>${tran.amount}</td></tr>`;

        tbodyTransaction.innerHTML += rowTransaction;
    })

})
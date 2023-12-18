const inicionBtn = document.getElementById("pills-inicio-tab")
const cardAccount = document.getElementById("cardAccount")

let userName = document.getElementById('userName');
userName.textContent = sessionStorage.getItem("userName");

let logout = document.getElementById('Logout');

logout.addEventListener("click", async () => {
    sessionStorage.removeItem("token");
});

inicionBtn.addEventListener("click", async () => {
    console.log("Hola que tral")
    const token = sessionStorage.getItem("token");
    const response = await axios.get('/accountback', {
        params: {
            token: token
        }
    })

    response.data.map(account => {
        const card = '< divclassName = "col-sm-6 mb-3 mb-sm-0" >< div className = "card" > < div className = "card-body" > < h5 className = "card-title" > '+ account.currencyEnum + ' ' + account.balance + ' < /h5><p className="card-text">With supporting text below as a natural lead-in to additional content.</p><a href="#" className="btn btn-primary">Go somewhere</a></div></div></div>'
        cardAccount.insertAdjacentHTML('afterbegin', card);
    })
})
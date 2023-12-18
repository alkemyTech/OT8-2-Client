const inputAmount = document.getElementById("amount");
const inputDescription = document.getElementById("description");
const btnSubmit = document.getElementById("btnSubmit");
const date= document.getElementById("date");

btnSubmit.addEventListener("click", async (e) => {

  console.log("click");
  const amount = inputAmount.value;
  const description = inputDescription.value;
  console.log(amount, description);
  if (amount>0) {
    e.preventDefault();
    try {
      const response = await axios.post("/payment", {
        amount:amount,
        currency:"ARS",
        description:description,
        token:sessionStorage.getItem("token")
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
});

btnClose.onclick = function() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target === modal) {
      modal.style.display = 'none';
  }
}

const getDate = (transactionDate) => {
  const date = transactionDate.slice(0, 10);
  const dateComponents = date.split("-");
  const d = dateComponents[2];
  const m = dateComponents[1];
  const y = dateComponents[0];
  const time = transactionDate.slice(11, 19);
  return d + "-" + m + "-" + y + " " + time;
};
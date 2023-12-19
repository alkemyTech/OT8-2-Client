const inputAmount = document.getElementById("amount");
const inputDescription = document.getElementById("description");
const btnSubmit = document.getElementById("btnSubmit");
const inputDate= document.getElementById("date");

btnSubmit.addEventListener("click", async (e) => {

  console.log("click");
  const amount = inputAmount.value;
  const description = inputDescription.value;
  const date= inputDate.value;
  console.log(amount, description,date);
  if (amount>0) {
    e.preventDefault();
    try {
      const response = await axios.post("/payment", {
        amount:amount,
        currency:"ARS",
        description:description,
        date: date,
        token:sessionStorage.getItem("token")
      });
    console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
});
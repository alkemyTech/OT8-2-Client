let userName = document.getElementById('userName');
userName.textContent = sessionStorage.getItem("userName");

let logout = document.getElementById('Logout');

logout.addEventListener("click", async () => {
    sessionStorage.removeItem("token");
});
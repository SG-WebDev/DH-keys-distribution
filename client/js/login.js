const usernameInput = document.querySelector("#Username");
const passwordInput = document.querySelector("#Password");
const loginButton = document.querySelector("#LoginSubmit");
const loginFrom = document.querySelector(".form");
const authInfo = document.querySelector(".authInfo");

loginButton.addEventListener("click", function () {
    let usernameValue = usernameInput.value;
    let passwordValue = passwordInput.value;
    console.log(usernameValue);
    console.log(passwordValue);
    // TO DO handle API
    authInfo.style.zIndex = "1";
    loginFrom.classList.add("form--hide");
    authInfo.classList.add("authInfo--show");
});

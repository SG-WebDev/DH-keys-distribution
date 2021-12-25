const usernameInput = document.querySelector("#Username");
const passwordInput = document.querySelector("#Password");
const loginButton = document.querySelector("#LoginSubmit");
const loginFrom = document.querySelector(".form");
const authInfo = document.querySelector(".authInfo");

// TO DO handle API
function auth(username, pass) {
    const authData = {
      username: username,
      password: pass
    };
    fetch('http://localhost:63342/DH-keys-distribution/client/test/auth.json', {
        method: 'POST',
        body: authData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status === "ok") {
                localStorage.setItem('userID', data.userID);
                localStorage.setItem('username', data.username);
                authInfo.style.zIndex = "1";
                loginFrom.classList.add("form--hide");
                authInfo.classList.add("authInfo--show");
            } else {
                alert("Authentication failed!")
            }
        });
}

loginButton.addEventListener("click", function () {
    let usernameValue = usernameInput.value;
    let passwordValue = passwordInput.value;
    console.log(usernameValue);
    console.log(passwordValue);
    auth(usernameValue, passwordValue);
});

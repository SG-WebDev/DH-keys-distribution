const usernameInput = document.querySelector("#Username");
const passwordInput = document.querySelector("#Password");
const loginButton = document.querySelector("#LoginSubmit");
const logoutButton = document.querySelector("#LogoutSubmit");
const loginFrom = document.querySelector(".form");
const authInfo = document.querySelector(".authInfo");

function auth(username, pass) {
    const authData = {
        UserName: username,
        Password: pass
    };
    console.log(authData)
    fetch('https://localhost:44310/api/account/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(authData)
    })
        .then(response => response)
        .then(data => {
            console.log(data);
            if (data.ok) {
                login();
                localStorage.setItem('username', username);
                getChat();
            } else {
                alert("Login failed")
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Authentication failed!")
        });
}

function login() {
    fetch('https://localhost:44310/api/account/getCurrentUser', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            localStorage.setItem('userID', data.id);
            authInfo.style.zIndex = "1";
            loginFrom.classList.add("form--hide");
            authInfo.classList.add("authInfo--show");
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Current User failed!")
        });
}

function logout() {
    fetch(`https://localhost:44310/api/account/logout`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((data) => {
            console.log(data);
            localStorage.removeItem("userID");
            localStorage.removeItem("username");
            authInfo.style.zIndex = "-1";
            loginFrom.classList.remove("form--hide");
            authInfo.classList.remove("authInfo--show");
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}


loginButton.addEventListener("click", function () {
    let usernameValue = usernameInput.value;
    let passwordValue = passwordInput.value;
    console.log(usernameValue);
    console.log(passwordValue);
    auth(usernameValue, passwordValue);
});

logoutButton.addEventListener("click", function () {
    logout();
});

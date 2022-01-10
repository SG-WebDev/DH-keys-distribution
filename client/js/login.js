const usernameInput = document.querySelector("#Username");
const passwordInput = document.querySelector("#Password");
const loginButton = document.querySelector("#LoginSubmit");
const logoutButton = document.querySelector("#LogoutSubmit");
const loginFrom = document.querySelector(".form");
const authInfo = document.querySelector(".authInfo");
const chatWrapper = document.querySelector("#ChatWrapper");

const users = [
    {
        userID: 1,
        username: "Joe",
        password: "test1234",
        privateKey: "testPrivateKey",
        publicKey: "testPublicKey",
    },
    {
        userID: 2,
        username: "Doris",
        password: "test1234",
        privateKey: "testPrivateKey",
        publicKey: "testPublicKey",
    },
    {
        userID: 3,
        username: "Bob",
        password: "test1234",
        privateKey: "testPrivateKey",
        publicKey: "testPublicKey",
    },
    {
        userID: 4,
        username: "Travis",
        password: "test1234",
        privateKey: "testPrivateKey",
        publicKey: "testPublicKey",
    },
];

console.log(users);
function auth(username, pass) {
    console.log(username);
    console.log(pass);
    let logged = false;
    users.forEach((user) => {
        if(username === user.username && pass === user.password) {
            localStorage.setItem('userID', user.userID);
            localStorage.setItem('username', user.username);
            authInfo.style.zIndex = "1";
            loginFrom.classList.add("form--hide");
            authInfo.classList.add("authInfo--show");
            chatWrapper.classList.remove("section--disabled");
            logged = true;
        }
    });
    if (!logged) {
        alert("Authentication failed!");
    }
}

function logout() {
    localStorage.removeItem("userID");
    localStorage.removeItem("username");
    authInfo.style.zIndex = "-1";
    loginFrom.classList.remove("form--hide");
    authInfo.classList.remove("authInfo--show");
    chatWrapper.classList.add("section--disabled");
}


loginButton.addEventListener("click", function () {
    let usernameValue = usernameInput.value;
    let passwordValue = passwordInput.value;
    auth(usernameValue, passwordValue);
});

logoutButton.addEventListener("click", function () {
    logout();
});

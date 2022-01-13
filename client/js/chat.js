const signalR = require("@microsoft/signalr");
var login = require('./login.js');
var cipher = require('./cipher.js');


const messageInput = document.querySelector("#MessageValue");
const messageButton = document.querySelector("#MessageSubmit");
const chatView = document.querySelector("#Chat");

function getChat() {
    const currentUsername = localStorage.getItem("username");
    fetch('https://localhost:44310/api/chat', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log("Raw message: " + data.at(-1).message);   //
            while (chatView.firstChild) {
                chatView.removeChild(chatView.firstChild);
            }


            let mess;
            data.forEach((x) => {
                try {
                    mess = cipher.decrypt(x.message);
                    x.message = mess;
                } catch {
                    x.message = x.message;
                }
            });
           

            data.forEach(message => {
                let messageClass;
                if (message.userName === currentUsername) {
                    messageClass = "message message--own";
                } else {
                    messageClass = "message message--other";
                }
                let messageHTML =
                    `<div class="${messageClass}">
                    <div class="message__Author">${message.userName}</div>
                    <div class="message__Value">${message.message}</div>
                    <div class="message__Time">${message.date}</div>
                </div>`;
                chatView.insertAdjacentHTML("beforeend", messageHTML);
                chatView.scrollTop = chatView.scrollHeight;
            })
        });
}

messageButton.addEventListener("click", function() {
    let messageValue = messageInput.value;
    let userr = login.userGet();
    const messageData = {
        //UserID: localStorage.getItem('userID'),            //
        //UserName: localStorage.getItem('username'),         //
        UserID: userr.userID,
        UserName: userr.username,
        message: cipher.encrypt(messageValue),             //   
    };
    console.log(messageData);
    if(messageValue) {
        fetch('https://localhost:44310/api/chat', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(messageData)
        })
            .then(response => response)
            .then(data => {
                console.log(data);

            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Something went wrong!")
            });
    } else {
        alert("Write a message first!")
    }

});

function syncChat() {
    let connection = new signalR.HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Information)
        .withUrl("https://localhost:44310/message")
        .build();

    connection.start();
    connection.on("NewMessage", () => {
        getChat();
    });
}

getChat();
syncChat();

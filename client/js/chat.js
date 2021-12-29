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
    const messageData = {
        UserID: localStorage.getItem('userID'),
        message: messageValue
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
                while (chatView.firstChild) {
                    chatView.removeChild(chatView.firstChild);
                }
                getChat();
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Something went wrong!")
            });
    } else {
        alert("Write a message first!")
    }

});

getChat();

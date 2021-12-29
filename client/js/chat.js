const messageInput = document.querySelector("#MessageValue");
const messageButton = document.querySelector("#MessageSubmit");
const chatView = document.querySelector("#Chat");

// TO DO Handle API
function getChat() {
    const currentUsername = localStorage.getItem("username");
    fetch('https://localhost:44310/api/chat', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // data.forEach(message => {
            //     let messageClass;
            //     if (message.author === currentUsername) {
            //         messageClass = "message message--own";
            //     } else {
            //         messageClass = "message message--other";
            //     }
            //     let messageHTML =
            //         `<div class="${messageClass}">
            //         <div class="message__Author">${message.author}</div>
            //         <div class="message__Value">${message.text}</div>
            //         <div class="message__Time">${message.time}</div>
            //     </div>`;
            //     chatView.insertAdjacentHTML("beforeend", messageHTML);
            // })
        });
}

messageButton.addEventListener("click", function() {
    let messageValue = messageInput.value;
    console.log(messageValue);
    chatView.scrollTop = chatView.scrollHeight;
});

getChat();

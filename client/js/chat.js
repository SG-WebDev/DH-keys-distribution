const messageInput = document.querySelector("#MessageValue");
const messageButton = document.querySelector("#MessageSubmit");
const chatView = document.querySelector(".chat");

messageButton.addEventListener("click", function () {
    let messageValue = messageInput.value;
    console.log(messageValue);
    // TO DO handle API
    chatView.scrollTop = chatView.scrollHeight;
});

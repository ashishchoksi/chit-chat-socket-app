const socket = io();
let myname;
do {
    myname = prompt("Please Enter your name")
} while (!myname);

let textarea = document.querySelector("#textarea");
let msgDiv = document.querySelector('.message__area');

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
});

function sendMessage(m) {
    // create obj
    let msg = {
        user: myname,
        message: m.trim()
    };

    // append to current dom
    appendMsg(msg, 'outgoing');
    scrollToBottom();

    textarea.value = ''

    // send to server
    socket.emit('message', msg); // send to server.js
}

function appendMsg(msg, type) {

    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

    mainDiv.innerHTML = markup;
    msgDiv.appendChild(mainDiv);

}

// listen from socket
// message received
socket.on('message', (msg) => {
    appendMsg(msg, 'incoming');
    scrollToBottom();
});


function scrollToBottom() {
    msgDiv.scrollTop = msgDiv.scrollHeight;
}

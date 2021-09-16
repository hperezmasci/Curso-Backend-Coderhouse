const socket = io.connect();

function render(data) {
    const html = data.map((elem, index) => {
        //alert(JSON.stringify(elem, null, 2))
        return(`<div>
                <strong>${elem.mensaje.author}</strong>:
                <em>${elem.mensaje.text}</em>
                </div>`)
    }).join(" ");
    document.getElementById("messages").innerHTML = html
}

function addMessage(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('message', mensaje);
    return false;
}

socket.on("messages", (data) => {render(data)})
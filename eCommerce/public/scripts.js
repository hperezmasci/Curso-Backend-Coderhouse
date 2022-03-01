const socket = io.connect();

function renderChat(data) {
    const html = data.map((elem, index) => {
        return(`
            <div>
                <elem id="mail">${elem.mail} </elem>
                <elem id="ts">[${elem.ts}]: </elem>
                <elem id="msg">${elem.text}</elem>
            </div>
        `)
    }).join(" ");
    document.getElementById("messages").innerHTML = html
}

function addMessage(e) {
    const mail = document.getElementById('mail')
    if (!mail.value) {
        alert("Es necesario que ingrese su mail para usar el centro de mensajes.")
        return false
    }
    const text = document.getElementById('text')
    const message = {
        mail: mail.value,
        ts: new Date(Date.now()).toLocaleString().split(',')[0],
        text: text.value
    };
    socket.emit('message', message)
    text.value = ""
    return false
}

socket.on("messages", (data) => {renderChat(data)})
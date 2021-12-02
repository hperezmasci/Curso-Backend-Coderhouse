const socket = io.connect();

function renderProducts(data) {
    fetch('/getProducts.hbr').then(function (response) {
        return response.text();
    }).then(function (template) {
        const renderHtml = Handlebars.compile(template);
        document.getElementById("products").innerHTML =
            renderHtml({listExists: data.length, products: data})
    }).catch(function (err) {
        console.warn('Render error:', err);
    });
}

function addProduct(e) {
    const title = document.getElementById('title')
    const price = document.getElementById('price')
    const thumbnail = document.getElementById('thumbnail')
    const producto = {
        title: title.value,
        price: price.value,
        thumbnail: thumbnail.value,
    };
    socket.emit('product', producto);
    title.value = "";
    price.value = "";
    thumbnail.value = "";
    return false;
}

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

socket.on("products", (data) => {renderProducts(data)})

socket.on("messages", (data) => {renderChat(data)})
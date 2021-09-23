const socket = io.connect();

function render(data) {
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
    const producto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value,
    };
    socket.emit('product', producto);
    return false;
}

socket.on("products", (data) => {render(data)})
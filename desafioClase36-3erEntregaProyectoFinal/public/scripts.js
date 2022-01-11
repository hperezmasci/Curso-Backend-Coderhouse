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

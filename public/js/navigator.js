//Trang giới thiệu
function Introduce() {
    var ejsFilePath = '/page/introduce.ejs';
    var targetElement = document.getElementById('root');
    fetch(ejsFilePath)
        .then(response => response.text())
        .then(data => {
            targetElement.innerHTML = data;
        })
        .catch(error => console.error('Error fetching HTML file:', error));
}
//Trang sản phẩm
function ProductList() {
    var ejsFilePath = '/page/products.ejs';
    var root = document.getElementById('root');
    var data;
    axios.get('http://jul2nd.ddns.net/product').then((response) => {
        data = response.data;
        fetch(ejsFilePath)
            .then(response => response.text())
            .then(data => {
                const renderedHtml = ejs.render(data, {titlePage: 'Sản phẩm', data: response.data });
                root.innerHTML = renderedHtml;
            })
            .catch(error => console.error('Error fetching EJS file:', error));
    });
}
//Trang liên hệ
function Contact() {
    var ejsFilePath = '/page/contact.ejs';
    var root = document.getElementById('root');
    fetch(ejsFilePath)
        .then(response => response.text())
        .then(data => {
            const renderedHtml = ejs.render(data, {titlePage: 'Liên hệ'});
            root.innerHTML = renderedHtml;
        })
        .catch(error => console.error('Error fetching EJS file:', error));
}
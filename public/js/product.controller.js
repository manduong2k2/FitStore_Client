function ProductEdit(product_id) {
    var ejsFilePath = '/page/product/product.edit.ejs';
    var root = document.getElementById('root');
    axios.get('http://jul2nd.ddns.net/product/' + product_id).then((response) => {
        data = response.data;
        fetch(ejsFilePath)
            .then(response => response.text())
            .then(data => {
                const renderedHtml = ejs.render(data, { titlePage: 'Chỉnh sửa sản phẩm', product: response.data.product, solds: response.data.solds });
                root.innerHTML = renderedHtml;
                var script = document.createElement('script');
                script.src = '/js/fetchOpt.js';
                root.appendChild(script);
            })
            .catch(error => console.error('Error fetching EJS file:', error));
    });
}
function ProductDetail(product_id) {
    var ejsFilePath = '/page/product/product.detail.ejs';
    var root = document.getElementById('root');
    axios.get('http://jul2nd.ddns.net/product/' + product_id).then((response) => {
        data = response.data;
        fetch(ejsFilePath)
            .then(response => response.text())
            .then(data => {
                const renderedHtml = ejs.render(data, { titlePage: 'Thông tin sản phẩm', product: response.data.product, solds: response.data.solds });
                root.innerHTML = renderedHtml;
                var script = document.createElement('script');
                script.src = '/js/fetchOpt.js';
                root.appendChild(script);
            })
            .catch(error => console.error('Error fetching EJS file:', error));
    });
}
async function ProductDelete(product_id){
    var result = window.confirm("Bạn có muốn xoá sản phẩm này không?");
    if (result) {
        try {
            await axios.delete('http://jul2nd.ddns.net/product/' + product_id);
            // Yêu cầu xoá đã được xử lý, sau đó thực hiện ProductList()
            ProductList();
            alert("Đã xoá thành công");
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    } 
}
function showCreatePopup(){
    var ejsFilePath = '/page/product/product.create.ejs';
    var root = document.getElementById('root');
    fetch(ejsFilePath)
            .then(response => response.text())
            .then(data => {
                const renderedHtml = ejs.render(data);
                var popup = document.createElement('div');
                popup.id="popupContainer";
                popup.innerHTML = renderedHtml;
                root.appendChild(popup);
                fetchOptions();
            })
            .catch(error => console.error('Error fetching EJS file:', error));
}
function closeCreatePopup(){
    var root = document.getElementById('root');
    var popup = document.getElementById('popupContainer'); 

    if (popup) {
        root.removeChild(popup);
    }
}
function fetchOptions() {
    fetch("http://jul2nd.ddns.net/category")
        .then((res) => res.json())
        .then((data) => {
            // Bind data to the category select element
            const categorySelect = document.getElementById("category");
            data.forEach((category) => {
                const option = document.createElement("option");
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        })
        .catch((error) => console.error("Error fetching categories:", error));
    fetch("http://jul2nd.ddns.net/brand")
        .then((res) => res.json())
        .then((data) => {
            // Bind data to the brand select element
            const brandSelect = document.getElementById("brand");
            data.forEach((brand) => {
                const option = document.createElement("option");
                option.value = brand.id;
                option.textContent = brand.name;
                brandSelect.appendChild(option);
            });
        })
        .catch((error) => console.error("Error fetching brands:", error));
}
async function submitProductForm(event,method) {
    event.preventDefault();
    var productId="";
    var productName = document.getElementById("productName").value;
    var category = document.getElementById("category").value;
    var brand = document.getElementById("brand").value;
    var productImage = document.getElementById("productImage").files[0];
    var productPrice = document.getElementById("productPrice").value;
    var productInfo = document.getElementById("productInfo").value;
    var productStock = document.getElementById("productStock").value;

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("category_id", category);
    formData.append("brand_id", brand);
    formData.append("price", productPrice);
    formData.append("info", productInfo);
    formData.append("stock", productStock);
    if(productImage) formData.append("image", productImage);
    if(method==='PUT'){
        productId = document.getElementById('productId').value;
    }

    try {
        const response = await axios({
            method: method,
            url: "http://jul2nd.ddns.net/product/" + productId,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        console.log("Success:", response.data);

        if(method === 'PUT') {
            ProductList();
            alert('Cập nhật thành công');
        }
        if(method === 'POST'){
            closeCreatePopup();
            ProductList();
            alert('Thêm sản phẩm thành công');
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
async function IncreaseByOne(product_id,product_price){
    const account_id=getCookie('id');
    const response = await axios({
        method: 'PUT',
        url: "http://jul2nd.ddns.net/cart/" + product_id +'/'+account_id,
    });
    getCartNumber();
    document.getElementById('product'+product_id+'number').value++;
    document.getElementById('product'+product_id+'total').innerText=(document.getElementById('product'+product_id+'number').value*product_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    var updateTotal = parseInt(document.getElementById('hiddenBillTotal').value);
    updateTotal+=parseInt(product_price);
    document.getElementById('hiddenBillTotal').value=updateTotal;
    document.getElementById('billTotal').innerText=updateTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
async function DecreaseByOne(product_id,product_price){
    const account_id=getCookie('id');
    const response = await axios({
        method: 'PATCH',
        url: "http://jul2nd.ddns.net/cart/" + product_id +'/'+account_id,
    });
    getCartNumber();
    document.getElementById('product'+product_id+'number').value--;
    document.getElementById('product'+product_id+'total').innerText=(document.getElementById('product'+product_id+'number').value*product_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    var updateTotal = parseInt(document.getElementById('hiddenBillTotal').value);
    updateTotal-=parseInt(product_price);
    document.getElementById('hiddenBillTotal').value=updateTotal;
    document.getElementById('billTotal').innerText=updateTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
async function RemoveItem(product_id,product_price){
    var userResponse = confirm("Bạn có chắc muốn xoá sản phẩm này không?");
    if (userResponse) {
        const account_id=getCookie('id');
        const response = await axios({
            method: 'DELETE',
            url: "http://jul2nd.ddns.net/cart/" + product_id +'/'+account_id,
        });
        getCartNumber();
        var updateTotal = parseInt(document.getElementById('hiddenBillTotal').value);
        updateTotal-=parseInt(product_price)*document.getElementById('product'+product_id+'number').value;
        document.getElementById('hiddenBillTotal').value=updateTotal;
        document.getElementById('billTotal').innerText=updateTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        document.getElementById('product'+product_id+'item').remove();
        alert("Đã xoá sản phẩm khỏi giỏ hàng");
    }   
}
async function RemoveAllItem(){
    var userResponse = confirm("Bạn có chắc muốn xoá tất cả sản phẩm trong giỏ hàng không?");
    if (userResponse) {
        const account_id=getCookie('id');
        const response = await axios({
            method: 'DELETE',
            url: "http://jul2nd.ddns.net/cart/"+account_id,
        });
        getCartNumber();
        CartList();
        alert("Đã xoá tất cả sản phẩm khỏi giỏ hàng");
    }   
}

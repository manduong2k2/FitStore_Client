
async function IncreaseByOne(product_id, product_price) {
  const account_id = getCookie("id");
  const response = await axios({
    method: "PUT",
    url: "http://jul2nd.ddns.net/cart/" + product_id + "/" + account_id,
  });
  getCartNumber();
  document.getElementById("product" + product_id + "number").value++;
  document.getElementById("product" + product_id + "total").innerText = (
    document.getElementById("product" + product_id + "number").value *
    product_price
  )
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  var updateTotal = parseInt(document.getElementById("hiddenBillTotal").value);
  updateTotal += parseInt(product_price);
  document.getElementById("hiddenBillTotal").value = updateTotal;
  document.getElementById("billTotal").innerText = updateTotal
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  checkItemNumber(product_id);
}
async function DecreaseByOne(product_id, product_price) {
  const account_id = getCookie("id");
  const response = await axios({
    method: "PATCH",
    url: "http://jul2nd.ddns.net/cart/" + product_id + "/" + account_id,
  });
  getCartNumber();
  document.getElementById("product" + product_id + "number").value--;
  document.getElementById("product" + product_id + "total").innerText = (
    document.getElementById("product" + product_id + "number").value *
    product_price
  )
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  var updateTotal = parseInt(document.getElementById("hiddenBillTotal").value);
  updateTotal -= parseInt(product_price);
  document.getElementById("hiddenBillTotal").value = updateTotal;
  document.getElementById("billTotal").innerText = updateTotal
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  checkItemNumber(product_id);
}
async function RemoveItem(product_id, product_price) {
  var userResponse = confirm("Bạn có chắc muốn xoá sản phẩm này không?");
  if (userResponse) {
    const account_id = getCookie("id");
    const response = await axios({
      method: "DELETE",
      url: "http://jul2nd.ddns.net/cart/" + product_id + "/" + account_id,
    });
    getCartNumber();
    var updateTotal = parseInt(
      document.getElementById("hiddenBillTotal").value
    );
    updateTotal -=
      parseInt(product_price) *
      document.getElementById("product" + product_id + "number").value;
    document.getElementById("hiddenBillTotal").value = updateTotal;
    document.getElementById("billTotal").innerText = updateTotal
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    document.getElementById("product" + product_id + "item").remove();
    alert("Đã xoá sản phẩm khỏi giỏ hàng");
  }
}
async function RemoveAllItem() {
  var userResponse = confirm(
    "Bạn có chắc muốn xoá tất cả sản phẩm trong giỏ hàng không?"
  );
  if (userResponse) {
    const account_id = getCookie("id");
    const response = await axios({
      method: "DELETE",
      url: "http://jul2nd.ddns.net/cart/" + account_id,
    });
    getCartNumber();
    CartList();
    alert("Đã xoá tất cả sản phẩm khỏi giỏ hàng");
  }
}
function checkItemNumber(product_id) {
  var number = document.getElementById("product" + product_id + "number").value;
  var button = document.getElementById("product" + product_id + "button");
  if (number === "1") button.classList.add("disable-btn");
  else button.classList.remove("disable-btn");
}
//trang cart
function Payment() {
  var account_id = getCookie("id");
  var ejsFilePath = "/page/cart/cart.pay.ejs";
  var root = document.getElementById("root");
  var data;
  var account;
  axios.get("http://jul2nd.ddns.net/account/" + account_id).then((response) => {
    account = response.data;
  });
  axios.get("http://jul2nd.ddns.net/cart/" + account_id).then((response) => {
    data = response.data;
    fetch(ejsFilePath)
      .then((response) => response.text())
      .then((data) => {
        const renderedHtml = ejs.render(data, {
          data: response.data,
          account: account
        });
        root.innerHTML = renderedHtml;
        var cartController = document.createElement("script");
        cartController.src = "/js/cart.controller.js";
        root.appendChild(cartController);
        document.getElementById("titlePage").innerHTML = "Thanh toán";
      })
      .catch((error) => console.error("Error fetching EJS file:", error));
  });
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

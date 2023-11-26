document.addEventListener('DOMContentLoaded', function () {
    const idCookieExists = document.cookie.includes('id=');
    const accountImage = document.getElementById('accountImage');
    const imageFromCookie = getCookie('image');
    if (imageFromCookie) {
      accountImage.src = decodeURIComponent(imageFromCookie);
    }
    const dropdownMenu = document.querySelector('.drop1');
    if (idCookieExists) {
      // Thực hiện logic khi cookie 'id' tồn tại
      dropdownMenu.innerHTML = `
        <li><a class="dropdown-item" href="/account/detail">Quản lý tài khoản</a></li>
        <li><a class="dropdown-item" href="/logout">Đăng xuất</a></li>
      `;
    } else {
      // Thực hiện logic khi cookie 'id' không tồn tại
      dropdownMenu.innerHTML = `
        <li><a class="dropdown-item" href="/signin">Đăng nhập</a></li>
        <li><a class="dropdown-item" href="/signup">Đăng ký</a></li>
      `;
    }
  });
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
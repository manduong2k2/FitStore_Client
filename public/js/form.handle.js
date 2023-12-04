function switchToForm2(event) {
    event.preventDefault();
    if (validateForm1()) {
      document.getElementById("form1").style.display = "none";
      document.getElementById("form2").style.display = "block";
    }
  }
  function switchToForm1(event) {
    event.preventDefault();
    document.getElementById("form1").style.display = "block";
    document.getElementById("form2").style.display = "none";
  }
  function validateForm1() {
    var accountName = document.getElementById("accountName").value;
    var accountEmail = document.getElementById("accountEmail").value;
    if (accountName === "" || accountEmail === "") {
      alert(
        "Vui lòng nhập thông tin cho Form 1 trước khi chuyển sang Form 2."
      );
      return false;
    }
    return true;
  }
  function submitForm(event,method) {
    event.preventDefault();
    var accountId = "";
    var accountUsername = document.getElementById("accountUsername").value;
    if(method === 'POST') {var accountPassword = document.getElementById("accountPassword").value;
    var checkPassword = document.getElementById("checkPassword").value;}
    var accountImage = document.getElementById("profileImage").files[0];
    var accountEmail = document.getElementById("accountEmail").value;
    var accountPhone = document.getElementById("accountPhone").value;
    var accountName = document.getElementById("accountName").value;
    var accountWard = document.getElementById("wards").value;
    if (accountPassword !== checkPassword) {
      window.alert("Mật khẩu nhập lại không đúng!!!");
    } else if (
      accountUsername === "" ||
      accountPassword === "" ||
      checkPassword === ""
    ) {
      alert("Vui lòng nhập thông tin cho Form 2 trước khi hoàn tất.");
    } else {
      const formData = new FormData();
      formData.append("username", accountUsername);
      if(method === 'POST') formData.append("password", accountPassword);
      if(accountImage) formData.append("image", accountImage);
      else formData.append("image", document.getElementById("Avt").src);
      formData.append("email", accountEmail);
      formData.append("phone", accountPhone);
      formData.append("name", accountName);
      formData.append("ward_code",accountWard);
      if(method==='PUT'){
        accountId = document.getElementById('accountId').value;
        formData.append("id",accountId);
      }
      fetch("http://jul2nd.ddns.net/account/"+accountId, {
        method: method,
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Success:", data);
          if(method === 'POST') window.location.href = "/signin";
          else PersonalAccountEdit();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
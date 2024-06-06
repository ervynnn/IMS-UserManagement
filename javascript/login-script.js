document.querySelector(".button-login").addEventListener("click", function() {
    window.location.href = "user-management.html";
  });

document.querySelector(".logo").addEventListener("click", function() {
    window.location.href = "../index.html";
  });

const passwordInput = document.getElementById("password");
const showPasswordCheckbox = document.querySelector('.div-showpass input[type="checkbox"]');
  
  showPasswordCheckbox.addEventListener("click", function() {
    if (this.checked) {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  });
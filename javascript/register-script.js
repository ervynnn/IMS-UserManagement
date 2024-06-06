document.querySelector(".button-login").addEventListener("click", function() {
    window.location.href = "user-management.html";
  });

  document.querySelector(".logo").addEventListener("click", function() {
    window.location.href = "../index.html";
  });

const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const showPasswordCheckbox = document.querySelector('.div-showpass input[type="checkbox"]');
  
  showPasswordCheckbox.addEventListener("click", function() {
    if (this.checked) {
      passwordInput.type = "text";
      confirmPasswordInput.type = "text";
    } else {
      passwordInput.type = "password";
      confirmPasswordInput.type = "password";
    }
  });
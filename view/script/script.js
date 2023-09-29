document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // You can add your authentication logic here.
    // For this example, we'll just check for a dummy username and password.
    if (username === "admin" && password === "password") {
      // Redirect to a dashboard or home page on successful login
      window.location.href = "../page/homepage.html";
    } else {
      errorMessage.textContent = "Invalid username or password.";
      errorMessage.style.display = "block";
    }
  });
});

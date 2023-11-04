document
  .getElementById("registerButton")
  .addEventListener("click", function () {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Password complexity rules
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#_A-a]).{8,}$/;

    if (!passwordRegex.test(password)) {
      alert(
        "รหัสผ่านต้องมีอักขระอย่างน้อย 8 ตัว และต้องประกอบด้วยตัวเลขและตัวอักษร"
      );
      return;
    }

    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Registration successful") {
          alert("Registration successful!");
        } else {
          alert("Registration failed.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Registration failed.");
      });
  });

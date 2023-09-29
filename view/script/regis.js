// // app.js

// document.addEventListener("DOMContentLoaded", () => {
//   const userForm = document.getElementById("userForm");
//   const userList = document.getElementById("userList");

//   // Function to fetch users from Go server
//   function fetchUsers() {
//     fetch("/api/users")
//       .then((response) => response.json())
//       .then((data) => {
//         userList.innerHTML = "";
//         data.forEach((user) => {
//           const li = document.createElement("li");
//           li.textContent = `Username: ${user.username}, Email: ${user.email}`;
//           userList.appendChild(li);
//         });
//       })
//       .catch((error) => console.error("Error:", error));
//   }

//   // Event listener for form submission
//   userForm.addEventListener("submit", (event) => {
//     event.preventDefault();

//     const username = document.getElementById("username").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     // Create a new user object
//     const newUser = {
//       username,
//       email,
//       password,
//     };

//     // Send a POST request to create a new user
//     fetch("/api/users", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newUser),
//     })
//       .then((response) => {
//         if (response.status === 201) {
//           console.log("User created successfully");
//           fetchUsers(); // Refresh the user list
//         } else {
//           console.error("Failed to create user");
//         }
//       })
//       .catch((error) => console.error("Error:", error));
//   });

//   // Fetch and display users on page load
//   fetchUsers();
// });

// JavaScript for registration button click event
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
      return; // Don't proceed with registration if password is invalid
    }

    // Send a registration request to the server
    // You can use fetch or another method to send the data to your server
    // Example:
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
          // Redirect to a login page or perform other actions after successful registration
        } else {
          alert("Registration failed.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Registration failed.");
      });
  });

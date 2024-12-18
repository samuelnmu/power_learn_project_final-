// public/script.js

// Handle Sign Up Form Submission
document
  .getElementById("signUp-form")
  ?.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const name = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeat-password").value;

    // Check if the passwords match
    if (password !== repeatPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      // Send data to server via fetch API
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      // Handle the server response
      const data = await response.json();
      console.log("Server response:", data); // Debugging server response

      if (response.ok) {
        alert("New user created successfully!");
        //  redirect to another page (like sign-in page)
        window.location.href = "/signIn"; // Redirect to the sign-in page after successful registration
      } else {
        alert("Error: " + data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register user. Please try again.");
    }
  });

  
// Handle Sign In Form Submission
document.getElementById("loginForm")?.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      // Send data to server via fetch API for login
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Handle the server response
      const data = await response.json();
      console.log("Server response:", data); // Debugging server response

      if (response.ok) {
        alert("Sign-in successful!");
        // Redirect to the dashboard after successful login
        window.location.href = "/dashboard"; // Redirect to dashboard page
      } else {
        alert("Error: " + data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to sign in. Please try again.");
    }
  });

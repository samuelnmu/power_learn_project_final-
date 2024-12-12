// Form validation for signUp
document.getElementById("signUpForm").addEventListener('submit', function(event){
    event.preventDefault()//prevent form submission

    const fullName = document.getElementById("fullName").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const repeatPassword = document.getElementById("repeat-password")

    if(fullName.length < 3){
        alert("Fullname must be at least 3 characters long");
        return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)){
        alert("Please enter a valid email address");
        return
    }

    if(password.length < 6){
        alert("Password must be atleast 6 characters long!");
        return
    }

    if(password !== repeatPassword){
        alert("Password does not match!")
        return
    }

    // If alidation passes, submit the form to the backend
    const userData = {fullName, email, password};
    
    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Registration successful!");
          // Redirect or perform other actions
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
});


// form validation for signIn
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Basic validation
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // Submit login data to backend
    const loginData = { email, password };

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Login successful!");
          // Redirect or perform other actions
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  });

  // Fetch API: If all validations pass, we send a POST request to our backend endpoint (/api/register) with user data in JSON format.


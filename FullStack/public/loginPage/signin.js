// Attach event listener to form submission
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent form from submitting traditionally
  
      const email = document.getElementById('Email').value;
      const password = document.getElementById('Password').value;
  
      if (!email || !password) {
        alert('Please fill in all fields.');
        return;
      }
  
      // Mock user authentication
      if (email === "test@example.com" && password === "password123") {
        alert('Sign In Successful!');
      } else {
        alert('Invalid email or password.');
      }
    });
  });
  
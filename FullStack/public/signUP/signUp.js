document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signUpForm');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent form submission
  
      const name = document.getElementById('Name').value.trim();
      const email = document.getElementById('Email').value.trim();
      const password = document.getElementById('Password').value;
      const repeatPassword = document.getElementById('RepeatPassword').value;
  
      // Validate inputs
      if (!name || !email || !password || !repeatPassword) {
        alert('Please fill in all fields.');
        return;
      }
  
      if (password !== repeatPassword) {
        alert('Passwords do not match.');
        return;
      }
  
      // Mock account creation
      alert('Account created successfully!');
    });
  });
  
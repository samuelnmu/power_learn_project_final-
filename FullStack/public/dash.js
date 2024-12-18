// Toggle sidebar visibility
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("collapsed");
  const menuToggle = document.querySelector(".menu-toggle");
  menuToggle.classList.toggle("collapsed");
}

// Theme toggle function with moon icon
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");
  const sidebar = document.getElementById("sidebar");
  const contentArea = document.getElementById("content-area");

  if (body.classList.contains("theme-dark")) {
    body.classList.remove("theme-dark");
    themeIcon.textContent = "🌙"; // Moon icon for light theme
    sidebar.classList.remove("theme-dark");
    contentArea.classList.remove("theme-dark");
  } else {
    body.classList.add("theme-dark");
    themeIcon.textContent = "🌞"; // Sun icon for dark theme
    sidebar.classList.add("theme-dark");
    contentArea.classList.add("theme-dark");
  }
}

// Handle form submission and update profile
document.getElementById("investorForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the values from the form fields
    const username = document.getElementById("username").value;

    // Update the profile name in the sidebar
    const profileName = document.getElementById("profile-name");
    profileName.textContent = username ? username : "Username"; // Default if empty
  });

// Logout function
function logout() {
  alert("You have logged out!");
  //  logout logic here ( redirect to login page)
}

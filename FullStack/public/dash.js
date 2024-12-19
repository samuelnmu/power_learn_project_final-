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


// Function to handle logout
async function logoutUser() {
  try {
    // Send a GET request to the logout route
    const response = await fetch("/auth/logout", {
      method: "GET",
    });

    // Check if the response is okay
    if (response.ok) {
      // If logout is successful, redirect to home page
      window.location.href = "/pages/home.html";
    } else {
      alert("Logout failed. Please try again.");
    }
  } catch (error) {
    console.error("Error during logout:", error);
    alert("Logout failed. Please try again.");
  }
}

// Data for the chart
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [{
    label: 'Investment Value',
    data: [65, 59, 80, 81, 56, 55], //Y-axis data
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1
  }]
};

// Config for the chart
const config = {
  type: 'line',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};

// Create the chart
const investmentChart = new Chart(
  document.getElementById("investmentChart"), config
);


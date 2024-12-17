// Import packages
const express = require("express");
const session = require("express-session");
const MYSQLStore = require("connect-mysql2")(session);
const path = require("path");
require("dotenv").config();

const db = require("./config/db"); // Database configuration
const authRoutes = require("./routes/auth"); // Authentication routes

// Initialize the server
const app = express();

// Serve static files (CSS, JS, images, etc.) from the 'public' directory
app.use(express.static(path.join(__dirname, "../public"))); // 'public' is outside 'server' folder, so adjust the path

// Set up middleware
app.use(express.json());

// Set up session
app.use(
  session({
    key: "user_id",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // store: new MYSQLStore({}, db) // Uncomment if you want to store sessions in MySQL
  })
);

// Routes for serving HTML pages
app.get("/", (req, res) => {
  // Serve home.html from the 'public/pages' folder
  res.sendFile(path.join(__dirname, "../public", "pages", "home.html"));
});

app.get("/signUp", (req, res) => {
  // Serve signUp.html from the 'public/pages' folder
  res.sendFile(path.join(__dirname, "../public", "pages", "signUp.html"));
});

app.get("/signIn", (req, res) => {
  // Serve signIn.html from the 'public/pages' folder
  res.sendFile(path.join(__dirname, "../public", "pages", "signIn.html"));
});

// Use the auth routes for user registration and login
app.use("/auth", authRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

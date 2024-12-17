const bcrypt = require("bcryptjs"); // Corrected typo here
const db = require("../config/db");

// User registration function
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  console.log("Received data:", req.body); // Debugging incoming data

  try {
    // Check if the user already exists
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length > 0) {
      return res.status(401).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the record into the database
    await db.execute(
      "INSERT INTO users (name, email, password) VALUES (?,?,?)",
      [name, email, hashedPassword]
    );

    return res.status(201).json({ message: "User Registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error); // Log the error for debugging
    res.status(500).json({ message: "An error occurred", error });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the password with the hashed password in the database
    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Store user info in session for authentication
    req.session.userId = user.id;

    // Send success response
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login", error });
  }
};

// Logout user (this can be expanded as needed)
exports.logoutUser = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    res.status(200).json({ message: "Logout successful" });
  });
};

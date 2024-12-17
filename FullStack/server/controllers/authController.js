const db = require("../config/db");
const bycryp = require("bcryptjs");

// user registration function

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if the user exists
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length > 0) {
      return res.status(401).json({ message: "User already exists" });
    }

    // hash the password
    const hashedPassword = await bycryp.hash(password, 10);

    // insert the record to the database

    await db.execute(
      "INSERT INTO users (name, email, password) VALUES (?,?,?) ",
      [name, email, hashedPassword]
    );

    return res.status(201).json({ message: "User Registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occure", error });
  }
};

// Login user
exports.loginUser = async (req, res) => {};

// logout user
exports.logoutUser = async (req, res) => {};

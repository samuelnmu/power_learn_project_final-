const db = require("./db") //connect to db
const bcrypt = require("bcryptjs"); //hashing the password
const{validationResult} = require("express-validator"); //validation

// function for register User
exports.registerUser = async (req,res) =>{
    // check if any errors present
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({message: "Please correct input errors", errors: errors.array()});
    }

    // fetch inputs from the request body
    const{fullname, email, password} = req.body;
    
    try {
        // check if user exists
        const [user] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        if(user.length > 0){
            return res.status(401).json({message: "User already exists"});
        }

        // prepare our data for hashing
        const hashedPassword = await bcrypt.hash(password, 10);
        // insert the records
        await db.execute("INSERT INTO users (fullname, email, password) VALUES (?,?,?)", [fullname, email, hashedPassword]);
        
        return res.status(200).json({message:"User registered successfully."});
    } catch (error) {
        console.error(error);
        res.status(501).json({message: "An error occured during registration", error: error.message});
    }
}

// function for login
exports.loginUser = async (req, res) =>{
    // fetch email and password from the req body
    const {email, password} = req.body;

    try {
        // check if user exists
        const [user] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        if(user.length === 0){
            return res.status(401).json({message:"User does not exists"});
        }

        // check if the password match
        const isMatch = await bcrypt.compare(password, user[0].password);
        if(!isMatch){
            return res.status(401).json({message:"The password does not match"});
        }

        // create a session
        req.session.userId = user[0].id;
        req.session.name = user[0].name;
        req.session.email = user[0].email;

        return res.status(201).json({message: "User logged in successfully"});
    } catch (error) {
        console.error(error);
        return res.status(501).json({message:"An error occured during login!", error: error.message});
    }
}

// function for logout
exports.logoutUser = async (req, res) =>{
    req.session.destroy( (err) =>{
        if(err){
            console.error(err);
            return res.status(401).json({message:"An error occured during logging out!", error: error.message});
        }
        return res.status(201).json({message:"Logged out successfully"});
    });
}

// function for getting user information for editing
exports.getUser = async (req,res) =>{
    // check whether user is logged in
    if(!req.session.userId){
        return res.status(401).json({message:"Unauthorized!"});
    }

    try {
        // fetch user
        const [user] = await db.execute("SELECT fullname, email, password FROM users WHERE id = ?", [req.session.userId]);
        if(user.length === 0){
            return res.status(401).json({message:"User not found"});
        }
        return req.status(201).json({message:"User details fetched for editing", user: user[0]});
    } catch (error) {
        console.error(error);
        return res.status(401).json({message:"An error occurred while fetching user details", error: error.message});
    }
}

// function for editing user
exports.editUser = async(req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({message:"unauthorized! Please login to continue"});
    }

    // check if any errors present
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({message:"Please correct input erors.", errors: errors.array()});
    }

    // fetch user details from the request body
    const {fullname, email, password} = req.body;
    
    // prepare data - hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // update user details
        await db.execute("UPDATE users SET fullname = ?, email = ?, password = ? WHERE id = ?", [fullname, email, hashedPassword]);
        return res.status(201).json({message:"User details updated successfully."});
    } catch (error) {
        console.error(error);
        return res.status(401).json({message:"An error occurred during edit.", error: error.message});
    }
}
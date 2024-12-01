const db = require("mysql2"); //connecting with database
const bcrypt = require("bcryptjs"); //hashing the password
const{validationResult} = require("express-validator"); //validation

// function for registering user
exports.registerUser = async(req,res) =>{
    const errors = validationResult(req);
    // checking if there are any errors
    if(!errors.isEmpty){
        return res.status(401).json({message:"Please correct input errors", errors: errors.array()});
    };

    // collect user input from the request body
    const {firstname,middlename,lastname,email,password} = req.body;

    try {
        const [user] = await db.execute("SELECT email FROM user WHERE email = ?", [email]);
        if(user.length > 0){
            return res.status(401).json({message: "The user already exists"});
        }

        // prepare the password for hashing
        const hashedPassword = await bcrypt.hash(password, 10);
        // insert the record
        await db.execute("INSERT INTO user (firstname,middlename,lastname,email,password) VALUES(?,?,?,?,?)," [firstname,middlename,lastname,email,hashedPassword]);
        // response
        return res.status(201).json({message:"User registered successfully"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"An error occured during registration",error:error.message}); 
    };
};


// function for login user
exports.loginUser = async(req,res) =>{
    // fetch email and password from the request body
    const {email,password} = req.body;

    try {
        // check if user exists
        const[user] = await db.execute("SELECT * FROM user WHERE email = ?",[email]);
        if(user.length === 0){
            return res.status(401).json({message:"User does not exist"});
        } 
        // check if the password matches
        const isMatch = await bcrypt.compare(password,user[0].password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid email/password combination!"});
        }
        // create a session 
        req.session.userId = user[0].id;
        req.session.name = user[0].name;
        req.session.email = user[0].email;
        
        return res.status(201).json({message:"Successfull Login"});
    } catch (error) {
        console.error(error);
        return res.status(401).json({message:"An error occured during login",error: error.message});
        
    };
};

// logout function


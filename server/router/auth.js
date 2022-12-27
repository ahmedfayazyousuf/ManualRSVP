const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const authenticate = require("../middleware/authenticate");

const cookieParser = require("cookie-parser");
router.use(cookieParser());




require('../db/conn');
const User = require("../model/userSchema");




//register route

router.post('/register', async (req, res) => {

    const { name, email, status } = req.body;
    try {
        const user = new User({name, email, status });
        await user.save();

        res.status(201).json({ message:"User Successfully Registered!", sex:user._id })

    } catch(err) {
        console.log(err);
    }

});



//login route 
router.post('/login', async (req, res) => {
    try {
        let token;
        const {email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({error: "Invalid Credentials"})
        }

        const userLogin = await User.findOne({ email:email });

        // console.log(userLogin);

        if(userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

        if(!isMatch){
            res.status(400).json({ error: "Invalid Credentials - Error 16"});
        } else {
            res.json({message: "User Signed in Successfully!"});
        }
        } else {
            res.status(400).json({ error: "Invalid Credentials - Error 5"});
        }

    } catch (err){
        console.log(err); 
    }
});

// profile page
router.get('/profile', authenticate, (req, res) => {
    res.send(req.rootUser);
});

router.get('/register', async (req, res) => {
    const data = await User.find();
    res.json(data)
})

router.get('/logout', (req, res) => {
    console.log(`Hello Logout Page`);
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('User Logged Out');
});


module.exports = router;
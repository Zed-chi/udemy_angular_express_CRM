const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const errorHandler = require("../utils/errorHandler");


module.exports.login = async function (req,res){
    const email = req.body.email;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({email:email});

    if (existingUser) {
        const isPassRight = bcrypt.compareSync(password, existingUser.password);
        if (isPassRight) {
            const token = jwt.sign(
                {email:existingUser.email, userId: existingUser._id}, 
                keys.jwt, {expiresIn: 3600,}
            );            
            res.status(200).json({token:`Bearer ${token}`});
        } else {
            res.status(401).json({"message":"wrong password"})
        }
    }
    else {
        res.status(404).json({"messsage":"user not found"});
    }
}


module.exports.register = async function (req,res){
    const salt = bcrypt.genSaltSync(10);
    const email = req.body.email;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({email:email});
    if (existingUser){
        res.status(409).json({message:"User exists"});
    } else {
        try{
            const user = new UserModel({
                email: email,
                password: bcrypt.hashSync(password, salt),
            });
            await user.save().then(()=> console.log("user created"));
            res.status(201).json({message:"user created"});
        } catch(err){
            console.log(err);
            errorHandler(res, err);
        }        
    }
}
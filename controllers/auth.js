const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports.login = (req,res)=>{
    res.status(200).json({
        email: req.body.email,
        password: req.body.password
    });
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
        }        
    }
}
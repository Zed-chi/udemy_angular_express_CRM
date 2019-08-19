const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const UserCollection = mongoose.model("users");


const options = {
    jwtFromRequest:extractJwt.fromAuthHeaderAsBearerToken(),    
    secretOrKey: keys.jwt,
};

module.exports = passport => {
    passport.use(new jwtStrategy(
        options, 
        async function (pay, done){
            try{
                const user = await UserCollection.findById(pay.userId).select("email id");
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            }
            catch(err){
                console.log(err);
            }
        })
    );
};


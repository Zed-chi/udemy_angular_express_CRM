const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    "name":{
        type: String,
        required:true,
    },
    "imageSrc":{
        type:String,
        default:""
    },
    "user":{
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
    },
});

module.exports = mongoose.model("categories", categorySchema);

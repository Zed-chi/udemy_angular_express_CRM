const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    "date":{
        type: Date,
        default:Date.now,
    },
    "order":{
        type:Number,
        required:true,
    },
    "user":{
        ref: "users",
        type: mongoose.Schema.Types.ObjectId
    },
});

module.exports = mongoose.model("orders", orderSchema);

/* dependencies */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const keys = require("./config/keys");
const errorHandler = require("./utils/errorHandler");

/*routes*/
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");
const analyticsRoutes = require("./routes/analytics");
const positionRoutes = require("./routes/position");
const categoryRoutes = require("./routes/category");


/*stuff*/
mongoose.connect(keys.MONGO_URI, {useNewUrlParser: true})
    .then(() => console.log("mongo connected"))
    .catch( err => console.log(err) );

app.use(passport.initialize());
require("./middleware/passport")(passport);
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/position", positionRoutes);
app.use("/api/category", categoryRoutes);
module.exports = app;
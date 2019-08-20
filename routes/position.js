const express = require("express");
const router = express.Router();
const controller = require("../controllers/position");
const passport = require("passport");


router.get("/:category", passport.authenticate("jwt", {session:false}), controller.getByCategory);
router.post("/", passport.authenticate("jwt", {session:false}), controller.create);
router.delete("/:id", passport.authenticate("jwt", {session:false}), controller.delete);
router.patch("/:id", passport.authenticate("jwt", {session:false}), controller.update);
module.exports = router;
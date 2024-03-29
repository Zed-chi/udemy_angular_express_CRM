const express = require("express");
const passport = require("passport");
const router = express.Router();
const upload = require("../middleware/upload");
const controller = require("../controllers/category");



router.get("/", passport.authenticate("jwt", {session:false}), controller.getAll);
router.get("/:id",passport.authenticate("jwt", {session:false}), controller.getById);
router.delete("/:id", passport.authenticate("jwt", {session:false}), controller.delete);
router.post("/", passport.authenticate("jwt", {session:false}), upload.single("image"), controller.create);
router.patch("/:id", passport.authenticate("jwt", {session:false}), controller.update);
module.exports = router;
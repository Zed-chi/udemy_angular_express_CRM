const express = require("express");
const router = express.Router();
const controller = require("../controllers/position");


router.get("/:category", controller.getByCategory);
router.post("/", controller.create);
router.delete("/:id", controller.delete);
router.patch("/:id", controller.update);
module.exports = router;
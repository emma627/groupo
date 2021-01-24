const express = require('express'); 
const router =express.Router();
const commentCtrl = require("../controllers/comment.controller.js");

router.get("/:id", commentCtrl.findOne);
router.post("/", commentCtrl.insert);
router.delete("/:id", commentCtrl.delete);
router.put("/", commentCtrl.update);
module.exports = router;
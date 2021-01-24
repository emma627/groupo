const express = require('express'); 
const router =express.Router();
const postCtrl = require("../controllers/post.controller.js");

const auth = require('../middleware/auth');

router.post("/", postCtrl.insert);
router.get("/",  postCtrl.findAll);

router.get("/:id", postCtrl.findById);

router.delete("/:id", postCtrl.delete);
router.get("/user/:id", postCtrl.findByUser);
router.put("/", postCtrl.update);
module.exports = router;
const express = require('express'); 
const router =express.Router();
const userCtrl = require("../controllers/user.controller.js");

router.get("/", userCtrl.findAll);
router.post("/", userCtrl.signup);
router.get("/:id", userCtrl.findOne);
router.delete("/:id", userCtrl.delete);
router.post("/login", userCtrl.login);
router.put("/", userCtrl.update);

module.exports = router;

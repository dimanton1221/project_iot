const express = require('express');
const router = express.Router();
const { registerController, LoginController, Logout } = require("../Controllers/Auth");

router.post("/register", registerController);
router.post("/login", LoginController);
router.post("/logout", Logout);
module.exports = router;
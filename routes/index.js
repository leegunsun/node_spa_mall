const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("http://127.0.0.1:3000/api page");
});

module.exports = router;

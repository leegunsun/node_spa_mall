const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("admin/index.ejs", {
    title: "dd",
  });
});

module.exports = router;

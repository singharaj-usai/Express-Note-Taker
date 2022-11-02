const router = require("express").Router();
const path = require("path");

// Index.html Route
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});



module.exports = router;
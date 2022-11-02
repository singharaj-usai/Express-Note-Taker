const router = require("express").Router();
const path = require("path");

// Index.html Route
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

// Notes.html Route
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/notes.html"));
});

module.exports = router;
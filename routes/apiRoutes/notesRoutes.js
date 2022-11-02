const router = require("express").Router();
const { createNewNote, filterByQuery, validateNote, findById } = require("../../lib/notes.js");
const notes = require("../../db/db.json");

router.get("/notes", (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    };
    res.json(notes);
});

//find by id
router.get("/notes/:id", (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    };
});

router.post("/notes", (req, res) => {
    // set id based on what the next index of the array will be 
    req.body.id = notes.length.toString();
    // if any data in req.body is incorrect, send error
    if (!validateNote(req.body)) {
        res.status(400).send("The note is not properly formatted.");
    } else {
        // add note to json file and animals array in this function 
        const note = createNewNote(req.body, notes);
        res.json(note);
    };
});

// delete notes
router.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    let note;
    notes.map((element, index) => {
        if (element.id == id) {
            note = element
            notes.splice(index, 1)
            return res.json(note);
        };
    });
});

module.exports = router;
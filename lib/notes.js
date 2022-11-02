const fs = require("fs");
const path = require("path");

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.title) {
        filteredResults = filteredResults.filter(notes => notes.title === query.title);
    }
    if (query.text) {
        filteredResults = filteredResults.filter(notes => notes.text === query.text);
    }
    // return the filtered results:
    return filteredResults;
}

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    // path to write file 
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    // Return finished code to post route for response
        return note;
};

function validateNote(note) {
    if (!note.title || typeof note.title !== "string") {
        return false
    }
    if (!note.text || typeof note.text !== "string") {
        return false
    }
        return true;
};

module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote,
};
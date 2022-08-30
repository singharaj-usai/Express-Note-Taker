const express = require("express");
const path = require("path");
const exphbs = require('express-handlebars');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 5000;

// Static folder
app.use(express.static(path.join(__dirname, "public")));

//Handlebars Middleware
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Homepage Route
app.get('/', (req, res) =>
    res.render(path.join(__dirname, "public/index"))
);

// Notes Route
app.get('/', (req, res) =>
    res.render(path.join(__dirname, "public/notes"))
);

// POST request to add a note
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
      };
  
          // Convert the data to a string so we can save it
    const noteString = JSON.stringify(newNote);

      // Write the string to a file
      fs.writeFile(`./db/${newNote.title}.json`, noteString, (err) =>
      err
        ? console.error(err)
        : console.log(
            `Review for ${newNote.title} has been written to JSON file`
          )
    );
      const response = {
        status: 'success',
        response: newNote
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting notes');
    }
  });

// Server Start
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

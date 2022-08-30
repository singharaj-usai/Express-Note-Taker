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
    res.sendFile(path.join(__dirname, "public/index.html"))
);

// Notes Route
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, "public/notes.html"))
);


// GET request for reviews
 //   app.get('/api/notes', (req, res) => {
    // Send a message to the client
//    res.status(200).json(`${req.method} request received to get reviews`);

    // Log our request to the terminal
//    console.info(`${req.method} request received to get reviews`);
//  });
  
  // POST request to add a review
  app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a review`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
      };
  
      // Obtain existing reviews
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
       
          // Convert string into JSON object
          const parsedReviews = JSON.parse(data);
  
          // Add a new review
          parsedReviews.push(newNote);
  
          // Write updated reviews back to the file
          fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedReviews, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated reviews!')
          );
        app.get('/api/notes', function(req, res){
            res.json(parsedReviews)
        })
        
        app.delete('/api/notes', function(req, res){
            parsedReviews.splice()
            res.json(parsedReviews)
        })

      });
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting review');
    }
  });

// Server Start
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

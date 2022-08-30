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

// Server Start
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

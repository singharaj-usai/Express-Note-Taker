const express = require("express");
const path = require("path");
const exphbs = require('express-handlebars');
const app = express();

//Handlebars Middleware
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Homepage Route
app.get('/', (req, res) =>
    res.render('index', {
        title: 'Note Taker App'
    })
);

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require("express");
const path = require("path");
const exphbs = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 5000;
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// Static folder
app.use(express.static(path.join(__dirname, "public")));

//Handlebars Middleware
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Server Start
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

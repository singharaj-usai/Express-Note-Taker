const router = require("express").Router();
const notesRoutes = require("./notesRoutes");

router.use(notesRoutes);

module.exports = router;
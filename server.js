var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var port = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("app/public"));

require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);




app.listen(port, function() {
    console.log("App listening on PORT " + port);
})

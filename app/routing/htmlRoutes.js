var path = require("path");

module.exports = function(app) {


    // path file linking to our survey page
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    // path file linking to home
    app.use(function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/home.html"));
    });

}

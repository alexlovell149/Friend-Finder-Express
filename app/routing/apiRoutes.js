var friendInput = require("../data/friends.js");
var path = require("path");

var totalDifference = 0;

module.exports = function(app) {

    // when user visits the API link it will show him the JSON of all the friends created so far
    app.get("/api/friends", function(req, res) {

        res.json(friendInput);
    });

    // when user submits a form this handles all the most and posts them inside the API along with matching
    // them to current friends
    app.post("/api/friends", function(req, res) {
    	// takes new friends scores and puts them in an array that compares to current friends
        var newFriendScore = req.body.scores;
        var scoresArray = [];
        var friendcount = 0;
        var bestMatch = 0;




        console.log(newFriendScore);

        // need to loop through friends array to find each score
        for (var i = 0; i < [friendInput].length; i++) {
            console.log(friendInput[i].name);

            var totalDifference = 0;

            // loop through friends and users score and calculate absolute difference and push total to newData
            for (var j = 0; j < newFriendScore.length; j++) {
                totalDifference += Math.abs(parseInt(friendInput[i].scores[j]) - parseInt(newFriendScore[j]));
            }
            // push new scores into array
            scoresArray.push(totalDifference);
        }
        // loop through array and find the best match
        for (var i = 0; i < scoresArray.length; i++) {
            if (scoresArray[i] <= scoresArray[bestMatch]) {
                bestMatch = i;
            }
        }
        // return the best match and put it into JSON formatting along with the new site
        var bestFriend = friendInput[bestMatch];

        res.json(bestFriend);
        // push submission into friendlist array
        friendInput.push(req.body);

    });



}

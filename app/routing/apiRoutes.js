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

        var newFriend = req.body;

        // compute best match from scores
        var bestMatch = {};

        for (var i = 0; i < newFriend.scores.length; i++) {
            if (newFriend.scores[i] == "1 (Strongly Disagree)") {
                newFriend.scores[i] = 1;
            } else if (newFriend.scores[i] == "5 (Strongly Agree)") {
                newFriend.scores[i] = 5;
            } else {
                newFriend.scores[i] = parseInt(newFriend.scores[i]);
            }
        }
        // compare the scores of newFriend with the scores of each friend in the database and find the friend with the smallest difference when each set of scores is compared

        var bestMatchIndex = 0;
        //greatest score difference for a question is 4, therefore greatest difference is 4 times # of questions in survey
        var bestMatchDifference = 40;

        for (var i = 0; i < friendInput.length; i++) {
            var totalDifference = 0;

            for (var index = 0; index < friendInput[i].scores.length; index++) {
                var differenceOneScore = Math.abs(friendInput[i].scores[index] - newFriend.scores[index]);
                totalDifference += differenceOneScore;
            }

            // if the totalDifference in scores is less than the best match so far
            // save that index and difference
            if (totalDifference < bestMatchDifference) {
                bestMatchIndex = i;
                bestMatchDifference = totalDifference;
            }
        }

        // the best match index is used to get the best match data from the friends index
        bestMatch = friendInput[bestMatchIndex];

        // Put new friend from survey in "database" array
        friendInput.push(newFriend);

        // return the best match friend
        res.json(bestMatch);

    });



}

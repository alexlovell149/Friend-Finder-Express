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
        var newFriend = {
            name: "",
            image: "",
            matchDifference: 1000
        }

        var newData = req.body;
        var newName = newData.name;
        var newImage = newData.image;
        var newScores = newData.scores;


        var totalDifference = 0;

        console.log(newFriend);

        // need to loop through friends array to find each score
        for (var i = 0; i < [friendInput].length - 1; i++) {
            console.log(friendInput[i].name);
            totalDifference = 0;

            // loop through friends and users score and calculate absolute difference and push total to newData
            for (var j = 0; j < 10; j++) {
                totalDifference += Math.abs(parseInt(newScores[j]) - parseInt(friendInput[i].scores[j]));

                if (totalDifference <= newFriend.friendDifference) {

                    newFriend.name = friendInput[i].name;
                    newFriend.photo = friendInput[i].photo;
                    newFriend.matchDifference = totalDifference;
                }
            }
        }
        friendInput.push(newData);

        res.json(newFriend);
    });



}

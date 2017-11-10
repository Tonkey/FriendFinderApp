const express = require('express');
const app = express();
const PORT = 8080;
const register = require("./facade/FriendFacade");
const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Friend Finder Demo!')
})

app.post('/', function (req, res) {
  let user = req.body.userName;
  let coordinates = req.body.coordinates;
  let distance = req.body.distance;
  console.log("Username: " + user);
  console.log("coordinates: " + coordinates);
  console.log("Distance: " + distance);
  register(user, coordinates, distance, function(err, docs) {
    if (err) {
      return console.log(err);
    }
    res.send(docs);
  })

})

app.listen(PORT, function () {
  console.log(`Friend Finder App listening on port ${PORT}`);
})
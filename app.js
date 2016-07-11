var express = require('express');

var app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/client/index.html");
});

app.get('/build/build.js', function (req, res) {
   res.sendFile(__dirname + "/client/build/build.js");
});

app.get('/music/rhcp', function (req, res) {
   res.sendFile(__dirname + "/resources/rhcp.mp3");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
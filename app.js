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

app.get('/music/hives', function (req, res) {
    res.sendFile(__dirname + "/resources/hives.mp3");
});

app.get('/music/pz', function (req, res) {
    res.sendFile(__dirname + "/resources/pz.mp3");
});

app.get('/music/vagina', function (req, res) {
    res.sendFile(__dirname + "/resources/vagina.mp3");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
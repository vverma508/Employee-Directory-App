var express = require('express');
var bodyParser = require('body-parser');
var db = require("./dbhandler/dbHelper.js")
var app = express();

var fs = require('fs');

var index = fs.readFileSync('./public/page/index.html', 'utf8');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res) {
    res.send(index);
})

app.get("/read", db.read);
app.post("/create", db.create);
app.post("/update", db.update);
app.post("/delete", db.delete);

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("Server is running at:" + port)
})
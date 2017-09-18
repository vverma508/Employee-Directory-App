var mongoCLient = require('mongodb').MongoClient;

//db connection URL
var dbUrl = "mongodb://vivek:Mind123@ds147872.mlab.com:47872/testdb508";
var database;
var empData;
mongoCLient.connect(dbUrl, function(err, db) {

    if (err != null) {
        console.log("Error while connecting to DB. Error msg: " + err.message);
        db.close();

    } else {
        database = db;
        empData = database.collection("Employee");
        console.log("Database is online!");
    }

});


exports.create = function(req, res) {

    empData.insertOne({
        "Name": req.body.employee.name,
        "Email": req.body.employee.email,
        "DOB": req.body.employee.dob.substring(0, 10),
        "Department": req.body.employee.department,
        "Gender": req.body.employee.gender,
        "Age": req.body.employee.age
    });

    empData.find().toArray(function(err, items) {

        res.json(items);
    })

}
exports.update = function(req, res) {

    empData.updateOne({ "Email": req.body.employee.email }, {
        $set: {
            "Name": req.body.employee.name,
            "DOB": req.body.employee.dob.substring(0, 10),
            "Department": req.body.employee.department,
            "Gender": req.body.employee.gender,
            "Age": req.body.employee.age
        }
    })
    empData.find().toArray(function(err, items) {

        res.json(items);
    })
}
exports.delete = function(req, res) {
    empData.deleteOne({ "Email": req.body.email });
    res.json(true);
}
exports.read = function(req, res) {
    empData.find({}).toArray(function(err, items) {
        res.json(items);
    })
}
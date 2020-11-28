//Dependencies, add more here later
const express = require("express");
const fs = require("fs");
const path = require("path");

//Express part/port
const app = express ();
var PORT = 3000;

//Express hookup with everything else 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//using css, js, etc.
app.use(express.static(__dirname + '/public'));

//using HTML files 
//NON assets CORRECT
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

//Retrieve notes
var notes = require("db/db.json")
app.get("/api/notes", function (req, res) {
    return fs.readFile("notes");
});
// app.get("/api/notes", function (req, res) {
//     return fs.readFile(path.join(__dirname, "db/db.json"));
// });

//Post that new note
app.post("/api/notes", function (req, res) {
    const mynewNote = req.body;
//save that new note
    notes.push(mynewNote);
//show saved notes
    console.log('Unsaved notes: ', notes.length);
    mynewNote.id = notes.length + 1;
    console.log('Saved notes: ', notes.id);

    fs.writeFile(JSON.stringify(notes), function(err) {
        if (err) {
            throw err;
        }

        res.send(notes);
    });

//delete any note
app.delete("/api/notes/:id", function (req, res) {
    res.send("db/db.json");
});
//Delete note
// app.delete("/db", function (req, res) {
//     res.sendFile(path.join(__dirname, "db/db.json"));
// });


//Port function
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
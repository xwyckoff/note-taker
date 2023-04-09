const express = require('express')
const app = express.Router();
const fs = require('fs');
const db = require('../db/db.json');
const {v4: uuidv4} = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (req, res) => {
    //send the user all of the notes
    res.json(db);
});

app.post('/notes', (req, res) => {
    //start by reading the contents of the db.json file
    fs.readFile('../db/db.json', 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
        }

        else{
            //set a variable to the list of notes in the db.json file
            let notesList = JSON.parse(data)
            //add the note sent by the user to the list
            notesList.push(req.body);
            //write the list to the db.json file
            fs.writeFile('../db/db.json', JSON.stringify(notesList), (err) => {
                if(err) {
                    console.warn(err)
                } else {
                    console.info("New note added to list");
                }
            });

            res.json("Note received!");
        }
    })
});

module.exports = app;
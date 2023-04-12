const express = require('express')
const app = express.Router();
const fs = require('fs');
const path = require('path');
const db = require('../db/db.json');
const {v4: uuidv4} = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (req, res) => {
    //send the user all of the notes
    res.header("Content-Type", "application/json");
    res.sendFile(path.join(__dirname, "../db/db.json"));
});

app.post('/notes', (req, res) => {
    //start by reading the contents of the db.json file
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
        }

        else{
            //set a variable to the list of notes in the db.json file
            let notesList = JSON.parse(data)
            //add the note sent by the user to the list
            notesList.push(
                {
                    //generate a unique id for the new note
                    id: uuidv4(),
                    title: req.body.title,
                    text: req.body.text
                });
            //write the list to the db.json file
            fs.writeFile('./db/db.json', JSON.stringify(notesList), (err) => {
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

app.delete('/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) console.log(err);

        else {
            let notesList = JSON.parse(data);
            let noteID = req.params['id'];

            //loop through the array and find the id of the note that is in the parameters of the route
            for(let i = 0; i < notesList.length; i++) {
                //if the note is found, remove that note from the array
                if (notesList[i].id == noteID) {
                    notesList.splice(i, 1);
                    break;
                }
            }

            fs.writeFile('./db/db.json', JSON.stringify(notesList), err => {
                if (err) console.log(err);

                else {
                    res.json({ message: `Note of ID ${req.params['id']} deleted.` });
                }
            })
        }
    })
});

module.exports = app;
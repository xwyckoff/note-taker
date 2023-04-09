const express = require("express");
const path = require("path");
const api = require('../routes/api');

let app = express();
const PORT = 3001;

app.use('/api', api);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
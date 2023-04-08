const express = require("express");

let app = express();
const PORT = 3001;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
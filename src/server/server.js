const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 8080;

app.use(cors({origin: 'http://localhost:3000'}));

app.get('/', (req, res) => {
    res.statusCode = 200;
    return res.json({title: 'Coding in Progress'});
})

app.listen(PORT, () => {
    console.log("Server is listening on Port " + PORT + "...")
})

module.exports = app;
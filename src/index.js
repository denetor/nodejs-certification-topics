const express = require('express');
const app = express();
const port = 3000;

var streamsModule = require('./streams/streams.js');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/streams/hello', (req, res) => {
    streamsModule.helloStreams(req, res);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const express = require('express');
const app = express();
const port = 3000;

var streamsModule = require('./streams/streams.js');

app.get('/', (req, res) => {
    res.send('Hello World!');
});


/**
 * Streams
 */
app.get('/streams/hello', (req, res) => {
    streamsModule.helloStreams(req, res);
});

app.get('/streams/writable', (req, res) => {
    streamsModule.writable();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

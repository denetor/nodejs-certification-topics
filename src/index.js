const express = require('express');
const app = express();
const port = 3000;

var buffersModule = require('./buffers/buffers.js');
var streamsModule = require('./streams/streams.js');

app.get('/', (req, res) => {
    res.send('Hello World!');
});


/**
 * Buffers
 */
app.get('/buffers/hello', (req, res) => {
    res.end(buffersModule.getHelloBuffer());
});

app.get('/buffers/iterate', (req, res) => {
    res.end(buffersModule.getIterateBuffer());
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

// app.get('/streams/transform', (req, res) => {
//     res.end(streamsModule.getTransformStream());
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

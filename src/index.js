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
    streamsModule.hello();
});

app.get('/streams/writable', () => {
    streamsModule.writable();
});

app.get('/streams/transform', () => {
    streamsModule.getTransformStream();
});

app.get('/streams/getfile', (req,res) => {
    streamsModule.getFile(__dirname + '/../README.md').pipe(res);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

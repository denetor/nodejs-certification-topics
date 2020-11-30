const stream = require('stream');

module.exports = {

	// create a readable stream and sends data
    // pipe output to console
    hello: function() {
	    var readStream = new stream.Readable();
	    readStream.push('hello');           // add items to stream
	    readStream.push(' ');
	    readStream.push('nodejs');
	    readStream.push(' ');
	    readStream.push('streams!\n');
	    readStream.push(null);              // tell the stream it's done
	    readStream.pipe(process.stdout);    // tell the consumer to read buffered items
    },


    // create a read and a write stream
    // send some data in the read stream and pipe it to the write stream
    writable: function() {
        var readStream = new stream.Readable();
        var writeStream = new stream.Writable();

        writeStream._write = function (chunk, enc, next) {
            console.log(chunk);
            next();
        };

        readStream.push('lorem ipsum dolor sit amet nullo liberant ab auriga sed sempre mori est lucidus tuum');
        readStream.push(null);
        readStream.pipe(writeStream);
    },


    // create a read stream and a transform stream
    getTransformStream: function() {
        var readStream = new stream.Readable();
        readStream._read = function() {};
        readStream.push('Hello!');
        // create transform stream
        var transformStream = new stream.Transform();
        transformStream._transform = function(chunk, encoding, next) {
            // chunk is a Buffer. Transform into string, uppercase it
            // and send output to this transform stream
            this.push(chunk.toString().toUpperCase());
            next();
        }
        readStream.pipe(transformStream).pipe(process.stdout);
    },


    // create a readstream from a file and returns it
    getFile: function(fileName) {
        const fs = require('fs');
        return fs.createReadStream(fileName);
    }


};



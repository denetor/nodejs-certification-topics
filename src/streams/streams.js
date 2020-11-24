module.exports = {

	/**
	 * First readable stream creation and piping to stdout
	 *
	 * @param req
	 * @param res
	 */
    helloStreams: function(req, res) {
	    var Readable = require('stream').Readable;
	    var readStream = new Readable();
	    readStream.push('hello');           // add items to stream
	    readStream.push(' ');
	    readStream.push('nodejs');
	    readStream.push(' ');
	    readStream.push('streams!\n');
	    readStream.push(null);              // tell the stream it's done
	    readStream.pipe(process.stdout);    // tell the consumer to read buffered items
    },


    writable: function() {
        var Readable = require('stream').Readable;
        var Writable = require('stream').Writable;
        var readStream = new Readable();
        var writeStream = new Writable();

        writeStream._write = function (chunk, enc, next) {
            console.log(chunk);
            next();
        };

        readStream.push('lorem ipsum dolor sit amet nullo liberant ab auriga sed sempre mori est lucidus tuum');
        readStream.push(null);
        readStream.pipe(writeStream);
    },

};



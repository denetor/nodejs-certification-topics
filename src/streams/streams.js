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
    }

};


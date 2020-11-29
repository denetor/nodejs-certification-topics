module.exports = {


    // return a new buffer containing a string
    getHelloBuffer: function(req, res) {
	    return Buffer.from("Hello world!\n");
    },


    // creae and iteate a buffer. Return another buffer with elaboration results
    getIterateBuffer: function() {
        let output = '';
        // generate a content buffer, iterating it
        const buf = Buffer.from("Hello world!\n");
        for (const c of buf) {
            output += 'buffer element: ' + c + "\n";
        }
        // counts buffer elements
        output += buf.length + ' elements.' + "\n";

        // output results buffer
        return Buffer.from(output);
    },


};



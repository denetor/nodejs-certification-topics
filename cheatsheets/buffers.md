# Buffers
Buffers are subclass of `Uint8Array` and are a fixed length bytes sequence.
Every buffer element is an integer between 0 and 255.

### Creating a buffer
```js
const zeroFilled = Buffer.alloc(10);
const oneFilled = Buffer.alloc(10, 1);
const uninitialized = Buffer.allocUnsafe(10); // may contain sensible previous data, but is quicker
const threeBytes = Buffer.from([1, 2, 3]);
const threeAsciiValues = Buffer.from(['ABC']);
const truncated = Buffer.from([-10, 5, 4.5, '1']);
```

### Creating a buffer with encoding
Converting strings, you can specify encoding
```js
const buf = Buffer.from('hello world', 'utf8');

console.log(buf.toString('hex'));
// Prints: 68656c6c6f20776f726c64
console.log(buf.toString('base64'));
// Prints: aGVsbG8gd29ybGQ=
console.log(Buffer.from('fhqwhgads', 'utf8'));
// Prints: <Buffer 66 68 71 77 68 67 61 64 73>
console.log(Buffer.from('fhqwhgads', 'utf16le'));
// Prints: <Buffer 66 00 68 00 71 00 77 00 68 00 67 00 61 00 64 00 73 00>
```

### Accessing buffer data
Yu may access buffers as arrays, and even iterate them:
```js
const buf = Buffer.from('Hey!');
console.log(buf[0]);            // 72
console.log(buf.toString());    // 'Hey!'
console.log(buf.length);        // 4

for (const item of buf) {
    console.log(item);          //72 101 121 33
}
```

### Writing buffers
A buffer can be written (not appended) with write() and their values can
be written as array elements::
```js
const buf = Buffer.alloc(4);
buf.write('Hey!');
buf[1] = 111;                   // 'o'
console.log(buf.toString());    // 'Hoy!'
```

You may copy buffers:
```js
const buf = Buffer.from('Hey!');
let bufcopy = Buffer.alloc(4) // allocate 4 bytes
buf.copy(bufcopy);
```

### Slicing buffer
You can slice a buffer to create a partial view of a buffer:
```js
const buf = Buffer.from("Hey!");
const slice = buf.slice(0, 2);
console.log(buf.toString());        // 'Hey!'
console.log(slice.toString());      // 'He'
// changing the slice will change the origin al buffer too
slice[1] = 111;                     // 'o'
console.log(buf.toString());        // 'Hoy!'
```

### Buffer resources:
- https://nodejs.dev/learn/nodejs-buffers
- https://nodejs.org/api/buffer.html


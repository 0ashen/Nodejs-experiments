const http = require('http');
const pid = process.pid;

http
    .createServer((req, res) => {
        res.end(`Hello from node.js! \n`);
    })
    .listen(8080, () => {
        console.log(`Server started. Pid ${pid}`);
    });
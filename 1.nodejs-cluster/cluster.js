const cluster = require('cluster');
const os = require('os');
const pid = process.pid;

if (cluster.isMaster) {
    const cpusCount = os.cpus().length;
    console.log(`CPUs: ${cpusCount}`);
    console.log(`Master start. Pid ${pid}`);
    for (let i = 0; i < cpusCount - 2; i++) {
        const worker = cluster.fork();
        worker.on('exit', () => {
            console.log(`Worker died! Pid: ${worker.process.pid}`);
            cluster.fork();
        });
        worker.send('Hello from server!');
        worker.on('message', (msg) => {
            console.log(`Message from worker ${worker.process.pid} : ${JSON.stringify(msg)}`);
        });
    }
}
if (cluster.isWorker) {
    require('./worker.js');
    process.on('message', (msg) => {
        console.log(`Message from master : ${msg}`);
    });
    process.send({text: `Hello`, pid});
}
// Write Javascript code here
const cp = require('child_process');
console.log(`__dirname ::: ${__dirname}`)
let child = cp.fork(__dirname + '/test1.js');
child.send({a:10 });
child.on('message', async (data) =>{
	console.log('Parent process received:', data);
    const { status, childProcessId } = data;
    console.log(status,childProcessId)
});



child.on('close', (code) => {
	console.log(`child process exited with code ${code}`);
});


document.querySelector('#submit').addEventListener('click', function () {
    let url = document.getElementById("url").value;
    const {ipcRenderer} = require('electron')
    // send username to main.js
    ipcRenderer.send('asynchronous-message', url)
    // receive message from main.js
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
        console.log(arg)
    })
});
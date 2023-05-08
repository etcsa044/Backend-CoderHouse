// const socket = io();


// const textbox = document.getElementById("textbox");
// const logs = document.getElementById("logs");

// textbox.addEventListener('keyup', event => {
//     let {
//         key
//     } = event;
//     if (key === "Enter") {
//         socket.emit('message', textbox.value);
//         textbox.value = "";
//     }
    
// })


// socket.on('logs', data => {
//     console.log(data.id);
//     let messagesLogs = ``;
//     data.forEach(log => {
//         messagesLogs += `${log.title} dice: ${log.description} <br/>` 
//     });
//     logs.innerHTML = messagesLogs;
// })
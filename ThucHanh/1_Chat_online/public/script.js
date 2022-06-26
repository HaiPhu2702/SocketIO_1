
const socket=io('http://localhost:3000')
const divContainer=document.getElementById('message-container')
const formUser = document.getElementById('send-container')
const valueInput = document.getElementById('message-input');


const name=prompt("nhap name")
appendMessage('you joined');


socket.emit('new-user',name);
console.log(name)

socket.on('user-connected',name=>{
        appendMessage(`${name} connected`)
    }
)

formUser.addEventListener('submit',e=>{
    e.preventDefault();
    const textMessage = valueInput.value;
    appendMessage(`you:${textMessage}`)
    socket.emit('send-chat-message',textMessage)
    valueInput.value='';
})

socket.on('chat-message',objectMessage=>{
    appendMessage(`${objectMessage.name}:${objectMessage.message}`)
})


socket.on('user-disconnected',name=>{
    appendMessage(`${name} disconnect`)
})

function appendMessage(message){
    //tao div +gan message
    const newDiv = document.createElement('div')
    newDiv.innerText=`user:${message}`;
    divContainer.append(newDiv)
}






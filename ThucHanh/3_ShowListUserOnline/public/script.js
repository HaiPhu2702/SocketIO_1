
const socket =io('http://localhost:3000')

const name=prompt("name name")

socket.emit('login',name)

socket.on('list-user',users=>{
    showListUsers(users)
})

socket.on('working',name=>{
    showListUsers(name)
})

socket.on('user-disconnect',name=>{
        showListUsers(name)
})

function showListUsers(listUsers){
$('#users-show').empty();
let html =''
    listUsers.forEach((value)=>{
        html+='<li>'
        html+=`<span class="presence" style='background-color:${value.color}'></span>`
        html+=`<span>${value.name}</span>`
        html+='</li>'
    })

$('#users-show').append(html)
}


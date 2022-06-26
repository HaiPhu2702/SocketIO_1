
const {createServer}=require('http');
const { Server }=require('socket.io');
const fs=require('fs');
const port=3000;

const minType={
    "html":"text/html",
    "css":"text/css",
    'js':"text/javascript"
}

const httpServer=createServer((req, res) => {
if (req.url==='/'){
        res.writeHead(200,{"Content-Type": "text/html"})
        fs.createReadStream('./templates/list.html').pipe(res)
}else {
    // đọc file js ,css
    const findFileTail=req.url.match(/\.js|.css/);
    if(findFileTail){
   const typeTail=minType[findFileTail[0].toString().split('.')[1]]
        res.writeHead(200,{"Content-Type":`${typeTail}`})
        fs.createReadStream(__dirname+"/"+req.url).pipe(res)
    }
}
})


const  io=new Server(httpServer);
const users={};

io.on("connection",socket=>{

    socket.on("new-user",data=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-connected',name)
})

    socket.on('send-chat-message',valueFrom=>{
        socket.broadcast.emit('chat-message',{message:valueFrom,name:users[socket.id]})
    })

    socket.on('disconnect',()=>{
        socket.broadcast.emit('user-disconnected',users[socket.id])
        delete users[socket.id];
    })

})
1

httpServer.listen(port,'localhost',()=>{
    console.log(`server listening http://localhost:${port}`)
})


const {createServer}=require('http')
const {Server}=require('socket.io')
const fs = require('fs')

const minType={
    "html":"text/html",
    "css":"text/css",
    "js":"text/javascript"
}

const port=3000;
const httpServer=createServer((req, res)=>{
    if (req.url==='/'){
      res.writeHead(200,{"Content-Type": "text/html"})
      fs.createReadStream('./templates/list.html').pipe(res)
    }else {
        const findFileTail=req.url.match(/\.js|css/)
        if(findFileTail){
            const tail=minType[findFileTail[0].toString().split(".")[1]];
            res.writeHead(200,{"Content-Type": tail})
            fs.createReadStream(__dirname+"/"+req.url).pipe(res)
        }
    }
})


const io=new Server(httpServer)
const todolist=[];
let index1=0;
io.on("connection",socket=>{

    socket.on('addTask',valueForm=>{
        todolist.push(valueForm)
        socket.broadcast.emit('addTask',{task:valueForm,index:index1})
        index1++;
    })

})



httpServer.listen(port,()=>{
    console.log(`server listening http://localhost:${port}`)
})
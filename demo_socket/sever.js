
const {createServer}=require("http");
const {Server}=require("socket.io");
const fs=require("fs");

const httpServer= createServer((req,res)=>{
    fs.readFile('./templates/list.html',"utf8",(err,data)=>{
        if(err) throw err;
        res.writeHead(200, {"Content-Type": "text/html"})
        res.write(data);
        return res.end();
    })
})


const io=new Server(httpServer)

io.on("connection",(socket )=>{
    console.log("connection success")
})

httpServer.listen(3000,()=>{
    console.log("server listening on port http://localhost:3000")
})
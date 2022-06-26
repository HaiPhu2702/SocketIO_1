
const {createServer}=require('http')
const {Server}=require('socket.io')
const fs=require('fs');

const minType={
    "html":"text/html",
    "css":"text/css",
    "js":"text/javascript"
}

const httpServer=createServer((req, res) => {

    if(req.url==='/'){
        res.writeHead(200,{"Content-Type": "text/html"})
        fs.createReadStream('./templates/list.html').pipe(res)
    }else {
        //doc file .js|css
        const findFileTail=req.url.match(/\.js|.css/)
        if(findFileTail){
            const tail=minType[findFileTail[0].toString().split('.')[1]]
            res.writeHead(200,{"Content-Type":tail })
            fs.createReadStream(__dirname+"/"+req.url).pipe(res)

        }
    }
})

const io=new Server(httpServer)

const users=[
    {
        name: "admin",
        online: false,
        color: 'red'
    },
    {
        name: "phong",
        online: false,
        color: 'red'
    },
    {
        name: "user",
        online: false,
        color: 'red'
    }
]


io.on("connection",socket=>{
    socket.on('login',name=>{
        let userLogin=users.find(user => {
            return user.name===name
        })

        if(userLogin){
            userLogin.online=true;
            userLogin.color='green'
            userLogin.id=socket.id;
            socket.emit('list-user',users)
            socket.broadcast.emit('working',userLogin.name)
        }
    })

    io.on('disconnect',()=>{
        const userDisconnect=users.find(value => {
            return value.id===socket.id
        })
        if(userDisconnect){
            console.log(userDisconnect)
            userDisconnect.online=false;
            userDisconnect.color="red";
            socket.broadcast.emit('user-disconnect',userDisconnect)
        }
    })

})



httpServer.listen(3000,()=>{
    console.log('server listening http://localhost:3000')
})

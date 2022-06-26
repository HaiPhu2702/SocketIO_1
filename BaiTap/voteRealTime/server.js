
const {createServer}=require('http');
const {Server}=require('socket.io');
const fs = require("fs");
const port=8080;
const mimeTypes={
    "html":"text/html",
    'css':"text/css",
    'js':"text/javascript"
}

const httpServer= createServer((req, res) => {
    if(req.url === '/'){
        res.writeHead(200,{"Content-Type": "text/html"})
        fs.createReadStream('./templates/list.html').pipe(res);
    }else {

        const findFileTail=req.url.match(/\.js|.css/);
        if(findFileTail){
            const tail= mimeTypes[findFileTail[0].toString().split('.')[1]]
            res.writeHead(200,{"Content-Type":tail})
            fs.createReadStream(__dirname+"/"+req.url).pipe(res);
        }
    }
})

const questions={
    "topic": "Should dogs be allowed to fly?",
    "choices": [
        {
            "value": "Yes",
            "votes": 5,
            "id": 0
        },
        {
            "value": "No",
            "votes": 6,
            "id": 1
        },
        {
            "value": "Perhaps",
            "votes": 7,
            "id": 2
        }
    ]
}

const io=new Server(httpServer)

io.on("connection",socket=>{

socket.emit('questions',questions)

// socket.on('answer',indexVote=>{
//
//     for(let i=0;i<questions.choices.length;i++){
//         if(questions.choices[i].id===indexVote){
//             questions.choices[i].votes+=1;
//         }
//     }
// socket.emit('updateVote',questions)
//     })

})
httpServer.listen(port,()=>{
    console.log(`server listening http://localhost:${port}`)
})
const socket=io('http://localhost:3000')
let index=0;

$('#todolistForm').submit(e=>{
    e.preventDefault();
    const valueForm=$('#task').val();
    socket.emit('addTask', valueForm)
    showValueForm(valueForm,index)
    index++;
    $('#task').val('').focus();
})

function showValueForm(dataForm,index) {
    $('#todolist').append(`<li><a class="delete" href="#" data-index="${index}">✘</a>task</li>`);
}

socket.on('addTask',objectValueTask=>{
    showValueForm(objectValueTask.task,objectValueTask.index)
})
let tasklist=[];

const createTask = function(text){

    return{
    done: false,
    Text: text,
    create: new Date(),
    }

} 
const addTask= function(){
    let task= createTask(taskElement.value);
    tasklist.push(task);
    console.log(tasklist);
}

const taskElement=document.getElementById("task")
const addButtonE1=document.getElementById("addButton")
addButtonE1.onclick= addTask



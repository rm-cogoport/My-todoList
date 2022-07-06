console.log("My todo list");
let tlt;
let desc;
let status;
let MyTodo = [];
let curr_index = -1;
let todo = document.getElementById('Todo');
todo.addEventListener("click", (e)=>{
    e.preventDefault();
    tlt = document.getElementById("name").value;
    desc = document.getElementById("email").value;
    if (localStorage.getItem('myTodoJson')==null){
        MyTodo = []; 
        if(tlt !== " " && desc !== " "){
            MyTodo.push({tlt:tlt,desc:desc,status:0});
        }
        else{
            alert("Add Todo title and description");
        }
        localStorage.setItem('myTodoJson', JSON.stringify(MyTodo))
    } 
    else{
        TodoJsonStr = localStorage.getItem('myTodoJson')
        MyTodo = JSON.parse(TodoJsonStr);
        if(tlt !== " " && desc !== " "){
            MyTodo.push({tlt:tlt,desc:desc,status:0});
        }
        else{
            alert("Add Todo title and description");
        }
        localStorage.setItem('myTodoJson', JSON.stringify(MyTodo))
    }
    document.getElementById("name").value = " ";
    document.getElementById("email").value = " ";
    myShow();
});


function editKrdoBhai(index){
    console.log(index)
    let Editname = document.getElementById("Editname");
    let EditTlt = document.getElementById("EditTlt");
    Editname.value = MyTodo[index].desc;
    EditTlt.value = MyTodo[index].tlt;
    curr_index = index;
}
function saveTodoTask(){
    let Editname = document.getElementById("Editname");
    let EditTlt = document.getElementById("EditTlt");
    MyTodo[curr_index].desc = Editname.value;
    MyTodo[curr_index].tlt = EditTlt.value;
    localStorage.setItem('myTodoJson', JSON.stringify(MyTodo))
    myShow();
    Editname.value = " ";
    EditTlt.value = " ";
}
function doneTodo(index){
    if(MyTodo[index].status===1){
        MyTodo[index].status = 0;
    }
    else{
        MyTodo[index].status = 1;
    }
    localStorage.setItem('myTodoJson', JSON.stringify(MyTodo))
    myShow();
}
function myShow(){
    if (localStorage.getItem('myTodoJson')==null){
        MyTodo = []; 
        localStorage.setItem('myTodoJson', JSON.stringify(MyTodo))
    } 
    else{
        TodoJsonStr = localStorage.getItem('myTodoJson')
        MyTodo = JSON.parse(TodoJsonStr);
    }
    let str = "";
    MyTodo.forEach((item,index)=>{
        if(item.status===0){
            str += `<tr>
            <th scope="row"><input type="checkbox" onchange="doneTodo(${index})" /></th>
            <th scope="row">${index+1}</th>
            <td>${item.tlt}</td>
            <td>${item.desc}</td>
            <td><button class="btn btn-primary" onclick="editKrdoBhai(${index})">Edit</button></td>
           <td><button class="btn btn-primary" onclick="DeleteKrdoBhai(${index})">Delete</button></td>
        </tr>`
        }
        else{
            str += `<tr class="strike">
            <th scope="row"><input type="checkbox" checked = 'false' onchange="doneTodo(${index})" /></th>
            <th scope="row">${index+1}</th>
            <td>${item.tlt}</td>
            <td>${item.desc}</td>
            <td><button class="btn btn-primary" onclick="editKrdoBhai(${index})">Edit</button></td>
           <td><button class="btn btn-primary" onclick="DeleteKrdoBhai(${index})">Delete</button></td>
        </tr>`
        }
   });
  document.getElementById("addingTodo").innerHTML = str;
}
function DeleteKrdoBhai(index){
    MyTodo.splice(index,1);
    localStorage.setItem('myTodoJson', JSON.stringify(MyTodo))
    myShow();
}
function clearTodo(){
    localStorage.clear();
    myShow();
}
myShow();
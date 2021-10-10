const list = document.querySelector('ul');
const addTodoBtn=document.querySelector('.btn.btn-outline-primary');
const input = document.querySelector('input.form-control');

const fetchTodos = ()=>{
    fetch('/api/')
    .then(res => res.json())
    .then(data => fillTodos(data))
    .catch((err) =>{console.log(err)})
}
fetchTodos();
setInterval(fetchTodos,5000);
const fillTodos = (todos) => {
    list.innerHTML="";
    let title = document.createElement('li');
    title.innerText="ToDo List";
    title.classList.add("list-group-item","text-white","active","h1");
    list.appendChild(title);
    todos.map((todo) => {
        createTodo(todo);
    });
}
const createTodo = (todo) => {
    const li= document.createElement('li');
        const checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox');
        if(todo.done)
        checkbox.setAttribute('checked','checked');
        checkbox.classList.add('form-check-input','me-3');
        li.appendChild(checkbox);
        const span = document.createElement('span');
        span.innerText = todo.todo;
        li.appendChild(span);
        li.setAttribute('data-id', todo._id);
        li.classList.add('list-group-item','list-group-item-action','d-flex','align-items-center','h5');
        const deleteBtn = document.createElement('i');
        deleteBtn.classList.add('bi','bi-trash','h3','ms-auto')
        li.appendChild(deleteBtn);
        list.appendChild(li);
        deleteBtn.onclick = ()=>{
            deleteBtn.parentElement.setAttribute('style', 'display: none !important;');
            fetch('/api/',{
                method: 'delete',
                mode: 'cors',
                headers: { "Content-Type": 'application/json'},
                body: JSON.stringify({ id: todo})
            }).catch(err =>{ console.log(err)})
        }
        checkbox.onchange = ()=>{
            fetch("/api/",{
                method: "PUT",
                mode: 'cors',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: todo._id, 
                    done: checkbox.checked
                })
            }).catch((err) =>{console.log(err)});
        }
}
const addTodo =  () => {
    let data ={
        todo: input.value
    }
    fetch('/api/',{
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(todo => createTodo(todo))
    .catch((err) =>{console.log(err)});
    input.value = "";
    input.blur();
}
addTodoBtn.onclick = addTodo;
input.onkeyup = (e) =>{
    if(e.key === "Enter"){
        addTodo();
    }
}


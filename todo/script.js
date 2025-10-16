function add_p(){
    const text=document.getElementById('display');
    const container = document.querySelector("#container");

    const item = document.createElement("div");
    item.className="todo";

    const span = document.createElement('span')
    span.className = 'todo-text';
    span.textContent = text.value;

    // delete button
    const del = document.createElement('button');
    del.className = 'todo-del';
    del.setAttribute('aria-label', 'Delete todo');
    del.textContent = 'Done';

    function del_item(){
        item.remove();
    }
    del.addEventListener("click", del_item);

    item.appendChild(span);
    item.appendChild(del);
    container.appendChild(item);

    text.value="";
    text.focus();

}

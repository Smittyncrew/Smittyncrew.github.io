document.getElementById("todo-form").addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo();
});

function addTodo() {
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const task = todoInput.value.trim();

    if (task) {
        const listItem = document.createElement("li");
        listItem.textContent = task;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            todoList.removeChild(listItem);
        });

        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
        todoInput.value = "";
    }
}

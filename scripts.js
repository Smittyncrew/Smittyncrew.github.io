//Upon page load, load ToDo list items stored on user's browser storage
document.addEventListener("DOMContentLoaded", loadToDoLocalStorage);

document.getElementById("todo-form").addEventListener("submit", function (event) { //Add todo when submit is pressed.
    event.preventDefault();//Prevent default behavior of js to reload page and sending data to server.
    addTodo();
});

function addTodo() {
    const todoInput = document.getElementById("todo-input");//Text Line
    const todoList = document.getElementById("todo-list");//unordered list (<ul>)
    const task = todoInput.value.trim();//Grab submitted text as a string

    if (task) {
        const listItem = document.createElement("li");//Create new list item.
        listItem.textContent = task;//Set text of new list item to our submitted text.

        const deleteButton = document.createElement("button"); //Create button for deleting task. Button is inside new li
        deleteButton.textContent = "Delete";//Set text of button
        deleteButton.addEventListener("click", function () { //add function to delete button click
            todoList.removeChild(listItem);//If clicked, delete parent listitem.
            saveToDoLocalStorage();//Save Changes on delete
        });

        listItem.appendChild(deleteButton);//This is where delete button attaches to our created listItem, hence why the button is deleted when li is deleted.
        todoList.appendChild(listItem);//Append new listitem to our <ul> from HTML.
        todoInput.value = ""; //Reset text input to prepare for next To-do item.
        saveToDoLocalStorage(); //Save Changes on submit
    }
}
//Saves changes of To-Do list to local browser storage.
function saveToDoLocalStorage() {
    const todoList = document.getElementById("todo-list"); //get <ul> of tasks
    const tasks = Array.from(todoList.getElementsByTagName("li")).map(li => li.textContent.slice(0, -6)); //Creates an array that holds text value of every li. slice -6 needed to not collect delete button text.
    localStorage.setItem("tasks", JSON.stringify(tasks)); //Saves array of tasks under key 'tasks' in local storage. Strings stored as values in JSON.
}

//Loads already saved To-Do list listitems from previous browser sessions.
function loadToDoLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")); //parse json from browser storage under key 'tasks'
    if (savedTasks) {//if tasks exist...
        savedTasks.forEach(task => { //for each task...
            const todoInput = document.getElementById("todo-input");
            todoInput.value = task; //fill input form and addTodo.
            addTodo();
        });
    }
}
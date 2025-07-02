document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("addButton");
    button.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent form submission
        let todoList = getInputValue();
        if (todoList === null) {
            return; // Exit if input is invalid
        }
        addingTask(todoList);
        taskDone(); // Enable task completion functionality
        });
    function getInputValue(){
        const input = document.getElementById("todoInput");
        let list = input.value.trim();
        if(!list){
            alert("Please enter a todo item.");
            return null;
        }
        input.value = ""; // Clear the input field
        return list;
    }
    function addingTask(todoList) {
        let listElement = document.querySelector("#todoList");
        let createTask = document.createElement("li");
        createTask.appendChild(document.createTextNode(todoList));
        taskDone(createTask); 
        addDeleteButton(createTask); // Add delete button to the task

        listElement.appendChild(createTask);       
    }

    // Optional: Add a delete button to each task
    function addDeleteButton(taskElement) {
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.className = "deleteButton";
        deleteButton.addEventListener("click", function() {
            taskElement.remove();
        });
        taskElement.appendChild(deleteButton);
    }

    function taskDone(taskElement) {
        const doneButton = document.createElement("button");
        doneButton.textContent = "✔️";
        doneButton.className = "doneButton";
        doneButton.addEventListener("click", function(event) {
            const taskItem = event.target.parentElement;
            taskItem.classList.toggle("completed");
        });
        taskElement.appendChild(doneButton);
    }
});
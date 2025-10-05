document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // In-memory tasks array
    let tasks = [];

    // Save tasks array to Local Storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create DOM elements for a task and attach remove behaviour
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        removeBtn.onclick = function() {
            taskList.removeChild(li);
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // Add a task. If save === true, persist to Local Storage.
    function addTask(taskText, save = true) {
        if (typeof taskText === 'undefined') {
            taskText = taskInput.value.trim();
        } else {
            taskText = String(taskText).trim();
        }

        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        if (save) {
            tasks.push(taskText);
            saveTasks();
        }

        createTaskElement(taskText);
        taskInput.value = "";
    }

    // Load tasks from Local Storage and render them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = storedTasks.slice();
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Event listeners
    addButton.addEventListener('click', function() {
        addTask();
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initialize
    loadTasks();
});

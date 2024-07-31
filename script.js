document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    document.getElementById('taskInput').addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            addTask();
        }
    });
    document.getElementById('taskList').addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            toggleTask(event.target);
        }
    });
});


function getTasks() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const newTask = input.value.trim();
    if (newTask) {
        const tasks = getTasks();
        tasks.push({ text: newTask, completed: false });
        saveTasks(tasks);
        renderTasks();
        input.value = ""; // Clear input field
    } else {
        alert("Please enter a task!");
    }
}

function renderTasks() {
    const tasks = getTasks();
    const list = document.getElementById("taskList");
    list.innerHTML = ''; // Clear existing tasks

    tasks.forEach((task, index) => {
        list.appendChild(createTaskElement(task, index));
    });
}

function createTaskElement(task, index) {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.className = task.completed ? 'done' : '';
    li.dataset.index = index;
    return li;
}

function toggleTask(li) {
    const tasks = getTasks();
    const index = li.dataset.index;
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    renderTasks();
}

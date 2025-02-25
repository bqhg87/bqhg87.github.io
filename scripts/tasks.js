document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

const TASKS_FILE = "./scripts/tasks.json"; // Path to JSON file

let taskLabels = {}; // Stores task labels from JSON

// Load task labels from JSON
async function fetchTaskLabels() {
    try {
        let response = await fetch(TASKS_FILE);
        taskLabels = await response.json();
        updateTaskList();
    } catch (error) {
        console.error("Error loading task labels:", error);
    }
}

// Get task states from Local Storage
function getTaskStates() {
    return JSON.parse(localStorage.getItem("taskStates")) || {};
}
function saveTaskStates(states) {
    localStorage.setItem("taskStates", JSON.stringify(states));
}

// Get task indexes from Local Storage
function getTaskIndexes() {
    return JSON.parse(localStorage.getItem("taskIndexes")) || {};
}
function saveTaskIndexes(indexes) {
    localStorage.setItem("taskIndexes", JSON.stringify(indexes));
}

// Get next available index for incomplete and completed tasks
function getNextIndexes() {
    return JSON.parse(localStorage.getItem("nextIndexes")) || { incomplete: 1, complete: 1 };
}
function saveNextIndexes(indexes) {
    localStorage.setItem("nextIndexes", JSON.stringify(indexes));
}

// ✅ Add task (make it 'visible' with a proper index)
window.addTask = function (taskId) {
    if (!taskLabels[taskId]) {
        console.log(`Task "${taskId}" does not exist in the JSON file.`);
        return;
    }

    let taskStates = getTaskStates();
    let taskIndexes = getTaskIndexes();
    let nextIndexes = getNextIndexes();

    // If task was hidden, make it visible and assign a new index
    if (!taskStates[taskId] || taskStates[taskId] === "hidden") {
        taskStates[taskId] = "visible";
        taskIndexes[taskId] = nextIndexes.incomplete++; // Assign next available index for incomplete tasks
        saveNextIndexes(nextIndexes);
    }

    saveTaskStates(taskStates);
    saveTaskIndexes(taskIndexes);
    updateTaskList();
};

// ✅ Remove task (make it 'hidden')
window.removeTask = function (taskId) {
    if (!taskLabels[taskId]) {
        console.log(`Task "${taskId}" does not exist in the JSON file.`);
        return;
    }

    let taskStates = getTaskStates();
    taskStates[taskId] = "hidden"; // Set state to 'hidden'
    saveTaskStates(taskStates);
    updateTaskList();
};

// ✅ Toggle task completion (and assign new index if moving to completed)
window.toggleTaskCompletion = function (taskId) {
    if (!taskLabels[taskId]) {
        console.log(`Task "${taskId}" does not exist in the JSON file.`);
        return;
    }

    let taskStates = getTaskStates();
    let taskIndexes = getTaskIndexes();
    let nextIndexes = getNextIndexes();

    if (taskStates[taskId] === "complete") {
        // Moving from 'complete' → 'visible'
        taskStates[taskId] = "visible";
        taskIndexes[taskId] = nextIndexes.incomplete++; // Assign new index for incomplete tasks
    } else {
        // Moving from 'visible' → 'complete'
        taskStates[taskId] = "complete";
        taskIndexes[taskId] = nextIndexes.complete++; // Assign new index for completed tasks
    }

    saveTaskStates(taskStates);
    saveTaskIndexes(taskIndexes);
    saveNextIndexes(nextIndexes);
    updateTaskList();
};

// ✅ Update Task List UI
window.updateTaskList = function () {
    let taskStates = getTaskStates();
    let taskIndexes = getTaskIndexes();
    let taskWrapper = document.querySelector("#taskItemsWrapper");
    taskWrapper.innerHTML = ""; // Clear existing tasks

    let visibleTasks = [];
    let completedTasks = [];

    Object.keys(taskLabels).forEach((taskId) => {
        let state = taskStates[taskId] || "hidden"; // Default to 'hidden'
        let index = taskIndexes[taskId] || 0; // Default index is 0 if not assigned

        if (state === "visible") {
            visibleTasks.push({ id: taskId, label: taskLabels[taskId], index });
        } else if (state === "complete") {
            completedTasks.push({ id: taskId, label: taskLabels[taskId], index });
        }
    });

    // Sort: Highest index first (most recent tasks first)
    visibleTasks.sort((a, b) => b.index - a.index);
    completedTasks.sort((a, b) => b.index - a.index);

    visibleTasks.forEach((task) => taskWrapper.appendChild(createTaskElement(task, false)));

    if (completedTasks.length > 0) {
        let completedHeader = document.createElement("p");
        completedHeader.className = "taskLabel list";
        completedHeader.textContent = "- Completed: -";
        taskWrapper.appendChild(completedHeader);

        completedTasks.forEach((task) => taskWrapper.appendChild(createTaskElement(task, true)));
    }

    applyPxDivStyling(); // Reapply styling
};

// ✅ Create Task Element
function createTaskElement(task, isCompleted) {
    let taskDiv = document.createElement("div");
    taskDiv.className = "pxDivWrapper taskItem";
    taskDiv.id = task.id;

    let taskIcon = document.createElement("div");
    taskIcon.className = isCompleted ? "taskIcon complete" : "taskIcon";
    taskIcon.addEventListener("click", () => toggleTaskCompletion(task.id));

    let taskLabel = document.createElement("p");
    taskLabel.className = "taskLabel";
    taskLabel.textContent = task.label;

    let removeButton = document.createElement("button");
    removeButton.className = "removeTaskButton";
    removeButton.textContent = "X";
    removeButton.addEventListener("click", () => removeTask(task.id));

    taskDiv.appendChild(taskIcon);
    taskDiv.appendChild(taskLabel);
    taskDiv.appendChild(removeButton);

    return taskDiv;
}

// Load tasks on startup
async function loadTasks() {
    await fetchTaskLabels();
}
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

const TASKS_FILE = "./scripts/tasks.json"; // Path to JSON file
const CACHE_KEY = "cachedTasks"; // Key for localStorage

let taskLabels = {}; // Stores task labels from JSON

// Load task labels from JSON, either from cache or fetch the latest
async function fetchTaskLabels() {
    const cachedTasks = localStorage.getItem(CACHE_KEY);
    
    if (cachedTasks) {
        // If cached tasks exist, use them and proceed to update the task list
        taskLabels = JSON.parse(cachedTasks);
        updateTaskList();
        // After loading, check for updates
        checkForUpdates();
    } else {
        // If no cached tasks, fetch them from the file
        try {
            let response = await fetch(TASKS_FILE);
            taskLabels = await response.json();
            localStorage.setItem(CACHE_KEY, JSON.stringify(taskLabels)); // Save to cache
            updateTaskList();
        } catch (error) {
            console.error("Error loading task labels:", error);
        }
    }
}

// Check for updates after the page is loaded
async function checkForUpdates() {
    try {
        let response = await fetch(TASKS_FILE);
        const latestTasks = await response.json();
        
        // Compare the new tasks with the cached tasks
        if (JSON.stringify(latestTasks) !== JSON.stringify(taskLabels)) {
            taskLabels = latestTasks;
            localStorage.setItem(CACHE_KEY, JSON.stringify(latestTasks)); // Update cache
            updateTaskList();
        } else {
        }
    } catch (error) {
        console.error('Error checking for updates:', error);
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

// Add task (make it 'visible' with a proper index)
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

// Remove task (make it 'hidden')
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

// Toggle task completion (and assign new index if moving to completed)
window.toggleTaskCompletion = function(taskId, forceComplete) {
    if (!taskLabels[taskId]) {
        console.log(`Task "${taskId}" does not exist in the JSON file.`);
        return;
    }

    let taskStates = getTaskStates();
    let taskIndexes = getTaskIndexes();
    let nextIndexes = getNextIndexes();

    if (taskStates[taskId] === "complete") {
        if (forceComplete) {
            return; // if forceComplete is true and the task is already complete, nothing happens
        }
        // Moving from 'complete' to 'visible'
        taskStates[taskId] = "visible";
        taskIndexes[taskId] = nextIndexes.incomplete++; // Assign new index for incomplete tasks
    } else {
        // Moving from 'visible' to 'complete'
        taskStates[taskId] = "complete";
        taskIndexes[taskId] = nextIndexes.complete++; // Assign new index for completed tasks
    }

    saveTaskStates(taskStates);
    saveTaskIndexes(taskIndexes);
    saveNextIndexes(nextIndexes);
    updateTaskList();
};

// Update Task List UI
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

    // If no tasks, show a "There are no tasks" message
    if (visibleTasks.length === 0 && completedTasks.length === 0) {
        let noTasksMessage = document.createElement("p");
        noTasksMessage.className = "taskLabel list";
        noTasksMessage.textContent = "- You have no tasks! -";

        let explanationMessage = document.createElement("p");
        explanationMessage.className = "taskLabel explain";
        explanationMessage.textContent = "Characters across the map may give you tasks once you talk to them. You can always come back here to check your progress!";

        document.getElementById('tasksWrapper').classList.add('reduced');
        taskWrapper.appendChild(noTasksMessage);
        taskWrapper.appendChild(document.createElement("br"));
        taskWrapper.appendChild(explanationMessage);
    } else {
        // Sort: Highest index first (most recent tasks first)
        visibleTasks.sort((a, b) => b.index - a.index);
        completedTasks.sort((a, b) => b.index - a.index);
        document.getElementById('tasksWrapper').classList.remove('reduced');

        visibleTasks.forEach((task) => taskWrapper.appendChild(createTaskElement(task, false)));

        if (completedTasks.length > 0) {
            let completedHeader = document.createElement("p");
            completedHeader.className = "taskLabel list";
            completedHeader.textContent = "- Completed: -";
            taskWrapper.appendChild(completedHeader);

            completedTasks.forEach((task) => taskWrapper.appendChild(createTaskElement(task, true)));
        }
    }

    applyPxDivStyling(); // Reapply styling
};

// Create Task Element
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
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});
const TASKS_FILE = "./scripts/tasks.json"; 
const CACHE_KEY = "cachedTasks"; 
let taskLabels = {}; 
async function fetchTaskLabels() {
    const cachedTasks = localStorage.getItem(CACHE_KEY);
    if (cachedTasks) {
        taskLabels = JSON.parse(cachedTasks);
        updateTaskList();
        checkForUpdates();
    } else {
        try {
            let response = await fetch(TASKS_FILE);
            taskLabels = await response.json();
            localStorage.setItem(CACHE_KEY, JSON.stringify(taskLabels)); 
            updateTaskList();
        } catch (error) {
            console.error("Error loading task labels:", error);
        }
    }
}
async function checkForUpdates() {
    try {
        let response = await fetch(TASKS_FILE);
        const latestTasks = await response.json();
        if (JSON.stringify(latestTasks) !== JSON.stringify(taskLabels)) {
            taskLabels = latestTasks;
            localStorage.setItem(CACHE_KEY, JSON.stringify(latestTasks)); 
            updateTaskList();
        } else {
        }
    } catch (error) {
        console.error('Error checking for updates:', error);
    }
}
function getTaskStates() {
    return JSON.parse(localStorage.getItem("taskStates")) || {};
}
function saveTaskStates(states) {
    localStorage.setItem("taskStates", JSON.stringify(states));
}
function getTaskIndexes() {
    return JSON.parse(localStorage.getItem("taskIndexes")) || {};
}
function saveTaskIndexes(indexes) {
    localStorage.setItem("taskIndexes", JSON.stringify(indexes));
}
function getNextIndexes() {
    return JSON.parse(localStorage.getItem("nextIndexes")) || { incomplete: 1, complete: 1 };
}
function saveNextIndexes(indexes) {
    localStorage.setItem("nextIndexes", JSON.stringify(indexes));
}
window.addTask = function (taskId) {
    if (!taskLabels[taskId]) {
        console.log(`Task "${taskId}" does not exist in the JSON file.`);
        return;
    }
    let taskStates = getTaskStates();
    let taskIndexes = getTaskIndexes();
    let nextIndexes = getNextIndexes();
    if (!taskStates[taskId] || taskStates[taskId] === "hidden") {
        taskStates[taskId] = "visible";
        taskIndexes[taskId] = nextIndexes.incomplete++; 
        saveNextIndexes(nextIndexes);
    }
    saveTaskStates(taskStates);
    saveTaskIndexes(taskIndexes);
    updateTaskList();
};
window.removeTask = function (taskId) {
    if (!taskLabels[taskId]) {
        console.log(`Task "${taskId}" does not exist in the JSON file.`);
        return;
    }
    let taskStates = getTaskStates();
    taskStates[taskId] = "hidden"; 
    saveTaskStates(taskStates);
    updateTaskList();
};
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
            return; 
        }
        taskStates[taskId] = "visible";
        taskIndexes[taskId] = nextIndexes.incomplete++; 
    } else {
        taskStates[taskId] = "complete";
        taskIndexes[taskId] = nextIndexes.complete++; 
    }
    saveTaskStates(taskStates);
    saveTaskIndexes(taskIndexes);
    saveNextIndexes(nextIndexes);
    updateTaskList();
};
window.updateTaskList = function () {
    let taskStates = getTaskStates();
    let taskIndexes = getTaskIndexes();
    let taskWrapper = document.querySelector("#taskItemsWrapper");
    taskWrapper.innerHTML = ""; 
    let visibleTasks = [];
    let completedTasks = [];
    Object.keys(taskLabels).forEach((taskId) => {
        let state = taskStates[taskId] || "hidden"; 
        let index = taskIndexes[taskId] || 0; 
        if (state === "visible") {
            visibleTasks.push({ id: taskId, label: taskLabels[taskId], index });
        } else if (state === "complete") {
            completedTasks.push({ id: taskId, label: taskLabels[taskId], index });
        }
    });
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
    applyPxDivStyling(); 
};
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
async function loadTasks() {
    await fetchTaskLabels();
}
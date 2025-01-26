const taskList = document.getElementById("task-list");
const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");
const filterButtons = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks based on the current filter
function renderTasks() {
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "pending") return !task.completed;
    return true; // "all"
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task ${task.completed ? "completed" : ""}`;
    li.setAttribute("draggable", true);
    li.dataset.index = index;

    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
        <button class="toggle">${task.completed ? "Undo" : "Done"}</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  saveTasks();
}

// Add a new task
addTaskButton.addEventListener("click", () => {
  const text = newTaskInput.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  newTaskInput.value = "";
  renderTasks();
});

// Handle task actions (edit, delete, toggle complete)
taskList.addEventListener("click", (e) => {
  const index = e.target.closest(".task").dataset.index;

  if (e.target.classList.contains("edit")) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText) {
      tasks[index].text = newText;
      renderTasks();
    }
  }

  if (e.target.classList.contains("delete")) {
    tasks.splice(index, 1);
    renderTasks();
  }

  if (e.target.classList.contains("toggle")) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  }
});

// Filter tasks
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    renderTasks();
  });
});

// Drag-and-drop reordering
taskList.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", e.target.dataset.index);
});

taskList.addEventListener("dragover", (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(e.clientY);
  if (afterElement) {
    taskList.insertBefore(e.target.closest(".task"), afterElement);
  }
});

taskList.addEventListener("drop", (e) => {
  const draggedIndex = e.dataTransfer.getData("text/plain");
  const targetIndex = e.target.closest(".task").dataset.index;

  const [draggedTask] = tasks.splice(draggedIndex, 1);
  tasks.splice(targetIndex, 0, draggedTask);

  renderTasks();
});

// Get the task after the drop position
function getDragAfterElement(y) {
  const taskElements = [...taskList.querySelectorAll(".task:not(.dragging)")];

  return taskElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    }
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Initialize app
renderTasks();

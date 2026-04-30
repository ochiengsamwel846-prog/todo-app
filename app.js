window.onload = function () {
  loadTasks();
  updateStats();
};

document.getElementById("taskInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();

  if (task === "") return;

  const tasks = getTasksFromStorage();
  tasks.push({ text: task, done: false });

  saveTasks(tasks);
  input.value = "";

  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  const emptyMsg = document.getElementById("emptyMsg");

  taskList.innerHTML = "";

  const tasks = getTasksFromStorage();

  if (tasks.length === 0) {
    emptyMsg.textContent = "No tasks yet. Add something!";
  } else {
    emptyMsg.textContent = "";
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.done) span.classList.add("done");

    span.onclick = function () {
      toggleDone(index);
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";

    delBtn.onclick = function () {
      deleteTask(index);
    };

    li.appendChild(span);
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });

  updateStats();
}

function updateStats() {
  const tasks = getTasksFromStorage();

  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;

  document.getElementById("stats").textContent =
    `Total: ${total} | Completed: ${done}`;
}

function toggleDone(index) {
  const tasks = getTasksFromStorage();
  tasks[index].done = !tasks[index].done;

  saveTasks(tasks);
  renderTasks();
}

function deleteTask(index) {
  const tasks = getTasksFromStorage();
  tasks.splice(index, 1);

  saveTasks(tasks);
  renderTasks();
}

function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  renderTasks();
}
window.onload = function () {
  renderTasks();
};

document.getElementById("taskInput").addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();

  if (!task) return;

  const tasks = getTasksFromStorage();
  tasks.push({ text: task, done: false });

  saveTasks(tasks);
  input.value = "";

  renderTasks();
}

function toggleDone(index) {
  const tasks = getTasksFromStorage();
  tasks[index].done = !tasks[index].done;

  saveTasks(tasks);
  renderTasks();
}

function deleteTask(index) {
  const tasks = getTasksFromStorage();
  tasks.splice(index, 1);

  saveTasks(tasks);
  renderTasks();
}
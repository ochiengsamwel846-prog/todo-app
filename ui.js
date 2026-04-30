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

  document.getElementById("stats").textContent =
    `Total: ${tasks.length} | Completed: ${tasks.filter(t => t.done).length}`;
}
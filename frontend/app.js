const API_BASE_URL = "http://localhost:7071/api"; 
// Update this later if you deploy to Azure, e.g., https://<your-function-app>.azurewebsites.net/api

document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("taskForm");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  // Fetch tasks on load
  fetchTasks();

  // Add task form submission
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    try {
      await addTask(taskText);
      taskInput.value = "";
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  });

  // Fetch tasks from the API
  async function fetchTasks() {
    taskList.innerHTML = "Loading...";
    try {
      const response = await fetch(`${API_BASE_URL}/GetTasks`);
      const tasks = await response.json();
      renderTasks(tasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      taskList.innerHTML = "Error loading tasks.";
    }
  }

  // Render tasks in the DOM
  function renderTasks(tasks) {
    taskList.innerHTML = "";
    if (!Array.isArray(tasks) || tasks.length === 0) {
      taskList.innerHTML = "<li>No tasks yet.</li>";
      return;
    }

    tasks.forEach((task) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = task.text;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", async () => {
        await deleteTask(task.id); 
        fetchTasks();
      });

      li.appendChild(span);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }

  // Add task via API
  async function addTask(text) {
    await fetch(`${API_BASE_URL}/AddTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });
  }

  // Delete task via API
  async function deleteTask(id) {
    await fetch(`${API_BASE_URL}/DeleteTask`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });
  }
});

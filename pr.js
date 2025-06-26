const tasks = [
 "🧠 Learn 1 new English word and use it in a sentence",
  "➕ Solve 2 simple math problems (e.g., 12×3, 45+67)",
  "💻 Read 1 concept from programming (e.g., What is a loop?)",
  "📖 Read 1 motivational quote and write it down",
  "✍️ Write 3 lines about how your day went",
  "🔢 Practice multiplication table for 5 minutes",
  "🌍 Learn 1 new fact about the world or science",
  "📱 Stay away from your phone for 30 minutes and focus",
  "👨‍🏫 Revise yesterday's class notes",
  "🧘 Take 5 deep breaths and relax your eyes",
  "📝 Write a to-do list for tomorrow",
  "💬 Teach one small concept to a friend or sibling",
  "📚 Read 1 paragraph from your favorite book",
  "🎧 Listen to 5 mins of English podcast or news",
  "🧹 Clean your desk or study space"
];

const today = new Date().toISOString().split("T")[0];
let taskData = JSON.parse(localStorage.getItem("dailyTask") || "{}");

function loadTask() {
  
  if (!taskData[today]) {
    const index = Math.floor(Math.random() * tasks.length);
    taskData[today] = tasks[index];
    localStorage.setItem("dailyTask", JSON.stringify(taskData));
  }

  const taskText = taskData[today];
  const taskElement = document.getElementById("task-text");

  const doneData = JSON.parse(localStorage.getItem("doneTasks") || "{}");

  if (doneData[today]) {
   
    taskElement.innerText = `✅ ${taskText}`;
    taskElement.style.textDecoration = "line-through";
  } else {
    
    taskElement.innerText = taskText;
    taskElement.style.textDecoration = "none";
  }

  updateProgress();
}

function markAsDone() {
  let doneData = JSON.parse(localStorage.getItem("doneTasks") || "{}");
  doneData[today] = true;
  localStorage.setItem("doneTasks", JSON.stringify(doneData));
  loadTask(); 
}

function forceNewTask() {
  delete taskData[today];
  localStorage.setItem("dailyTask", JSON.stringify(taskData));

  let doneData = JSON.parse(localStorage.getItem("doneTasks") || "{}");
  delete doneData[today];
  localStorage.setItem("doneTasks", JSON.stringify(doneData));

  loadTask();
}

function updateProgress() {
  let doneData = JSON.parse(localStorage.getItem("doneTasks") || "{}");
  const completed = Object.keys(doneData).length;
  document.getElementById("progress").innerText = `✅ You have completed ${completed} micro tasks so far!`;
}

window.onload = loadTask;

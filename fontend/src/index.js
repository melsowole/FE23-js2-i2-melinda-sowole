import ScrumBoard from "./modules/ScrumBoard";

const scrum = new ScrumBoard();

const addTaskForm = document.querySelector(".task-form");

addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  scrum.addTask(Object.fromEntries(new FormData(addTaskForm)));
});

scrum.displayTasks();

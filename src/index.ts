import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

// type Page = {
//   name: string,
//   selected: boolean
// }

// // const selected: string = "home";

// // const links = document.getElementsByClassName("page-link");
// // let pages: Array<Page>;
// // for (let i: number = 0; i < links.length; i++) {
// //   console.log(links.item(i)?.textContent);
// //   let page: Page = {
// //     name: links.item(i)?.textContent
// //   }
// // }

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("new-task-form") as HTMLFormElement;
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

form.addEventListener("submit", e => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: true,
    createdAt: new Date(),
  }
  tasks.push(newTask);
  saveTasks();

  addListItem(newTask);
  input.value = "";
});

function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  })
  checkbox.type = "checkbox"; // ?
  checkbox.checked = task.completed;

  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}
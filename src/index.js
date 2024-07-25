import "./assets/css/styles.css";
import { createTodo } from "./todos";
import { createProject } from "./projects";

let defaultProject = createProject("Home");

defaultProject.addTodo(
  createTodo(
    "Get familiar with the app",
    "Explore the app and see what it has to offer, start adding todos"
  )
);

// let todoList = defaultProject.getTodoList();

// todoList.forEach((todo, i) => {
//   console.log(todo.getTitle());
//   console.log(todo.getDescription());
//   console.log(todo.getPriority());
// });

// todoList[0].setPriority("LO");

// todoList.forEach((todo, i) => {
//   console.log(todo.getTitle());
//   console.log(todo.getDescription());
//   console.log(todo.getPriority());
// });

// TODO: Create module that interacts with UI. Create displayHandler/screenHandler to handle interaction between logic and UI modules

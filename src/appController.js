import {
  updateProjectList,
  updateProjectDetails,
  drawAddTodo,
  drawTodoForm,
} from "./appView";
import { createTodo } from "./todos";
import { createProject } from "./projects";
import { startOfToday, format } from "date-fns";

const projListContainer = document.querySelector("#project-list");
const projDetailsContainer = document.querySelector("#project-details");
let projectList = [];

function projectClickHandler(e) {
  console.log(e.target.dataset.id);
}

function projectDetailsClickHandler(e) {
  switch (e.target.id) {
    case "add-todo-btn":
      e.target.classList.toggle("hidden");
      drawTodoForm(e.target.closest("#project-details"));
    default:
      break;
  }
}

function createDefaultProject() {
  let defaultProject = createProject("Home");

  defaultProject.addTodo(
    createTodo(
      "Get familiar with the app",
      "Explore the app and see what it has to offer, start adding todos",
      startOfToday()
    )
  );

  defaultProject.getTodoList()[0].setDueTime(14, 15);

  projectList.push(defaultProject);
}

export const screenController = (function (
  projectListContainer,
  projectDetailsContainer
) {
  createDefaultProject();
  updateProjectList(projectListContainer, projectList);
  updateProjectDetails(projectDetailsContainer, projectList[0]);
  drawAddTodo(projectDetailsContainer);

  projectListContainer.addEventListener("click", projectClickHandler);

  projectDetailsContainer.addEventListener("click", projectDetailsClickHandler);
})(projListContainer, projDetailsContainer);

// TODO: need to add event listner for Todo form.
//      Configure behavior when submit button is clicked: create new Todo, hide form, update todo list and show "Add a todo" button
//      Behavior when cancel button is clicked: hide form and show same todo list and "Add a todo" button

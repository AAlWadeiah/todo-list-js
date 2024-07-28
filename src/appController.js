import {
  updateProjectList,
  updateProjectDetails,
  drawAddTodo,
  drawTodoForm,
  hideElement,
  showElement,
} from "./appView";
import { createTodo } from "./todos";
import { createProject } from "./projects";
import moment from "moment";

let projectList = [];

function findProjectByID(projId) {
  for (let p of projectList) {
    if (p.getID() == projId) return p;
  }
}

function projectClickHandler(e) {
  console.log(e.target.dataset.id);
}

function setupTodoForm(container, addTodoBtn) {
  drawTodoForm(container);
  const todoForm = document.querySelector("#todo-form");
  const formContainer = document.querySelector(
    ".form-container:has(#todo-form)"
  );
  const cancelBtn = document.querySelector("#todo-cancel-btn");

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#todo-title");
    const desc = document.querySelector("#todo-desc");
    const dueDate = document.querySelector("#todo-due-date");
    const dueTime = document.querySelector("#todo-due-time");
    const priority = document.querySelector("#todo-priority");
    let project = findProjectByID(container.dataset.projID);

    try {
      let todo = createTodo(
        title.value,
        desc.value,
        dueDate.value,
        priority.value
      );

      let [hrs, mins] = dueTime.value.split(":");
      todo.setDueTime(hrs, mins);

      project.addTodo(todo);
    } catch (error) {
      console.error(error);
    }
    updateProjectDetails(container, project);
    drawAddTodo(container);
    formContainer.remove();
  });

  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showElement(addTodoBtn);
    formContainer.remove();
  });
}

function projectDetailsClickHandler(e) {
  switch (e.target.id) {
    case "add-todo-btn":
      hideElement(e.target);
      setupTodoForm(e.target.closest("#project-details"), e.target);
    default:
      break;
  }
}

function createDefaultProject() {
  let defaultProject = createProject("Home");

  let date = moment().date();
  let month = moment().month(); // jan=0, dec=11
  let year = moment().year();

  defaultProject.addTodo(
    createTodo(
      "Get familiar with the app",
      "Explore the app and see what it has to offer, start adding todos",
      `${year}-${month}-${date}`
    )
  );

  defaultProject.getTodoList()[0].setDueTime(14, 15);

  projectList.push(defaultProject);
}

export const screenController = (function () {
  const projectListContainer = document.querySelector("#project-list");
  const projectDetailsContainer = document.querySelector("#project-details");

  createDefaultProject();
  updateProjectList(projectListContainer, projectList);
  updateProjectDetails(projectDetailsContainer, projectList[0]);
  drawAddTodo(projectDetailsContainer);

  projectListContainer.addEventListener("click", projectClickHandler);

  projectDetailsContainer.addEventListener("click", projectDetailsClickHandler);
})();

// TODO: need to add event listner for Todo form.
//      Configure behavior when submit button is clicked: create new Todo, hide form, update todo list and show "Add a todo" button

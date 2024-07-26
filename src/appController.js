import { updateProjectList } from "./appView";
import { createTodo } from "./todos";
import { createProject } from "./projects";

const projListContainer = document.querySelector("#project-list");
const projDetailsContainer = document.querySelector("#project-details");
let projectList = [];

function projectClickHandler(e) {
  console.log(e.target.dataset.id);
}

function projectDetailsClickHandler(e) {
  console.log(e.target.dataset.id);
}

function createDefaultProject() {
  let defaultProject = createProject("Home");

  defaultProject.addTodo(
    createTodo(
      "Get familiar with the app",
      "Explore the app and see what it has to offer, start adding todos"
    )
  );

  projectList.push(defaultProject);
}

export const screenController = (function (
  projectListContainer,
  projectDetailsContainer
) {
  createDefaultProject();
  updateProjectList(projectListContainer, projectList);

  projectListContainer.addEventListener("click", projectClickHandler);

  projectDetailsContainer.addEventListener("clicl", projectDetailsClickHandler);
})(projListContainer, projDetailsContainer);

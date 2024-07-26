import { updateProjectList, updateProjectDetails } from "./appView";
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
  console.log(e.target.dataset.id);
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

  projectListContainer.addEventListener("click", projectClickHandler);

  projectDetailsContainer.addEventListener("clicl", projectDetailsClickHandler);
})(projListContainer, projDetailsContainer);

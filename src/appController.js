import {
  updateProjectList,
  updateProjectDetails,
  drawAddTodo,
  drawTodoForm,
  hideElement,
  showElement,
  drawNewProjectModal,
} from "./appView";
import { createTodo } from "./todos";
import { createProject } from "./projects";
import moment from "moment";

let projectList = [];
let todoList = [];

const projectListContainer = document.querySelector("#project-list");
const projectDetailsContainer = document.querySelector("#project-details");

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function getFromLocalStorage(key, defaultValue = null) {
  if (storageAvailable("localStorage")) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } else {
    return null;
  }
}

function setInLocalStorage(key, value) {
  if (storageAvailable("localStorage")) {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } else {
    return false;
  }
}

function saveTodosToLocalStorage(todos) {
  return setInLocalStorage("todos", JSON.stringify(todos));
}

function saveProjectsToLocalStorage(projects) {
  return setInLocalStorage("projects", JSON.stringify(projects));
}

function getProjectsFromLocalStorage() {
  let projectsData = JSON.parse(getFromLocalStorage("projects"));
  // console.log(projectsData);
  if (projectsData) {
    // console.log(typeof projectsData);
    return projectsData.map((proj) => createProject(proj.name, proj.ID));
  }
  return [];
}

function getTodosFromLocalStorage() {
  const todosData = JSON.parse(getFromLocalStorage("todos"));
  if (todosData) {
    return todosData.map((todo) =>
      createTodo(
        todo.title,
        todo.description,
        todo.dueDate,
        todo.dueTime,
        todo.priority,
        todo.assignedProject,
        todo.complete,
        todo.ID
      )
    );
  }
  return [];
}

function getTodosOfProject(projID) {
  return todoList.filter((todo) => {
    if (todo.getAssignedProject() === projID) return todo;
  });
}

const compareArrays = (a, b) => {
  return a.toString() === b.toString();
};

function findProjectByID(projId) {
  for (let p of projectList) {
    if (p.getID() == projId) return p;
  }
}

function findTodoByID(projectObj, todoID) {
  for (let t of projectObj.getTodoList()) {
    if (t.getID() === todoID) return t;
  }
}

function closeModal(modal) {
  modal.close();
  modal.remove();
}

function addProjectToProjectList(project) {
  projectList.push(project);
  saveProjectsToLocalStorage(projectList);
}

function addTodoToTodoList(todo) {
  todoList.push(todo);
  saveTodosToLocalStorage(todoList);
}

function isDisplayedInProjectDetails(projDetails, projObj) {
  return projDetails.dataset.projID === projObj.getID();
}

function setupProjectModal(defaultProject = null) {
  let projName;
  if (defaultProject) projName = defaultProject.getProjectName();
  const newProjModal = drawNewProjectModal(projName);
  document.body.appendChild(newProjModal);
  newProjModal.showModal();

  const closeBtn = document.querySelector(
    `#${newProjModal.id} .close-modal-btn`
  );
  const cancelBtn = document.querySelector(
    `#${newProjModal.id} #project-cancel-btn`
  );
  const createBtn = document.querySelector(
    `#${newProjModal.id} #project-create-btn`
  );

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal(newProjModal);
  });

  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal(newProjModal);
  });

  newProjModal.addEventListener("submit", (e) => {
    const nameInput = document.querySelector("#project-name-input");

    if (defaultProject) {
      defaultProject.setName(nameInput.value);
      if (isDisplayedInProjectDetails(projectDetailsContainer, defaultProject))
        updateProjectDetails(
          projectDetailsContainer,
          defaultProject,
          getTodosOfProject(defaultProject.getID())
        );
    } else {
      addProjectToProjectList(createProject(nameInput.value));
    }
    updateProjectList(projectListContainer, projectList);
    closeModal(newProjModal);
  });
}

function projectListClickHandler(e) {
  let project = findProjectByID(e.target.dataset.id);
  if (e.target.id === "new-project-btn") {
    setupProjectModal();
  } else if (project) {
    updateProjectDetails(
      projectDetailsContainer,
      project,
      getTodosOfProject(project.getID())
    );
    drawAddTodo(projectDetailsContainer);
  } else if (e.target.classList.contains("edit-btn")) {
    let project = findProjectByID(e.target.closest(".project-item").dataset.id);
    setupProjectModal(project);
  }
}

function setupTodoForm(container, addTodoBtn) {
  container.appendChild(drawTodoForm());
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
      let todo = createTodo(title.value, desc.value, dueDate.value);

      if (dueTime.value) {
        let [hrs, mins] = dueTime.value.split(":");
        todo.setDueTime(hrs, mins);
      }

      if (priority.value) {
        todo.setPriority(priority.value);
      }

      // project.addTodo(todo);
      todo.setAssignedProject(project.getID());
      addTodoToTodoList(todo);
    } catch (error) {
      console.error(error);
    }
    updateProjectDetails(
      container,
      project,
      getTodosOfProject(project.getID())
    );
    drawAddTodo(container);
    formContainer.remove();
  });

  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showElement(addTodoBtn);
    formContainer.remove();
  });
}

function editTodo(projContainer, projObj, todoEl, todoToEdit, editBtn) {
  const editForm = drawTodoForm(todoToEdit);
  projContainer.replaceChild(editForm, todoEl);
  const todoForm = editForm.querySelector("#todo-form");
  const cancelBtn = document.querySelector("#todo-cancel-btn");

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#todo-title");
    const desc = document.querySelector("#todo-desc");
    const dueDate = document.querySelector("#todo-due-date");
    const dueTime = document.querySelector("#todo-due-time");
    const priority = document.querySelector("#todo-priority");

    try {
      todoToEdit.setTitle(title.value);
      todoToEdit.setDescription(desc.value);
      todoToEdit.setDueDate(dueDate.value);

      if (dueTime.value) {
        let [hrs, mins] = dueTime.value.split(":");
        todoToEdit.setDueTime(hrs, mins);
      }

      if (priority.value) {
        todoToEdit.setPriority(priority.value);
      }
    } catch (error) {
      console.error(error);
    }
    updateProjectDetails(
      projContainer,
      projObj,
      getTodosOfProject(projObj.getID())
    );
    drawAddTodo(projContainer);
  });

  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    projContainer.replaceChild(todoEl, editForm);
  });
}

function projectDetailsClickHandler(e) {
  const projectEl = e.target.closest("#project-details");
  if (e.target.id === "add-todo-btn") {
    hideElement(e.target);
    setupTodoForm(projectEl, e.target);
  } else if (e.target.classList.contains("check-circle")) {
    const projectObj = findProjectByID(projectEl.dataset.projID);
    const todoElID = e.target.closest(".todo-container").dataset.id;
    const todoObj = findTodoByID(projectObj, todoElID);
    todoObj.setToComplete();
    updateProjectDetails(
      projectEl,
      projectObj,
      getTodosOfProject(projectObj.getID())
    );
    drawAddTodo(projectEl);
  } else if (e.target.classList.contains("edit-btn")) {
    const projectObj = findProjectByID(projectEl.dataset.projID);
    const todoEl = e.target.closest(".todo-container");
    const todoElID = todoEl.dataset.id;
    const todoObj = findTodoByID(projectObj, todoElID);
    editTodo(projectEl, projectObj, todoEl, todoObj, e.target);
  }
}

function createDefaultProject() {
  let defaultProject = createProject("Home");

  let date = moment().date();
  let month = moment().month(); // jan=0, dec=11
  let year = moment().year();

  let defaultTodo = createTodo(
    "Get familiar with the app",
    "Explore the app and see what it has to offer, start adding todos",
    `${year}-${month}-${date}`
  );

  defaultTodo.setDueTime(14, 15);
  defaultTodo.setPriority("medium");
  defaultTodo.setAssignedProject(defaultProject.getID());

  projectList.push(defaultProject);
  todoList.push(defaultTodo);
  console.log(projectList);
  saveProjectsToLocalStorage(projectList);
  saveTodosToLocalStorage(todoList);
}

export const screenController = (function () {
  const projectListContainer = document.querySelector("#project-list");
  const projectDetailsContainer = document.querySelector("#project-details");

  if (
    getFromLocalStorage("projects") === null &&
    getFromLocalStorage("todos") === null
  ) {
    createDefaultProject();
  } else {
    projectList = getProjectsFromLocalStorage();
    todoList = getTodosFromLocalStorage();
  }

  updateProjectList(projectListContainer, projectList);
  updateProjectDetails(
    projectDetailsContainer,
    projectList[0],
    getTodosOfProject(projectList[0].getID())
  );
  drawAddTodo(projectDetailsContainer);

  projectListContainer.addEventListener("click", projectListClickHandler);

  projectDetailsContainer.addEventListener("click", projectDetailsClickHandler);
})();

// TODO:
// Add logic to write data to localStorage

import { se } from "date-fns/locale";
import moment from "moment";

export function updateProjectList(container, projects) {
  for (let proj of projects) {
    const pDiv = document.createElement("div");

    pDiv.dataset.id = proj.getID();
    pDiv.classList.toggle("project-item");
    pDiv.textContent = proj.getProjectName();

    container.appendChild(pDiv);
  }
}

export function updateProjectDetails(container, project) {
  container.innerHTML = "";
  container.dataset.projID = project.getID();
  const projName = document.createElement("h1");
  projName.textContent = project.getProjectName();
  container.appendChild(projName);

  for (let todo of project.getTodoList()) {
    const todoDiv = document.createElement("div");
    todoDiv.dataset.id = todo.getID();
    todoDiv.classList.toggle("todo-item");

    const todoTitle = document.createElement("p");
    todoTitle.textContent = todo.getTitle();

    let dueDiv = document.createElement("div");
    dueDiv.classList.toggle("todo-deadline");
    if (todo.getDueDate()) {
      const dueDate = document.createElement("span");
      let formatted = moment(todo.getDueDate()).format("D MMM YYYY");
      dueDate.textContent = formatted;
      dueDiv.appendChild(dueDate);
    }
    if (todo.getDueTime()) {
      const dueTime = document.createElement("span");
      dueTime.textContent = todo.getSemanticDueTime();
      dueDiv.appendChild(dueTime);
    }

    todoDiv.append(todoTitle, dueDiv);
    container.appendChild(todoDiv);
  }
}

export function drawAddTodo(container) {
  const addTodoBtn = document.createElement("button");
  addTodoBtn.id = "add-todo-btn";
  addTodoBtn.classList.toggle("tertiary-cta-btn");
  addTodoBtn.textContent = "+ Add a todo";
  container.appendChild(addTodoBtn);
}

export function drawTodoForm(container) {
  const formContainer = document.createElement("div");
  formContainer.classList.toggle("form-container");

  const form = document.createElement("form");
  form.action = "";
  form.method = "get";
  form.id = "todo-form";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.name = "todo-title";
  titleInput.id = "todo-title";
  titleInput.placeholder = "Title";
  titleInput.required = true;
  titleInput.focus();
  titleInput.style.gridArea = "title";

  const descInput = document.createElement("input");
  descInput.type = "text";
  descInput.name = "todo-desc";
  descInput.id = "todo-desc";
  descInput.placeholder = "Description";
  descInput.style.gridArea = "desc";

  const dueDate = document.createElement("input");
  dueDate.type = "date";
  dueDate.id = "todo-due-date";
  dueDate.style.gridArea = "due-date";

  const dueTime = document.createElement("input");
  dueTime.type = "time";
  dueTime.id = "todo-due-time";
  dueTime.style.gridArea = "due-time";

  let priorityArr = ["Low", "Medium", "High"];
  const prioritySelect = document.createElement("select");
  prioritySelect.id = "todo-priority";
  prioritySelect.style.gridArea = "priority";

  const selectPlaceholder = document.createElement("option");
  selectPlaceholder.classList.toggle("select-placeholder");
  selectPlaceholder.textContent = "Priority";
  selectPlaceholder.value = "";
  selectPlaceholder.disabled = true;
  selectPlaceholder.selected = true;
  selectPlaceholder.hidden = true;
  prioritySelect.appendChild(selectPlaceholder);

  for (let p of priorityArr) {
    const option = document.createElement("option");
    option.value = p;
    option.textContent = p;
    prioritySelect.appendChild(option);
  }

  const cancelBtn = document.createElement("button");
  cancelBtn.classList.toggle("secondary-cta-btn");
  cancelBtn.textContent = "Cancel";
  cancelBtn.value = "cancel";
  cancelBtn.id = "todo-cancel-btn";
  cancelBtn.style.gridArea = "cancel";

  const addTodoBtn = document.createElement("button");
  addTodoBtn.classList.toggle("main-cta-btn");
  addTodoBtn.textContent = "Add todo";
  addTodoBtn.type = "submit";
  addTodoBtn.id = "todo-add-btn";
  addTodoBtn.style.gridArea = "add";

  form.append(
    titleInput,
    descInput,
    dueDate,
    dueTime,
    prioritySelect,
    cancelBtn,
    addTodoBtn
  );
  formContainer.appendChild(form);
  container.appendChild(formContainer);
}

export function hideElement(el) {
  el.classList.add("hidden");
}

export function showElement(el) {
  el.classList.remove("hidden");
}

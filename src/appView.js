import { getPriorityColorClass } from "./todos";
import moment from "moment";
import { format } from "date-fns";

function clearContainer(container) {
  container.innerHTML = "";
}

// DELETE IF NOT USED
// export function isVisible(elem) {
//   // source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js
//   return (
//     !!elem &&
//     !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length)
//   );
// }

export function updateProjectList(container, projects) {
  for (let proj of projects) {
    const pDiv = document.createElement("div");

    pDiv.dataset.id = proj.getID();
    pDiv.classList.toggle("project-item");
    pDiv.textContent = proj.getProjectName();

    container.appendChild(pDiv);
  }
}

function drawEditTodo(container) {
  const editTodoBtn = document.createElement("button");
  editTodoBtn.classList.toggle("tertiary-cta-btn");
  editTodoBtn.classList.toggle("edit-btn");
  editTodoBtn.textContent = "Edit";
  container.appendChild(editTodoBtn);
}

export function updateProjectDetails(container, project) {
  clearContainer(container);
  container.dataset.projID = project.getID();
  const projName = document.createElement("h1");
  projName.textContent = project.getProjectName();
  container.appendChild(projName);

  for (let todo of project.getTodoList()) {
    if (todo.getComplete()) continue;

    const todoContainer = document.createElement("div");
    todoContainer.dataset.id = todo.getID();
    todoContainer.classList.toggle("todo-container");

    const circleForComplete = document.createElement("span");
    circleForComplete.classList.toggle("check-circle");
    todoContainer.appendChild(circleForComplete);

    const todoContent = document.createElement("div");
    todoContent.classList.toggle("todo-content");

    const todoTitle = document.createElement("div");
    todoTitle.textContent = todo.getTitle();
    todoTitle.classList.toggle("todo-title");
    todoTitle.classList.toggle("todo-field");

    const todoDesc = document.createElement("div");
    todoDesc.textContent = todo.getDescription();
    todoDesc.classList.toggle("subtext");
    todoDesc.classList.toggle("todo-desc");
    todoDesc.classList.toggle("todo-field");

    const bottomDiv = document.createElement("div");
    bottomDiv.classList.toggle("todo-bottom");
    bottomDiv.classList.toggle("subtext");

    if (todo.getDueDate()) {
      const dueDate = document.createElement("span");

      dueDate.textContent = todo.getFormattedDueDate();
      dueDate.classList.toggle("todo-field");
      dueDate.classList.toggle("due-date");
      bottomDiv.appendChild(dueDate);
    }
    if (todo.getDueTime()) {
      const dueTime = document.createElement("span");
      dueTime.textContent = todo.getSemanticDueTime();
      dueTime.classList.toggle("todo-field");
      dueTime.classList.toggle("due-time");
      bottomDiv.appendChild(dueTime);
    }

    if (todo.getPriority()) {
      const priorityFlag = document.createElement("span");
      priorityFlag.classList.toggle("material-icons");
      priorityFlag.textContent = "flag";
      priorityFlag.classList.toggle(getPriorityColorClass(todo.getPriority()));
      priorityFlag.classList.toggle("todo-field");
      priorityFlag.classList.toggle("priority-flag");

      bottomDiv.appendChild(priorityFlag);
    }

    todoContent.append(todoTitle, todoDesc, bottomDiv);
    drawEditTodo(todoContent);
    todoContainer.appendChild(todoContent);
    container.appendChild(todoContainer);
  }
}

export function drawAddTodo(container) {
  const addTodoBtn = document.createElement("button");
  addTodoBtn.id = "add-todo-btn";
  addTodoBtn.classList.toggle("tertiary-cta-btn");
  addTodoBtn.textContent = "+ Add a todo";
  container.appendChild(addTodoBtn);
}

export function generateTitleInput(defVal = null) {
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.name = "todo-title";
  titleInput.id = "todo-title";
  titleInput.placeholder = "Title";
  titleInput.required = true;
  titleInput.focus();
  titleInput.style.gridArea = "title";
  titleInput.classList.toggle("form-control");
  if (defVal) titleInput.value = defVal;
  return titleInput;
}

export function generateDescInput(defVal = null) {
  const descInput = document.createElement("input");
  descInput.type = "text";
  descInput.name = "todo-desc";
  descInput.id = "todo-desc";
  descInput.placeholder = "Description";
  descInput.style.gridArea = "desc";
  descInput.classList.toggle("form-control");
  if (defVal) descInput.value = defVal;
  return descInput;
}

export function generateDueDateInput(defVal = null) {
  const dueDate = document.createElement("input");
  dueDate.type = "date";
  dueDate.id = "todo-due-date";
  dueDate.style.gridArea = "due-date";
  dueDate.classList.toggle("form-control");
  if (defVal) {
    dueDate.value = moment(defVal).format("YYYY-MM-DD");
  }
  return dueDate;
}

export function generateDueTimeInput(defVal = null) {
  const dueTime = document.createElement("input");
  dueTime.type = "time";
  dueTime.id = "todo-due-time";
  dueTime.style.gridArea = "due-time";
  dueTime.classList.toggle("form-control");
  if (defVal) {
    dueTime.value = format(defVal, "hh:mm");
  }
  return dueTime;
}

export function generatePrioritySelect(defVal = null) {
  let priorityArr = ["Low", "Medium", "High"];
  const prioritySelect = document.createElement("select");
  prioritySelect.id = "todo-priority";
  prioritySelect.style.gridArea = "priority";
  prioritySelect.classList.toggle("form-control");

  const selectPlaceholder = document.createElement("option");
  selectPlaceholder.classList.toggle("select-placeholder");
  if (defVal) {
    selectPlaceholder.value = defVal;
    selectPlaceholder.textContent = defVal;
  } else {
    selectPlaceholder.textContent = "Priority";
    selectPlaceholder.value = "";
  }

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

  return prioritySelect;
}

export function drawTodoForm(todoToEdit = null) {
  const formContainer = document.createElement("div");
  formContainer.classList.toggle("form-container");

  const form = document.createElement("form");
  form.action = "";
  form.method = "get";
  form.id = "todo-form";

  let defTitle;
  let defDesc;
  let defDueDate;
  let defDueTime;
  let defPriority;
  if (todoToEdit) {
    const todoDetails = todoToEdit.getTodoDetails();
    defTitle = todoDetails.title;
    defDesc = todoDetails.description;
    defDueDate = todoDetails.dueDate;
    defDueTime = todoDetails.dueTime;
    defPriority = todoDetails.priority;
  }

  const titleInput = generateTitleInput(defTitle);

  const descInput = generateDescInput(defDesc);

  const dueDate = generateDueDateInput(defDueDate);

  const dueTime = generateDueTimeInput(defDueTime);

  const prioritySelect = generatePrioritySelect(defPriority);

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
  return formContainer;
  // container.appendChild(formContainer);
}

export function hideElement(el) {
  el.classList.add("hidden");
}

export function showElement(el) {
  el.classList.remove("hidden");
}

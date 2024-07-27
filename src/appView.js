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
      dueDate.textContent = todo.getSemanticDueDate();
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
  addTodoBtn.classList.toggle("active");
  addTodoBtn.textContent = "+ Add a todo";
  container.appendChild(addTodoBtn);
}

export function drawTodoForm(container) {
  const formContainer = document.createElement("div");
  formContainer.classList.toggle("form-container");
  formContainer.classList.toggle("active");

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

  const cancelBtn = document.createElement("button");
  cancelBtn.classList.toggle("secondary-cta-btn");
  cancelBtn.textContent = "Cancel";
  cancelBtn.value = "cancel";

  const addTodoBtn = document.createElement("button");
  addTodoBtn.classList.toggle("main-cta-btn");
  addTodoBtn.textContent = "Add todo";
  addTodoBtn.type = "submit";

  form.append(titleInput, cancelBtn, addTodoBtn);
  formContainer.appendChild(form);
  container.appendChild(formContainer);
}

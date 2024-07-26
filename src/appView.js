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

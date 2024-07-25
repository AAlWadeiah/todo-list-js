function createProject(name) {
  let todoList = [];
  const getProjectName = () => name;
  const getTodoList = () => todoList;

  const addTodo = (todo) => {
    todoList.push(todo);
  };
  const removeTodo = (todo) => {
    let index = todoList.indexOf(todo);
    if (index) todoList.splice(index, 1);
  };

  return {
    getProjectName,
    getTodoList,
    addTodo,
    removeTodo,
  };
}

export { createProject };

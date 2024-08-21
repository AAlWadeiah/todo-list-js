import { v4 as uuidv4 } from "uuid";

function createProject(name) {
  let todoList = [];
  const ID = uuidv4();

  const getID = () => ID;
  const getProjectName = () => name;
  const getTodoList = () => todoList;

  const addTodo = (todo) => {
    todoList.push(todo);
  };
  const removeTodo = (todo) => {
    let index = todoList.indexOf(todo);
    if (index) todoList.splice(index, 1);
  };

  const setName = (newName) => (name = newName);

  return {
    getProjectName,
    getTodoList,
    getID,
    addTodo,
    removeTodo,
    setName,
  };
}

export { createProject };

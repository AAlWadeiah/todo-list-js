import { v4 as uuidv4 } from "uuid";

function createProject(name, id = null) {
  const ID = id ? id : uuidv4();

  const getID = () => ID;
  const getProjectName = () => name;

  const setName = (newName) => (name = newName);
  function toJSON() {
    return { ID: getID(), name: getProjectName() };
  }

  return {
    getProjectName,
    getID,
    setName,
    toJSON,
  };
}

export { createProject };

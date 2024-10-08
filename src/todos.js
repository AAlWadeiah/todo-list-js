import { isFuture, format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

// Priority levels enum
class Priority {
  static #_LOW_PRIORITY = 0;
  static #_MEDIUM_PRIORITY = 1;
  static #_HIGH_PRIORITY = 2;

  static get LOW() {
    return this.#_LOW_PRIORITY;
  }
  static get MEDIUM() {
    return this.#_MEDIUM_PRIORITY;
  }
  static get HIGH() {
    return this.#_HIGH_PRIORITY;
  }
}

function priorityToString(p) {
  if (p === Priority.LOW) return "Low";
  if (p === Priority.MEDIUM) return "Medium";
  if (p === Priority.HIGH) return "High";
}

function isPriorityLvl(priority) {
  return priority instanceof Priority;
}

function isWithin24Hrs(hrs, min) {
  let timeInMin = +hrs * 60 + +min; // convert all to minutes
  return timeInMin > 1 && timeInMin < 1440;
}

function isNumber(val) {
  return typeof val !== "number";
}

function isString(val) {
  return typeof val !== "string";
}

function toPriorityLvl(priority) {
  if (
    priority === 0 ||
    priority.toLowerCase() === "low" ||
    priority.toLowerCase() === "lo"
  ) {
    return Priority.LOW;
  }
  if (
    priority === 1 ||
    priority.toLowerCase() === "medium" ||
    priority.toLowerCase() === "med"
  ) {
    return Priority.MEDIUM;
  }
  if (
    priority === 2 ||
    priority.toLowerCase() === "high" ||
    priority.toLowerCase() === "hi"
  ) {
    return Priority.HIGH;
  }
}

function getPriorityColorClass(priority) {
  let pLvl = toPriorityLvl(priority);
  if (pLvl === Priority.LOW) return "low-priority";
  if (pLvl === Priority.MEDIUM) return "medium-priority";
  if (pLvl === Priority.HIGH) return "high-priority";
}

// Todo factory function
function createTodo(
  title,
  description = null,
  dueDate = null,
  dueTime = null,
  priority = null,
  assignedProject = null,
  completeStatus = null,
  id = null
) {
  let complete = completeStatus ? completeStatus : false;
  const ID = id ? id : uuidv4();

  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getFormattedDueDate = () => moment(dueDate).format("D MMM YYYY");
  const getDueTime = () => dueTime;
  const getSemanticDueTime = () => format(dueTime, "p");
  const getPriority = () => priorityToString(priority);
  const getComplete = () => complete;
  const getID = () => ID;
  const getAssignedProject = () => assignedProject;

  const getTodoDetails = () => {
    return {
      title: getTitle(),
      description: description ? getDescription() : null,
      dueDate: dueDate ? getDueDate() : null,
      dueTime: dueTime ? getDueTime() : null,
      priority: priority ? getPriority() : null,
      id: getID(),
      complete: getComplete(),
    };
  };

  const setTitle = (newTitle) => (title = newTitle);
  const setDescription = (newDesc) => (description = newDesc);
  const setDueDate = (newDueDate) => {
    // Do not accept dates that are in the past
    if (isFuture(newDueDate)) dueDate = newDueDate;
  };
  const clearDueDate = () => (dueDate = null);
  const setDueTime = (hours, min) => {
    if (isWithin24Hrs(hours, min)) {
      dueTime = new Date().setHours(hours, min);
    }
  };
  const clearDueTime = () => (dueTime = null);
  const setPriority = (priorityLvl) => {
    // Only accept valid priority levels
    if (isPriorityLvl(priorityLvl)) priority = priorityLvl;
    else if (isNumber(priorityLvl) || isString(priorityLvl))
      priority = toPriorityLvl(priorityLvl);
  };
  const setToComplete = () => (complete = true);
  const setAssignedProject = (projectID) => (assignedProject = projectID);

  function toJSON() {
    return {
      ID: getID(),
      title: getTitle(),
      description: getDescription(),
      dueDate: getDueDate(),
      dueTime: getDueTime(),
      priority: getPriority(),
      complete: getComplete(),
      assignedProject: getAssignedProject(),
    };
  }

  return {
    getTitle,
    getDescription,
    getDueDate,
    getFormattedDueDate,
    getDueTime,
    getSemanticDueTime,
    getPriority,
    getComplete,
    getID,
    getAssignedProject,
    setTitle,
    setDescription,
    setDueDate,
    clearDueDate,
    setDueTime,
    clearDueTime,
    setPriority,
    setToComplete,
    setAssignedProject,
    getTodoDetails,
    toJSON,
  };
}

export { createTodo, getPriorityColorClass };

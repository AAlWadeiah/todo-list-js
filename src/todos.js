import { isFuture, minutesToMilliseconds, format, getUnixTime } from "date-fns";
import { v4 as uuidv4 } from "uuid";

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

// Todo factory function
function createTodo(
  title,
  description = null,
  dueDate = null,
  dueTime = null,
  priority = null,
  notes = null
) {
  let tags = [];
  let complete = false;
  const ID = uuidv4();

  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getSemanticDueDate = () => format(dueDate, "PP");
  const getDueTime = () => dueTime;
  const getSemanticDueTime = () => format(dueTime, "p");
  const getPriority = () => priorityToString(priority);
  const getNotes = () => notes;
  const getTags = () => tags;
  const getComplete = () => complete;
  const getID = () => ID;

  const setTitle = (newTitle) => (title = newTitle);
  const setDescription = (newDesc) => (description = newDesc);
  const setDueDate = (newDueDate) => {
    // Do not accept dates that are in the past
    if (isFuture(newDueDate)) dueDate = newDueDate;
  };
  const clearDueDate = () => (dueDate = null);
  const setDueTime = (hours, min) => {
    if (isWithin24Hrs(hours, min)) {
      let newTime = new Date().setHours(hours, min);
      dueTime = newTime;
    }
  };
  const clearDueTime = () => (dueTime = null);
  const setPriority = (priorityLvl) => {
    // Only accept valid priority levels
    if (isPriorityLvl(priorityLvl)) priority = priorityLvl;
    else if (isNumber(priorityLvl) || isString(priorityLvl))
      priority = toPriorityLvl(priorityLvl);
  };
  const setNotes = (newNotes) => (notes = newNotes);
  const addTag = (tag) => {
    // Cannot have duplicate tags
    if (!tags.includes(tag)) tags.push(tag);
  };
  const removeTag = (tag) => {
    let index = tags.indexOf(tag);
    if (index) tags.splice(index, 1);
  };
  const setToComplete = () => (complete = true);

  return {
    getTitle,
    getDescription,
    getDueDate,
    getSemanticDueDate,
    getDueTime,
    getSemanticDueTime,
    getPriority,
    getNotes,
    getTags,
    getComplete,
    getID,
    setTitle,
    setDescription,
    setDueDate,
    clearDueDate,
    setDueTime,
    clearDueTime,
    setPriority,
    setNotes,
    addTag,
    removeTag,
    setToComplete,
  };
}

export { createTodo };

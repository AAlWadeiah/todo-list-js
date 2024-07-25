import { isFuture, minutesToMilliseconds } from "date-fns";

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

function isPriorityLvl(priority) {
  return priority instanceof Priority;
}

function isWithin24Hrs(time) {
  return time > minutesToMilliseconds(1) && time < minutesToMilliseconds(1440);
}

function toPriorityLvl(priority) {
  if (typeof priority !== "number" || typeof priority !== "string") return;

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
// Due date and time are stored as milliseconds
function createTodo(
  title,
  description,
  dueDate = null,
  dueTime = null,
  priority = Priority.MEDIUM,
  notes = ""
) {
  let tags = [];
  let complete = false;

  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getDueTime = () => dueTime;
  const getPriority = () => priority;
  const getNotes = () => notes;
  const getTags = () => tags;
  const getComplete = () => complete;

  const setTitle = (newTitle) => (title = newTitle);
  const setDescription = (newDesc) => (description = newDesc);
  const setDueDate = (newDueDate) => {
    // Do not accept dates that are in the past
    if (isFuture(newDueDate)) dueDate = newDueDate;
  };
  const clearDueDate = () => (dueDate = null);
  const setDueTime = (newTimeInMs) => {
    // Check if time is within between 1 minute and 24 hours
    if (isWithin24Hrs(newTimeInMs)) {
      dueTime = newTimeInMs;
    }
  };
  const clearDueTime = () => (dueTime = null);
  const setPriority = (priorityLvl) => {
    // Only accept valid priority levels
    if (isPriorityLvl(priorityLvl)) priority = priorityLvl;
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
    getDueTime,
    getPriority,
    getNotes,
    getTags,
    getComplete,
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

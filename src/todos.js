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

// Todo factory function
// Due date and time are stored as milliseconds
function createTodo(
  title,
  description,
  dueDate = Date.now(),
  dueTime = null,
  priority = Priority.MEDIUM,
  notes = ""
) {
  let tags = [];
  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getDueTime = () => dueTime;
  const getPriority = () => priority;
  const getNotes = () => notes;
  const getTags = () => tags;

  const setTitle = (newTitle) => (title = newTitle);
  const setDescription = (newDesc) => (description = newDesc);
  const setDueDate = (newDueDate) => {
    // Do not accept dates that are in the past
    if (isFuture(newDueDate)) dueDate = newDueDate;
  };
  const setDueTime = (newTimeInMs) => {
    if (
      newTimeInMs > minutesToMilliseconds(1) &&
      newTimeInMs < minutesToMilliseconds(1440)
    ) {
      dueTime = newTimeInMs;
    }
  };
  const clearDueTime = () => (dueTime = null);
  const setPriority = (priorityLvl) => {
    // Only accept valid priority levels
    if (priorityLvl instanceof Priority) priority = priorityLvl;
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

  return {
    getTitle,
    getDescription,
    getDueDate,
    getDueTime,
    getPriority,
    getNotes,
    getTags,
    setTitle,
    setDescription,
    setDueDate,
    setDueTime,
    clearDueTime,
    setPriority,
    setNotes,
    addTag,
    removeTag,
  };
}

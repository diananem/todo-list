export const TASK_KEY = "tasks";
export function getSavedTasks() {
  return JSON.parse(localStorage.getItem(TASK_KEY));
}

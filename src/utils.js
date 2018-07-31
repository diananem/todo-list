export const TASK_KEY = "tasks";
export const FILTER_STATUSES = {
  all: "all",
  active: "active",
  completed: "completed"
};
export function getSavedTasks() {
  return JSON.parse(localStorage.getItem(TASK_KEY));
}

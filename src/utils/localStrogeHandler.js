export function storeDataToLocal(key, data) {
  return window.localStorage.setItem(key, data);
}

export function fetchDataFromLocal(key) {
  return window.localStorage.getItem(key);
}

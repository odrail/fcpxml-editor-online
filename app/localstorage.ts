import { RootState } from "./store";

const LOCAL_STORAGE_KEY = 'store'

export const saveState = (state: RootState) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
};

export const getState = () => {
  if (typeof window === 'undefined') return {}
  const savedState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "{}");
  return savedState;
};
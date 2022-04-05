import { RootState } from "./store";

const LOCAL_STORAGE_STORE_KEY = 'store'
const LOCAL_STORAGE_VERSION_KEY = 'version'

export const saveState = (state: RootState) => {
  localStorage.setItem(LOCAL_STORAGE_STORE_KEY, JSON.stringify(state))
};

export const getState = () => {
  if (typeof window === 'undefined') return {}
  const savedState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STORE_KEY) || "{}");
  return savedState;
};

export const setVersion = (version: string): void => {
  localStorage.setItem(LOCAL_STORAGE_VERSION_KEY, version)
}

export const getVersion = (): string | null => localStorage.getItem(LOCAL_STORAGE_VERSION_KEY)
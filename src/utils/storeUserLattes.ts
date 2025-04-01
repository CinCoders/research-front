export const storeUserLattes = (key: string, value?: string) => {
  localStorage.setItem(key, value ?? '');
};

export const getUserLattes = (key: string): string | null => localStorage.getItem(key);

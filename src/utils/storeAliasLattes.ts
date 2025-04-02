export const storeAliasLattes = (key: string, value?: string) => {
  localStorage.setItem(key, value ?? '');
};

export const getAliasLattes = (key: string): string | null => localStorage.getItem(key);

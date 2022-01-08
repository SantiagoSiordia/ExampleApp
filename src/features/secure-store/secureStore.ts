import * as SecureStore from 'expo-secure-store';

export const save = async (key: string, value: Record<string, any>) => {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
};

export const getValueFor = async (key: string) => {
  return await SecureStore.getItemAsync(key);
};

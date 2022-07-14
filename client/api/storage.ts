import * as SecureStore from 'expo-secure-store';

export async function saveToStore<T>(key: string, data: T): Promise<void> {
    await SecureStore.setItemAsync(key, JSON.stringify(data));
}

export async function getFromStore<T>(key: string): Promise<T | null> {
    const storageItem = await SecureStore.getItemAsync(key);
    if (storageItem) return JSON.parse(storageItem);

    return null;
}

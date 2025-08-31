import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKeys = {
  Uploads: 'uploads',
  RecentSearches: 'recent_searches'
};

export async function saveUpload(item: { uri: string; serverPath?: string; searchId?: number; title?: string; date?: string; }) {
  const raw = await AsyncStorage.getItem(StorageKeys.Uploads);
  const arr = raw ? JSON.parse(raw) : [];
  arr.unshift({ ...item, date: item.date || new Date().toISOString() });
  await AsyncStorage.setItem(StorageKeys.Uploads, JSON.stringify(arr.slice(0, 200)));
}

export async function getUploads() {
  const raw = await AsyncStorage.getItem(StorageKeys.Uploads);
  return raw ? JSON.parse(raw) : [];
}

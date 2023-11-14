import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate_db', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const db = await openDB('jate_db', 1);
  const action = db.transaction('jate', 'readwrite');
  const storage = action.objectStore('jate');
  storage.put({value: content, id: 1});
  await action.done;
  console.log('Data added to JATE database!')
}

export const getDb = async () => {
  const db = await openDB('jate_db', 1);
  const action = db.transaction('jate', 'readonly');
  const storage = action.objectStore('jate')
  const data = await storage.get(1);
  await action.done;
  console.log('Data retrieved!')
  return data?.value;
}

initdb();

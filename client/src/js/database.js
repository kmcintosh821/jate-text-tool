import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
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
  const db = await openDB('jate', 1);
  const action = db.transaction('jate', 'readwrite');
  await action.objectStore('jate').put({value: content, id: 1});
  await action.done;
  console.log('Data added to JATE database!')
}

export const getDb = async () => {
  const db = await openDB('jate', 1);
  const action = db.transaction('jate', 'readonly');
  const data = await action.objectStore('jate').get(1);
  await action.done;
  console.log('Data retrieved!')
  return data?.value;
}

initdb();

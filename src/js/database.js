import { openDB } from 'idb';

const initdb = async () => {
  return openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

// Method to store content in IndexedDB
export const putDb = async (content) => {
  console.log('PUT to the database');

  const db = await initdb();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  
  // Using id: 1 to always overwrite the latest content
  const request = store.put({ id: 1, content });

  const result = await request;
  console.log('Data saved to database', result);
};

// Method to retrieve content from IndexedDB
export const getDb = async () => {
  console.log('GET from the database');

  const db = await initdb();
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  const request = store.get(1);

  const result = await request;
  console.log('Data retrieved from database', result?.content);
  return result?.content || null;
};

initdb();

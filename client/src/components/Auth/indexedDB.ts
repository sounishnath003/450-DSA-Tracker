const DATABASE = "450dsaArchive";

export default function getDataFromIndexedDB(payload: any[]) {
  const indb: IDBFactory = window.indexedDB;
  if (!indb) {
    console.warn(`No IndexedDB Factory found in your browser!`);
    return;
  }

  const dbRequest: IDBOpenDBRequest = indb.open("db");

  dbRequest.onblocked = function (event) {
    alert("Please close all other tabs with this site open!");
    console.warn("Please close all other tabs with this site open!");
  };

  dbRequest.onerror = function () {
    console.error(dbRequest.error);
  };

  dbRequest.onsuccess = function () {
    (async function () {
      const db: IDBDatabase = dbRequest.result;

      const store: IDBObjectStore = db
        .transaction([DATABASE], "readonly")
        .objectStore(DATABASE);

      const keyPromises = store.getAllKeys();

      keyPromises.onsuccess = async function () {
        const keys = keyPromises.result;

        for (const key of keys) {
          const promise = store.get(key);
          promise.onsuccess = function () {
            const questions = promise.result;
            payload.push(questions);
          };
        }
      };
    })();
  };
}

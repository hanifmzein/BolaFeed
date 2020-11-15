const dbPromised = idb.open("bola-feed", 1, function(upgradeDb) {
  const clubObjectStore = upgradeDb.createObjectStore("clubs", {
    keyPath: "id"
  });
  clubObjectStore.createIndex("club_name", "name", {
    unique: false
  });
});

function saveForLater(club) {
  dbPromised
    .then(function(db) {
      const tx = db.transaction("clubs", "readwrite");
      const store = tx.objectStore("clubs");
      store.add(club);
      return tx.complete;
    })
    .then(function() {
      console.log("Club Favorite berhasil di simpan.");
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        const tx = db.transaction("clubs", "readonly");
        const store = tx.objectStore("clubs");
        return store.getAll();
      })
      .then((clubs) => {
            console.log("CLUBS " +clubs);
        resolve(clubs);
      });
  });
}

function getAllByTitle(name) {
  dbPromised
    .then(function(db) {
        const tx = db.transaction("clubs", "readonly");
        const store = tx.objectStore("clubs");
        const titleIndex = store.index("club_name");
        const range = IDBKeyRange.bound(name, name + "\uffff");
      return titleIndex.getAll(range);
    })
    .then(function(club) {
      console.log(club);
    });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        const tx = db.transaction("clubs", "readonly");
        const store = tx.objectStore("clubs");
        return store.get(id);
      })
      .then(function(club) {
        resolve(club);
      });
  });
}

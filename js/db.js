var dbPromised = idb.open("bola-feed", 1, function(upgradeDb) {
  var clubObjectStore = upgradeDb.createObjectStore("clubs", {
    keyPath: "id"
  });
  clubObjectStore.createIndex("club_name", "name", {
    unique: false
  });
});

function saveForLater(club) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("clubs", "readwrite");
      var store = tx.objectStore("clubs");
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
        var tx = db.transaction("clubs", "readonly");
        var store = tx.objectStore("clubs");
        return store.getAll();
      })
      .then(function(clubs) {
            console.log("CLUBS " +clubs);
        resolve(clubs);
      });
  });
}

function getAllByTitle(name) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("clubs", "readonly");
      var store = tx.objectStore("clubs");
      var titleIndex = store.index("club_name");
      var range = IDBKeyRange.bound(name, name + "\uffff");
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
        var tx = db.transaction("clubs", "readonly");
        var store = tx.objectStore("clubs");
        return store.get(id);
      })
      .then(function(club) {
        resolve(club);
      });
  });
}

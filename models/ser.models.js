const getUserCollection = (db) => {
  return db.collection("users");
};

module.exports = { getUserCollection };

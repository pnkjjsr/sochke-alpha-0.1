const admin = require("firebase-admin");
var serviceAccount = require("../../../configs/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sochke-web.firebaseio.com"
});

const db = admin.firestore();
db.settings({
  timestampsInSnapshots: true
});

module.exports = {
  admin,
  db
};

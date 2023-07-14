const firebase = require("firebase-admin");

const serviceAccount = require("../confidential/exclusivehacker-51048-firebase-adminsdk-z0gbn-517c2b1b20.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
});

module.exports = firebase;
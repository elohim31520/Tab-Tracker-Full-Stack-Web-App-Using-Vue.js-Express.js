firebase = require('firebase')
require('dotenv').config()



firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env. messagingSenderId
})

module.exports = firebase
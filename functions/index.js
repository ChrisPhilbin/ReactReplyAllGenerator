const functions = require('firebase-functions')
const app = require('express')()

const {
    getAllReplies
} = require('./api/replies')

app.get('/replies', getAllReplies)

exports.api = functions.https.onRequest(app)
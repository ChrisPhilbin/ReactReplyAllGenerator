const functions = require('firebase-functions')
const app = require('express')()

const {
    getAllReplies,
    createOneReply
} = require('./api/replies')

app.get('/replies', getAllReplies)
app.post('/replies', createOneReply)

exports.api = functions.https.onRequest(app)
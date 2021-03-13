const functions = require('firebase-functions')
const app = require('express')()

const {
    getAllReplies,
    createOneReply
} = require('./api/replies')

app.get('/replies', getAllReplies)
app.post('/replies', createOneReply)

const { 
    getAllTypes
} = require('./api/types')

app.get('/types', getAllTypes)

exports.api = functions.https.onRequest(app)
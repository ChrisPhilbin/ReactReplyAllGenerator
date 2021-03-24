const functions = require('firebase-functions')
const app = require('express')()
const auth = require('./util/auth');


const {
    getAllReplies,
    createOneReply,
    deleteOneReply
} = require('./api/replies')

app.get('/replies', getAllReplies)
app.post('/replies', auth, createOneReply)
app.delete('/replies/:replyId', auth, deleteOneReply)

const { 
    getAllTypes
} = require('./api/types')

app.get('/types', getAllTypes)

const {
    loginUser,
    signUpUser,
    getUserDetail
} = require('./api/users')

app.post('/login', loginUser)
app.post('/signup', signUpUser)
app.get('/user', getUserDetail)

exports.api = functions.https.onRequest(app)
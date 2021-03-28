const functions = require('firebase-functions')
const app = require('express')()
const auth = require('./util/auth');


const {
    createOneReply,
    deleteOneReply,
    editReply,
    getAllReplies
} = require('./api/replies')

app.get('/replies', getAllReplies)
app.post('/replies', auth, createOneReply)
app.put('/replies/:replyId', auth, editReply)
app.delete('/replies/:replyId', auth, deleteOneReply)

const { 
    getAllTypes
} = require('./api/types')

app.get('/types', getAllTypes)

const {
    loginUser,
    signOutUser,
    signUpUser,
    getUserDetail
} = require('./api/users')

app.post('/login', loginUser)
app.post('/signup', signUpUser)
app.get('/user', getUserDetail)
app.delete('/signout', signOutUser)

exports.api = functions.https.onRequest(app)
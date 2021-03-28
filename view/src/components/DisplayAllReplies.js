import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import { authMiddleWare} from '../util/Auth'
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
    root: {
		display: 'flex'
	},
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    table: {
        minWidth: 650
    },
    uiProgress: {
        position: 'absolute',
		zIndex: '1000',
		height: '31px',
		width: '31px',
		left: '50%',
		top: '35%'
    }
}))

const DisplayAllReplies = (props) => {

    const classes = useStyles()

    let [replies, setReplies] = useState([])
    let [loading, setLoading] = useState(false)
    let [errors, setErrors]   = useState('')

    useEffect(() => {
        setLoading(true)
        fetch(process.env.REACT_APP_CORS + '/replies')
        .then(response => response.json())
        .then(data => {
            setReplies(data)
            setLoading(false)
        })
        .catch(error => {
            setErrors(error)
            console.log(error, "something went wrong")
        })

    }, [])

    const handleDelete = (replyId) => {
        if (window.confirm("Are you sure?")) {
            authMiddleWare(props.history)
            let deleteReply = {
                replyId: replyId
            }

            let options = {
                url: `https://sleepy-plateau-48238.herokuapp.com/https://us-central1-replyallgenerator.cloudfunctions.net/api/replies/${replyId}`,
                method: 'delete',
                data: deleteReply
            }
            const authToken = localStorage.getItem('AuthToken');
            axios.defaults.headers.common = { Authorization: `${authToken}` };
            axios(options)
                .then((response) => {
                    if (response.status === 200) {
                        alert("Reply deleted!")
                        setReplies(replies.filter(reply => reply.replyId !== response.data))
                    }
                })
                .catch((error) => {
                    if (error.response.status === 403) {
                        console.log(error)
                        alert("You must be logged in!")
                        props.history.push('/login')
                    }
                })
        }
    }

    const handleUpdate = (reply) => {
        alert("Updating!")
    }

    if (replies.length !== 0 && loading === false) {
        return( 
            <>
                <Container maxWidth="lg">
                    <Dialog open={open} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Add a reply</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Add the body of your reply below. HINT: use <strong>{"{{first_name}}"}</strong> to automatically insert a name when generating your reply
                            </DialogContentText>
                            <CreateReply types={types} setOpen={setOpen} replies={replies} setReplies={setReplies}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">
                            Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Body of reply</TableCell>
                                    <TableCell align="right">Type of reply</TableCell>
                                    <TableCell align="right">Personality score</TableCell>
                                    <TableCell align="right">Edit?</TableCell>
                                    <TableCell align="right">Delete?</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {replies.map((reply) => (
                                    <TableRow key={reply.replyId}>
                                        <TableCell component="th" scope="row">
                                            {reply.message}
                                        </TableCell>
                                        <TableCell align="right">{reply.type}</TableCell>
                                        <TableCell align="right">{reply.rating}</TableCell>
                                        <TableCell align="right">
                                            <Button variant="contained" color="primary" onClick={() => handleUpdate(reply)}>Edit</Button>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button variant="contained" color="primary" onClick={() => handleDelete(reply.replyId)}>Remove</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </>
        )
    } else {
        return(
            <Container maxWidth="lg">
                <div className={classes.root}>
                    <CircularProgress size={150} className={classes.uiProgess} />
                </div>
            </Container>
        )
    }
}

export default DisplayAllReplies
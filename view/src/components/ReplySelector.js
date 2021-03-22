import React, { useEffect, useState } from 'react'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CreateReply from './CreateReply'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import FormHelperText from '@material-ui/core/FormHelperText'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import Slider from '@material-ui/core/Slider'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > .fa': {
          margin: theme.spacing(2),
        },
    },
    addReplyButton: {
        position: 'absolute',
        right: 50,
        bottom: 0
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    divider: {
        margin: 15
    },
    floatingButton: {
		position: 'absolute',
		bottom: 0,
		right: 0
	},
    generateButton: {
        padding: 10,
        marginTop: 35,
        marginBottom: 35,
    },
    replyForm: {
        padding: 20
    },
    replyText: {
        
    }
}))

const ReplySelector = () => {

    const classes = useStyles();

    let [replies, setReplies]         = useState('')
    let [rating, setRating]           = useState(5)
    let [type, setType]               = useState('')
    let [name, setName]               = useState('')
    let [isGenerated, setIsGenerated] = useState(false)
    let [reply, setReply]             = useState('')
    let [open, setOpen]               = useState(false)
    let [types, setTypes]             = useState([])

    useEffect(() => {
        fetch(process.env.REACT_APP_CORS + '/types', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setTypes(data))
        .catch(error => console.log(error, "Something went wrong when fetching all type objects"))
    }, [])

    useEffect(() => {
        fetch(process.env.REACT_APP_CORS + '/replies', {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => setReplies(data))
          .catch(error => console.log(error, "Something went wrong when fetching all reply objects"))
      }, [])

    const marks = [
        {
            value: 2,
            label: "No personality"
        },
        {
            value: 5,
            label: "Normal"
        },
        {
            value: 9,
            label: "Sold your soul"
        }
    ]

    const handleRatingChange = (event, newValue) => {
        setRating(newValue)
    }

    const copyToClipboard = () => {
        window.prompt("Copy to clipboard: Ctrl+C, Enter", reply)
    }

    const handleOpenDialog = () => {
        setOpen(true)
    }

    const handleCloseDialog = () => {
        setOpen(false)
    }

    let showReply

    if (isGenerated) { 
        showReply = (
            <>
                <TextField
                    className={classes.replyText}
                    value={reply}
                    disabled
                    fullWidth
                    multiline
                    rows={8}
                    variant="outlined"
                />
                <Button onClick={copyToClipboard}>
                    Copy to clipboard
                </Button>
            </>
        )
    } else {
        showReply = ( null )
    }

    const generateReply = () => {
        let possibleReplies = replies.filter( (reply) => {
            return reply.rating === rating && reply.type.toLowerCase() === type.toLowerCase()
        })
        if (possibleReplies.length) {
            let newReply = possibleReplies[Math.floor(Math.random()*possibleReplies.length)]
            let customizedMessage = newReply.message.replace("{{first_name}}", name)
            setReply(customizedMessage)
            setIsGenerated(true)
        } else {
            alert("It looks like there isn't a reply that matches your criteria")
        }
    }

    return(
        <main className={classes.content}>
            <IconButton
                className={classes.floatingButton}
                color="primary"
                aria-label="Add a new reply"
                onClick={handleOpenDialog}
            >
                <AddCircleIcon style={{ fontSize: 60 }} />
            </IconButton>
            <Container maxWidth="sm">
                <Paper variant="outlined" elevation={3} className={classes.replyForm}>
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
                    <Typography align="center" variant="h3" gutterBottom>Generate a reply</Typography>

                    <TextField fullWidth id="name" label="name" helperText="Who are you replying to?" onChange={(e) => setName(e.target.value)} />
                    <Divider className={classes.divider}/>
                    <InputLabel id="reply-type">Promotion, shout out, etc...</InputLabel>
                    <Select
                        fullWidth
                        labelId="reply-type"
                        id="reply-type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        {types.map((type) => (
                            <MenuItem value={type.name} key={type.typeId}>{type.name}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>What kind of message are you replying to?</FormHelperText>
                    <Divider className={classes.divider} />
                    <Typography id="rating-slider" gutterBottom>How much personality?</Typography>
                    <Slider
                        defaultValue={5}
                        value={rating}
                        onChange={handleRatingChange}
                        aria-labelledby="discrete-slider-always"
                        step={1}
                        max={10}
                        min={1}
                        marks={marks}
                        valueLabelDisplay="on"
                    />
                    <Button variant="contained" color="primary" className={classes.generateButton} onClick={generateReply}>
                        Generate reply
                    </Button>
                    { showReply }
                </Paper>
            </Container>
        </main>
    )
}

export default ReplySelector
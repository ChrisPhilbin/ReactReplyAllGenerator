import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Divider from '@material-ui/core/Divider'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import Slider from '@material-ui/core/Slider'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    divider: {
        margin: 15
    },
    generateButton: {
        padding: 10,
        marginTop: 35,
        marginBottom: 35
    },
    replyForm: {
        padding: 20
    },
    replyText: {
        
    }
}))

const ReplySelector = (props) => {

    const classes = useStyles();

    let replies = props.replies

    let [rating, setRating]           = useState(5)
    let [type, setType]               = useState('')
    let [name, setName]               = useState('')
    let [isGenerated, setIsGenerated] = useState(false)
    let [reply, setReply]             = useState('Hello there this is a test reply')

    const marks = [
        {
            value: 10,
            label: "No personality"
        },
        {
            value: 50,
            label: "Normal"
        },
        {
            value: 90,
            label: "Sold your soul"
        }
    ]

    const handleRatingChange = (event, newValue) => {
        setRating(newValue)
    }

    let showReply

    if (isGenerated) { 
        showReply = (
            <TextField
                className={classes.replyText}
                defaultValue={reply}
                disabled
                fullWidth
            />
        )
    } else {
        showReply = ( null )
    }

    const generateReply = () => {
        let possibleReplies = replies.filter( (reply) => {
            return reply.rating === rating && reply.type === type
        })
        setReply(possibleReplies[Math.floor(Math.random()*possibleReplies.length)])
        setIsGenerated(true)
    }

    return(
        <Container maxWidth="sm">
            <Paper elevation={3} className={classes.replyForm}>
                <Typography align="center" variant="h3" gutterBottom>Craft your reply</Typography>

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
                    <MenuItem value="promotion">Promotion</MenuItem>
                    <MenuItem value="shoutout">Shout out</MenuItem>
                    <MenuItem value="tip">Tip</MenuItem>
                </Select>
                <FormHelperText>What kind of message are you replying to?</FormHelperText>
                <Divider className={classes.divider} />
                <Typography id="rating-slider" gutterBottom>How much personality?</Typography>
                <Slider
                    defaultValue={5}
                    value={rating}
                    onChange={handleRatingChange}
                    aria-labelledby="discrete-slider-always"
                    step={10}
                    marks={marks}
                    valueLabelDisplay="on"
                />
                <Button variant="contained" color="primary" className={classes.generateButton} onClick={generateReply}>
                    Generate reply
                </Button>
                { showReply }
            </Paper>
        </Container>
    )
}

export default ReplySelector